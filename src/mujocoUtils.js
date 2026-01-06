import * as THREE from 'three';
import { Reflector } from './utils/Reflector.js';
import { MuJoCoDemo } from './main.js';

// export async function reloadFunc() {
//     this.scene.remove(this.scene.getObjectByName("MuJoCo Root"));
//     [this.model, this.data, this.bodies, this.lights] =
//         await loadSceneFromURL(this.mujoco, this.params.scene, this);

//     if (this.robotController) {
//         this.robotController.setPhysics(this.model, this.data);
//         this.robotController.resetPose();
//         if (this.params.enableRL) {
//             this.currentAction.fill(0);
//             this.robotController.currentAction.fill(0);
//         }
//     }

//     this.mujoco.mj_forward(this.model, this.data);

//     for (let i = 0; i < this.updateGUICallbacks.length; i++) {
//         this.updateGUICallbacks[i](this.model, this.data, this.params);
//     }
// }
export async function reloadFunc() {
    // 这里的 this 指向的是 main.js 中的 MuJoCoDemo 实例
    await this.reloadScene(this.params.scene);
}

/** @param {MuJoCoDemo} parentContext*/
export function setupGUI(parentContext) {
    // 注入自定义 CSS 样式
    const style = document.createElement('style');
    style.innerHTML = `
        /* 选中状态的按钮样式 */
        .lil-gui .controller.toggled-on {
            border-left: 4px solid #00ff00 !important; /* 左侧亮条 */
            background: rgba(0, 255, 0, 0.15); /* 微弱的绿色背景 */
        }
        .lil-gui .controller.toggled-on .name {
            color: #fff;
            text-shadow: 0 0 5px #00ff00; /* 文字发光 */
        }
        /* 稍微增加按钮高度，使其更像触控按钮 */
        .lil-gui .button {
            line-height: 24px; 
        }
    `;
    document.head.appendChild(style);

    // --- 辅助函数：创建带状态的开关按钮 ---
    const setupToggleButton = (folder, params, key, name, onChange) => {
        const btnDef = {
            click: () => {
                params[key] = !params[key]; // 点击时翻转布尔值
                updateVisual();             // 更新样式
                if (onChange) onChange(params[key]); // 触发回调
            }
        };

        // 添加一个按钮
        const ctrl = folder.add(btnDef, 'click').name(name);

        // 定义如何根据 params 更新样式
        const updateVisual = () => {
            const dom = ctrl.domElement.closest('.controller');
            if (params[key]) {
                dom.classList.add('toggled-on');
            } else {
                dom.classList.remove('toggled-on');
            }
        };

        // 初始化时执行一次
        updateVisual();

        // 挂载方法供外部调用 (比如 Refresh 按钮需要手动更新它)
        ctrl.updateDisplayState = updateVisual;

        return ctrl;
    };

    // Make sure we reset the camera when the scene is changed or reloaded.
    parentContext.updateGUICallbacks.length = 0;
    parentContext.updateGUICallbacks.push((model, data, params) => {
        // TODO: Use free camera parameters from MuJoCo
        parentContext.camera.position.set(2.0, 1.7, 1.7);
        parentContext.controls.target.set(0, 0.7, 0);
        parentContext.controls.update();
    });

    // Scene Folder
    const sceneFolder = parentContext.gui.addFolder('Scene');
    let reload = reloadFunc.bind(parentContext);
    // 使用下拉菜单（Select），lil-gui 标准方式
    sceneFolder.add(parentContext.params, 'scene', {
        "Race Track": "go2/race_track.xml",
        "Stairs": "go2/stairs.xml",
        "Flat": "go2/flat.xml"
    }).name('Select Scene').onChange(reload);
    sceneFolder.open(); // 默认展开

    // AI Controls Folder
    const aiFolder = parentContext.gui.addFolder('AI Controls');

    // Model Selector
    aiFolder.add(parentContext.params, 'model', {
        "PPO": "ppo",
        "MOECTS": "moects"
    }).name('Model').onChange(() => {
        if (parentContext.params.enableRL) {
            parentContext.toggleRL(true);
        }
    });

    // 1. 使用 setupToggleButton
    const enableCtrl = setupToggleButton(
        aiFolder,
        parentContext.params,
        'enableRL',
        'Enable AI Control',
        (enabled) => { parentContext.toggleRL(enabled); }
    );

    // 2. Refresh 逻辑里使用 enableCtrl.updateDisplayState()
    const refreshObj = {
        refresh: () => {
            if (!parentContext.params.enableRL) {
                parentContext.params.enableRL = true;
                enableCtrl.updateDisplayState(); // <--- 这里变了，手动触发样式更新
                parentContext.toggleRL(true);
            } else {
                parentContext.toggleRL(true);
            }
        }
    };

    aiFolder.add(refreshObj, 'refresh').name('Refresh AI Control');
    aiFolder.open(); // 默认展开

    // Simulation Folder
    const simFolder = parentContext.gui.addFolder("Simulation");

    // Pause
    const pauseSimulation = setupToggleButton(
        simFolder,
        parentContext.params,
        'paused',
        'Pause Simulation',
        (enabled) => { parentContext.toggleRL(enabled); }
    );
    pauseSimulation.onChange((value) => {
        if (value) {
            const pausedText = document.createElement('div');
            pausedText.style.position = 'absolute';
            pausedText.style.top = '10px';
            pausedText.style.left = '10px';
            pausedText.style.color = 'white';
            pausedText.style.font = 'normal 18px Arial';
            pausedText.innerHTML = 'pause';
            parentContext.container.appendChild(pausedText);
        } else {
            parentContext.container.removeChild(parentContext.container.lastChild);
        }
    });

    // Reload & Reset
    simFolder.add({ reload: () => { reload(); } }, 'reload').name('Reload');
    const resetSimulation = () => {
        parentContext.mujoco.mj_resetData(parentContext.model, parentContext.data);
        parentContext.mujoco.mj_forward(parentContext.model, parentContext.data);
    };
    simFolder.add({ reset: () => { resetSimulation(); } }, 'reset').name('Reset');

    // Noise Params
    simFolder.add(parentContext.params, 'ctrlnoiserate', 0.0, 2.0, 0.01).name('Noise rate');
    simFolder.add(parentContext.params, 'ctrlnoisestd', 0.0, 2.0, 0.01).name('Noise scale');

    simFolder.open(); // 默认展开

    // Camera 
    const camFolder = parentContext.gui.addFolder('Camera');
    setupToggleButton(camFolder, parentContext.params, 'follow', 'Follow Robot');
    setupToggleButton(camFolder, parentContext.params, 'showArrows', 'Show Velocity Arrows');
    camFolder.open(); // 默认展开

    // Actuators
    let textDecoder = new TextDecoder("utf-8");
    let nullChar = textDecoder.decode(new ArrayBuffer(1));
    let actuatorFolder = parentContext.gui.addFolder("Actuators");

    const addActuators = (model, data, params) => {
        let act_range = model.actuator_ctrlrange;
        let actuatorGUIs = [];
        for (let i = 0; i < model.nu; i++) {
            if (!model.actuator_ctrllimited[i]) { continue; }
            let name = textDecoder.decode(
                parentContext.model.names.subarray(
                    parentContext.model.name_actuatoradr[i])).split(nullChar)[0];

            parentContext.params[name] = 0.0;
            let actuatorGUI = actuatorFolder.add(parentContext.params, name, act_range[2 * i], act_range[2 * i + 1], 0.01).name(name).listen();
            actuatorGUIs.push(actuatorGUI);
            actuatorGUI.onChange((value) => {
                data.ctrl[i] = value;
            });
        }
        return actuatorGUIs;
    };

    let actuatorGUIs = addActuators(parentContext.model, parentContext.data, parentContext.params);
    parentContext.updateGUICallbacks.push((model, data, params) => {
        for (let i = 0; i < actuatorGUIs.length; i++) {
            actuatorGUIs[i].destroy();
        }
        actuatorGUIs = addActuators(model, data, parentContext.params);
    });
    actuatorFolder.close(); // 默认折叠

    // Shortcuts
    // Help Menu (F1)
    setupHelpMenu(parentContext);

    // Keyboard Shortcuts
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            parentContext.params.paused = !parentContext.params.paused;
            pauseSimulation.setValue(parentContext.params.paused);
            event.preventDefault();
        }
        if (event.ctrlKey && event.code === 'KeyL') { reload(); event.preventDefault(); }
        if (event.code === 'Backspace') { resetSimulation(); event.preventDefault(); }
        if (event.ctrlKey && event.code === 'KeyA') {
            parentContext.camera.position.set(2.0, 1.7, 1.7);
            parentContext.controls.target.set(0, 0.7, 0);
            parentContext.controls.update();
            event.preventDefault();
        }
    });
}

// 辅助函数：Help Menu 逻辑提取出来保持整洁
function setupHelpMenu(parentContext) {
    let keyInnerHTML = 'F1<br>Space<br>Ctrl L<br>Backspace<br>Ctrl A<br>';
    let actionInnerHTML = 'Help<br>Play / Pause<br>Reload XML<br>Reset simulation<br>Reset free camera<br>';

    const displayHelpMenu = () => {
        if (parentContext.params.help) {
            const helpMenu = document.createElement('div');
            helpMenu.style.cssText = `
        position: absolute; top: 10px; left: 10px; color: white; font: normal 18px Arial;
        background-color: rgba(0, 0, 0, 0.5); padding: 10px; border-radius: 10px;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        width: 400px; height: 400px; overflow: auto; z-index: 1000;
      `;

            const helpMenuTitle = document.createElement('div');
            helpMenuTitle.style.font = 'bold 24px Arial';
            helpMenu.appendChild(helpMenuTitle);

            const helpMenuTable = document.createElement('table');
            helpMenuTable.style.cssText = 'width: 100%; margin-top: 10px;';
            helpMenu.appendChild(helpMenuTable);

            const helpMenuTableBody = document.createElement('tbody');
            helpMenuTable.appendChild(helpMenuTableBody);
            const helpMenuRow = document.createElement('tr');
            helpMenuTableBody.appendChild(helpMenuRow);

            const col1 = document.createElement('td');
            col1.style.cssText = 'width: 50%; text-align: right; padding-right: 10px;';
            col1.innerHTML = actionInnerHTML;
            helpMenuRow.appendChild(col1);

            const col2 = document.createElement('td');
            col2.style.cssText = 'width: 50%; text-align: left; padding-left: 10px;';
            col2.innerHTML = keyInnerHTML;
            helpMenuRow.appendChild(col2);

            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = 'Close';
            closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; z-index: 1001;';
            closeBtn.onclick = () => helpMenu.remove();
            helpMenu.appendChild(closeBtn);

            document.body.appendChild(helpMenu);
        } else {
            if (document.body.lastChild.innerHTML && document.body.lastChild.innerHTML.includes('Close'))
                document.body.removeChild(document.body.lastChild);
        }
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'F1') {
            parentContext.params.help = !parentContext.params.help;
            displayHelpMenu();
            event.preventDefault();
        }
    });
}

export async function loadSceneFromURL(mujoco, filename, parent) {
    // Free the old data.
    if (parent.data != null) {
        parent.data.delete();
        parent.model = null;
        parent.data = null;
    }

    // Load in the state from XML.
    parent.model = mujoco.MjModel.loadFromXML("/working/" + filename);
    parent.data = new mujoco.MjData(parent.model);

    let model = parent.model;
    let data = parent.data;

    // Decode the null-terminated string names.
    let textDecoder = new TextDecoder("utf-8");
    let names_array = new Uint8Array(model.names);
    let fullString = textDecoder.decode(model.names);
    let names = fullString.split(textDecoder.decode(new ArrayBuffer(1)));

    // Create the root object.
    let mujocoRoot = new THREE.Group();
    mujocoRoot.name = "MuJoCo Root";
    parent.scene.add(mujocoRoot);

    /** @type {Object.<number, THREE.Group>} */
    let bodies = {};
    /** @type {Object.<number, THREE.BufferGeometry>} */
    let meshes = {};
    /** @type {THREE.Light[]} */
    let lights = [];

    // Default material definition.
    let material = new THREE.MeshPhysicalMaterial();
    material.color = new THREE.Color(1, 1, 1);

    // Loop through the MuJoCo geoms and recreate them in three.js.
    for (let g = 0; g < model.ngeom; g++) {
        // Only visualize geom groups up to 2 (same default behavior as simulate).
        if (!(model.geom_group[g] < 3)) { continue; }

        // Get the body ID and type of the geom.
        let b = model.geom_bodyid[g];
        let type = model.geom_type[g];
        let size = [
            model.geom_size[(g * 3) + 0],
            model.geom_size[(g * 3) + 1],
            model.geom_size[(g * 3) + 2]
        ];

        // Create the body if it doesn't exist.
        if (!(b in bodies)) {
            bodies[b] = new THREE.Group();

            let start_idx = model.name_bodyadr[b];
            let end_idx = start_idx;
            while (end_idx < names_array.length && names_array[end_idx] !== 0) {
                end_idx++;
            }
            let name_buffer = names_array.subarray(start_idx, end_idx);
            bodies[b].name = textDecoder.decode(name_buffer);

            bodies[b].bodyID = b;
            bodies[b].has_custom_mesh = false;
        }

        // Set the default geometry. In MuJoCo, this is a sphere.
        let geometry = new THREE.SphereGeometry(size[0] * 0.5);
        if (type == mujoco.mjtGeom.mjGEOM_PLANE.value) {
            // Special handling for plane later.
        } else if (type == mujoco.mjtGeom.mjGEOM_HFIELD.value) {
            // TODO: Implement this.
        } else if (type == mujoco.mjtGeom.mjGEOM_SPHERE.value) {
            geometry = new THREE.SphereGeometry(size[0]);
        } else if (type == mujoco.mjtGeom.mjGEOM_CAPSULE.value) {
            geometry = new THREE.CapsuleGeometry(size[0], size[1] * 2.0, 20, 20);
        } else if (type == mujoco.mjtGeom.mjGEOM_ELLIPSOID.value) {
            geometry = new THREE.SphereGeometry(1); // Stretch this below
        } else if (type == mujoco.mjtGeom.mjGEOM_CYLINDER.value) {
            geometry = new THREE.CylinderGeometry(size[0], size[0], size[1] * 2.0);
        } else if (type == mujoco.mjtGeom.mjGEOM_BOX.value) {
            geometry = new THREE.BoxGeometry(size[0] * 2.0, size[2] * 2.0, size[1] * 2.0);
        } else if (type == mujoco.mjtGeom.mjGEOM_MESH.value) {
            let meshID = model.geom_dataid[g];

            if (!(meshID in meshes)) {
                geometry = new THREE.BufferGeometry();

                let vertex_buffer = model.mesh_vert.subarray(
                    model.mesh_vertadr[meshID] * 3,
                    (model.mesh_vertadr[meshID] + model.mesh_vertnum[meshID]) * 3);
                for (let v = 0; v < vertex_buffer.length; v += 3) {
                    //vertex_buffer[v + 0] =  vertex_buffer[v + 0];
                    let temp = vertex_buffer[v + 1];
                    vertex_buffer[v + 1] = vertex_buffer[v + 2];
                    vertex_buffer[v + 2] = -temp;
                }

                let normal_buffer = model.mesh_normal.subarray(
                    model.mesh_normaladr[meshID] * 3,
                    (model.mesh_normaladr[meshID] + model.mesh_normalnum[meshID]) * 3);
                for (let v = 0; v < normal_buffer.length; v += 3) {
                    //normal_buffer[v + 0] =  normal_buffer[v + 0];
                    let temp = normal_buffer[v + 1];
                    normal_buffer[v + 1] = normal_buffer[v + 2];
                    normal_buffer[v + 2] = -temp;
                }

                let uv_buffer = model.mesh_texcoord.subarray(
                    model.mesh_texcoordadr[meshID] * 2,
                    (model.mesh_texcoordadr[meshID] + model.mesh_texcoordnum[meshID]) * 2);

                let face_to_vertex_buffer = model.mesh_face.subarray(
                    model.mesh_faceadr[meshID] * 3,
                    (model.mesh_faceadr[meshID] + model.mesh_facenum[meshID]) * 3);
                let face_to_uv_buffer = model.mesh_facetexcoord.subarray(
                    model.mesh_faceadr[meshID] * 3,
                    (model.mesh_faceadr[meshID] + model.mesh_facenum[meshID]) * 3);
                let face_to_normal_buffer = model.mesh_facenormal.subarray(
                    model.mesh_faceadr[meshID] * 3,
                    (model.mesh_faceadr[meshID] + model.mesh_facenum[meshID]) * 3);

                // The UV and Normal Buffers are actually indexed by the triangle indices through the face_to_uv_buffer and face_to_normal_buffer.
                // We need to swizzle them into a per-vertex format for three.js
                let swizzled_uv_buffer = new Float32Array((vertex_buffer.length / 3) * 2);
                let swizzled_normal_buffer = new Float32Array(vertex_buffer.length);
                for (let t = 0; t < face_to_vertex_buffer.length / 3; t++) {
                    let vi0 = face_to_vertex_buffer[(t * 3) + 0];
                    let vi1 = face_to_vertex_buffer[(t * 3) + 1];
                    let vi2 = face_to_vertex_buffer[(t * 3) + 2];
                    let uvi0 = face_to_uv_buffer[(t * 3) + 0];
                    let uvi1 = face_to_uv_buffer[(t * 3) + 1];
                    let uvi2 = face_to_uv_buffer[(t * 3) + 2];
                    let nvi0 = face_to_normal_buffer[(t * 3) + 0];
                    let nvi1 = face_to_normal_buffer[(t * 3) + 1];
                    let nvi2 = face_to_normal_buffer[(t * 3) + 2];
                    swizzled_uv_buffer[(vi0 * 2) + 0] = uv_buffer[(uvi0 * 2) + 0];
                    swizzled_uv_buffer[(vi0 * 2) + 1] = uv_buffer[(uvi0 * 2) + 1];
                    swizzled_uv_buffer[(vi1 * 2) + 0] = uv_buffer[(uvi1 * 2) + 0];
                    swizzled_uv_buffer[(vi1 * 2) + 1] = uv_buffer[(uvi1 * 2) + 1];
                    swizzled_uv_buffer[(vi2 * 2) + 0] = uv_buffer[(uvi2 * 2) + 0];
                    swizzled_uv_buffer[(vi2 * 2) + 1] = uv_buffer[(uvi2 * 2) + 1];
                    swizzled_normal_buffer[(vi0 * 3) + 0] = normal_buffer[(nvi0 * 3) + 0];
                    swizzled_normal_buffer[(vi0 * 3) + 1] = normal_buffer[(nvi0 * 3) + 1];
                    swizzled_normal_buffer[(vi0 * 3) + 2] = normal_buffer[(nvi0 * 3) + 2];
                    swizzled_normal_buffer[(vi1 * 3) + 0] = normal_buffer[(nvi1 * 3) + 0];
                    swizzled_normal_buffer[(vi1 * 3) + 1] = normal_buffer[(nvi1 * 3) + 1];
                    swizzled_normal_buffer[(vi1 * 3) + 2] = normal_buffer[(nvi1 * 3) + 2];
                    swizzled_normal_buffer[(vi2 * 3) + 0] = normal_buffer[(nvi2 * 3) + 0];
                    swizzled_normal_buffer[(vi2 * 3) + 1] = normal_buffer[(nvi2 * 3) + 1];
                    swizzled_normal_buffer[(vi2 * 3) + 2] = normal_buffer[(nvi2 * 3) + 2];
                }
                geometry.setAttribute("position", new THREE.BufferAttribute(vertex_buffer, 3));
                geometry.setAttribute("normal", new THREE.BufferAttribute(swizzled_normal_buffer, 3));
                geometry.setAttribute("uv", new THREE.BufferAttribute(swizzled_uv_buffer, 2));
                geometry.setIndex(Array.from(face_to_vertex_buffer));
                geometry.computeVertexNormals(); // MuJoCo Normals acting strangely... just recompute them
                meshes[meshID] = geometry;
            } else {
                geometry = meshes[meshID];
            }

            bodies[b].has_custom_mesh = true;
        }
        // Done with geometry creation.

        // Set the Material Properties of incoming bodies
        let texture = undefined;
        let color = [
            model.geom_rgba[(g * 4) + 0],
            model.geom_rgba[(g * 4) + 1],
            model.geom_rgba[(g * 4) + 2],
            model.geom_rgba[(g * 4) + 3]];
        if (model.geom_matid[g] != -1) {
            let matId = model.geom_matid[g];
            color = [
                model.mat_rgba[(matId * 4) + 0],
                model.mat_rgba[(matId * 4) + 1],
                model.mat_rgba[(matId * 4) + 2],
                model.mat_rgba[(matId * 4) + 3]];

            // Construct Texture from model.tex_data
            texture = undefined;
            // mat_texid is now a matrix (nmat x mjNTEXROLE)
            // We use mjTEXROLE_RGB (value 1) for standard diffuse/color textures
            const mjNTEXROLE = 10; // Total number of texture roles
            const mjTEXROLE_RGB = 1; // RGB texture role
            let texId = model.mat_texid[(matId * mjNTEXROLE) + mjTEXROLE_RGB];

            if (texId != -1) {
                let width = model.tex_width[texId];
                let height = model.tex_height[texId];
                let offset = model.tex_adr[texId];
                let channels = model.tex_nchannel[texId];
                let texData = model.tex_data;
                let rgbaArray = new Uint8Array(width * height * 4);
                for (let p = 0; p < width * height; p++) {
                    rgbaArray[(p * 4) + 0] = texData[offset + ((p * channels) + 0)];
                    rgbaArray[(p * 4) + 1] = channels > 1 ? texData[offset + ((p * channels) + 1)] : rgbaArray[(p * 4) + 0];
                    rgbaArray[(p * 4) + 2] = channels > 2 ? texData[offset + ((p * channels) + 2)] : rgbaArray[(p * 4) + 0];
                    rgbaArray[(p * 4) + 3] = channels > 3 ? texData[offset + ((p * channels) + 3)] : 255;
                }
                texture = new THREE.DataTexture(rgbaArray, width, height, THREE.RGBAFormat, THREE.UnsignedByteType);
                if (texId == 2) {
                    texture.repeat = new THREE.Vector2(50, 50);
                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;
                } else {
                    texture.repeat = new THREE.Vector2(model.mat_texrepeat[(model.geom_matid[g] * 2) + 0],
                        model.mat_texrepeat[(model.geom_matid[g] * 2) + 1]);
                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;
                }

                texture.needsUpdate = true;
            }
        }

        // Create a new material for each geom to avoid cross-contamination
        // 准备材质参数对象
        let materialParams = {
            color: new THREE.Color(color[0], color[1], color[2]),
            transparent: color[3] < 1.0,
            opacity: color[3] / 255.,
            map: texture
        };

        // 只有当存在有效的 MuJoCo 材质 ID 时，才添加高级物理属性
        if (model.geom_matid[g] != -1) {
            let matId = model.geom_matid[g];
            // 检查数组是否真的有值，防止越界返回 undefined
            if (model.mat_specular && model.mat_specular.length > matId) {
                materialParams.specularIntensity = model.mat_specular[matId];
            }
            if (model.mat_reflectance && model.mat_reflectance.length > matId) {
                materialParams.reflectivity = model.mat_reflectance[matId];
            }
            if (model.mat_shininess && model.mat_shininess.length > matId) {
                materialParams.roughness = 1.0 - model.mat_shininess[matId];
            }
            if (model.mat_metallic && model.mat_metallic.length > matId) {
                materialParams.metalness = model.mat_metallic[matId]; // 通常 MuJoCo 不直接导出 metalness，这里保留你的逻辑
            } else {
                materialParams.metalness = 0.1; // 默认给一点金属度
            }
        }

        let currentMaterial = new THREE.MeshPhysicalMaterial(materialParams);

        let mesh;// = new THREE.Mesh();
        if (type == 0) {
            mesh = new Reflector(new THREE.PlaneGeometry(100, 100), { clipBias: 0.003, texture: texture });
            mesh.rotateX(- Math.PI / 2);
        } else {
            mesh = new THREE.Mesh(geometry, currentMaterial);
        }

        mesh.castShadow = g == 0 ? false : true;
        mesh.receiveShadow = type != 7;
        mesh.bodyID = b;
        bodies[b].add(mesh);
        getPosition(model.geom_pos, g, mesh.position);
        if (type != 0) { getQuaternion(model.geom_quat, g, mesh.quaternion); }
        if (type == 4) { mesh.scale.set(size[0], size[2], size[1]); } // Stretch the Ellipsoid
    }

    // Parse tendons.
    let tendonMat = new THREE.MeshPhongMaterial();
    tendonMat.color = new THREE.Color(0.8, 0.3, 0.3);
    mujocoRoot.cylinders = new THREE.InstancedMesh(
        new THREE.CylinderGeometry(1, 1, 1),
        tendonMat, 1023);
    mujocoRoot.cylinders.receiveShadow = true;
    mujocoRoot.cylinders.castShadow = true;
    mujocoRoot.add(mujocoRoot.cylinders);
    mujocoRoot.spheres = new THREE.InstancedMesh(
        new THREE.SphereGeometry(1, 10, 10),
        tendonMat, 1023);
    mujocoRoot.spheres.receiveShadow = true;
    mujocoRoot.spheres.castShadow = true;
    mujocoRoot.add(mujocoRoot.spheres);

    // Parse lights.
    for (let l = 0; l < model.nlight; l++) {
        let light = new THREE.DirectionalLight();
        if (model.light_type[l] == 0) {
            light = new THREE.SpotLight();
            light.angle = 1.51;//model.light_cutoffangle[l];
        } else if (model.light_type[l] == 1) {
            light = new THREE.DirectionalLight();
        } else if (model.light_type[l] == 2) {
            light = new THREE.PointLight();
        } else if (model.light_type[l] == 3) {
            light = new THREE.HemisphereLight();
        }

        light.angle = 1.11;

        light.decay = model.light_attenuation[l] * 100;
        light.penumbra = 0.5;
        light.castShadow = true; // default false
        light.intensity = light.intensity * 3.14 * 1.0;

        light.shadow.mapSize.width = 1024; // default
        light.shadow.mapSize.height = 1024; // default
        light.shadow.camera.near = 0.1; // default
        light.shadow.camera.far = 10; // default
        //bodies[model.light_bodyid()].add(light);
        if (bodies[0]) {
            bodies[0].add(light);
        } else {
            mujocoRoot.add(light);
        }
        lights.push(light);
    }
    if (model.nlight == 0) {
        let light = new THREE.DirectionalLight();
        mujocoRoot.add(light);
    }

    for (let b = 0; b < model.nbody; b++) {
        //let parent_body = model.body_parentid()[b];
        if (b == 0 || !bodies[0]) {
            mujocoRoot.add(bodies[b]);
        } else if (bodies[b]) {
            bodies[0].add(bodies[b]);
        } else {
            console.log("Body without Geometry detected; adding to bodies", b, bodies[b]);
            bodies[b] = new THREE.Group(); bodies[b].name = names[b + 1]; bodies[b].bodyID = b; bodies[b].has_custom_mesh = false;
            bodies[0].add(bodies[b]);
        }
    }

    parent.mujocoRoot = mujocoRoot;

    return [model, data, bodies, lights];
}

export function drawTendonsAndFlex(mujocoRoot, model, data) {
    let identityQuat = new THREE.Quaternion();
    let numWraps = 0;
    if (mujocoRoot && mujocoRoot.cylinders) {
        let mat = new THREE.Matrix4();
        for (let t = 0; t < model.ntendon; t++) {
            let startW = data.ten_wrapadr[t];
            let r = model.tendon_width[t];
            for (let w = startW; w < startW + data.ten_wrapnum[t] - 1; w++) {
                let tendonStart = getPosition(data.wrap_xpos, w, new THREE.Vector3());
                let tendonEnd = getPosition(data.wrap_xpos, w + 1, new THREE.Vector3());
                let tendonAvg = new THREE.Vector3().addVectors(tendonStart, tendonEnd).multiplyScalar(0.5);

                let validStart = tendonStart.length() > 0.01;
                let validEnd = tendonEnd.length() > 0.01;

                if (validStart) { mujocoRoot.spheres.setMatrixAt(numWraps, mat.compose(tendonStart, identityQuat, new THREE.Vector3(r, r, r))); }
                if (validEnd) { mujocoRoot.spheres.setMatrixAt(numWraps + 1, mat.compose(tendonEnd, identityQuat, new THREE.Vector3(r, r, r))); }
                if (validStart && validEnd) {
                    mat.compose(tendonAvg, identityQuat.setFromUnitVectors(
                        new THREE.Vector3(0, 1, 0), tendonEnd.clone().sub(tendonStart).normalize()),
                        new THREE.Vector3(r, tendonStart.distanceTo(tendonEnd), r));
                    mujocoRoot.cylinders.setMatrixAt(numWraps, mat);
                    numWraps++;
                }
            }
        }

        let curFlexSphereInd = numWraps;
        let tempvertPos = new THREE.Vector3();
        let tempvertRad = new THREE.Vector3();
        for (let i = 0; i < model.nflex; i++) {
            for (let j = 0; j < model.flex_vertnum[i]; j++) {
                let vertIndex = model.flex_vertadr[i] + j;
                getPosition(data.flexvert_xpos, vertIndex, tempvertPos);
                let r = 0.01;
                mat.compose(tempvertPos, identityQuat, tempvertRad.set(r, r, r));

                mujocoRoot.spheres.setMatrixAt(curFlexSphereInd, mat);
                curFlexSphereInd++;
            }
        }
        mujocoRoot.cylinders.count = numWraps;
        mujocoRoot.spheres.count = curFlexSphereInd;
        mujocoRoot.cylinders.instanceMatrix.needsUpdate = true;
        mujocoRoot.spheres.instanceMatrix.needsUpdate = true;
    }
}

export async function downloadExampleScenesFolder(mujoco) {
    let allFiles = [
        // go2 model files
        "go2/flat.xml",
        "go2/go2.xml",
        "go2/race_track.xml",
        "go2/stairs.xml",
        "go2/assets/base_0.obj",
        "go2/assets/base_1.obj",
        "go2/assets/base_2.obj",
        "go2/assets/base_3.obj",
        "go2/assets/base_4.obj",
        "go2/assets/calf_0.obj",
        "go2/assets/calf_1.obj",
        "go2/assets/calf_mirror_0.obj",
        "go2/assets/calf_mirror_1.obj",
        "go2/assets/foot.obj",
        "go2/assets/hip_0.obj",
        "go2/assets/hip_1.obj",
        "go2/assets/thigh_0.obj",
        "go2/assets/thigh_1.obj",
        "go2/assets/thigh_mirror_0.obj",
        "go2/assets/thigh_mirror_1.obj",
        "go2/assets/height_field.png",
        "go2/assets/wood.png",
        "go2/dae/base.dae",
        "go2/dae/calf.dae",
        "go2/dae/calf_mirror.dae",
        "go2/dae/foot.dae",
        "go2/dae/hip.dae",
        "go2/dae/thigh.dae",
        "go2/dae/thigh_mirror.dae",
        "go2/urdf/go2.urdf",
    ];

    let requests = allFiles.map((url) => fetch("./assets/scenes/" + url));
    let responses = await Promise.all(requests);
    for (let i = 0; i < responses.length; i++) {
        let split = allFiles[i].split("/");
        let working = '/working/';
        for (let f = 0; f < split.length - 1; f++) {
            working += split[f];
            if (!mujoco.FS.analyzePath(working).exists) { mujoco.FS.mkdir(working); }
            working += "/";
        }

        if (allFiles[i].endsWith(".png") || allFiles[i].endsWith(".stl") || allFiles[i].endsWith(".skn")) {
            mujoco.FS.writeFile("/working/" + allFiles[i], new Uint8Array(await responses[i].arrayBuffer()));
        } else {
            mujoco.FS.writeFile("/working/" + allFiles[i], await responses[i].text());
        }
    }
}

export function getPosition(buffer, index, target, swizzle = true) {
    if (swizzle) {
        return target.set(
            buffer[(index * 3) + 0],
            buffer[(index * 3) + 2],
            -buffer[(index * 3) + 1]);
    } else {
        return target.set(
            buffer[(index * 3) + 0],
            buffer[(index * 3) + 1],
            buffer[(index * 3) + 2]);
    }
}

export function getQuaternion(buffer, index, target, swizzle = true) {
    if (swizzle) {
        return target.set(
            -buffer[(index * 4) + 1],
            -buffer[(index * 4) + 3],
            buffer[(index * 4) + 2],
            -buffer[(index * 4) + 0]);
    } else {
        return target.set(
            buffer[(index * 4) + 0],
            buffer[(index * 4) + 1],
            buffer[(index * 4) + 2],
            buffer[(index * 4) + 3]);
    }
}

export function toMujocoPos(target) { return target.set(target.x, -target.z, target.y); }

export function standardNormal() {
    return Math.sqrt(-2.0 * Math.log(Math.random())) *
        Math.cos(2.0 * Math.PI * Math.random());
}