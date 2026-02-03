import * as THREE from 'three';
import { GUI } from '../node_modules/three/examples/jsm/libs/lil-gui.module.min.js';
import { DragStateManager } from './utils/DragStateManager.js';
import { setupGUI, downloadExampleScenesFolder, loadSceneFromURL, drawTendonsAndFlex, getPosition, getQuaternion, toMujocoPos, standardNormal, addRepoButton} from './mujocoUtils.js';
import load_mujoco from 'mujoco_wasm';
import { SceneSetup } from './utils/SceneSetup.js';
import { InputHandler } from './utils/InputHandler.js';
import { ArrowVisualizer, InputVisualizer } from './utils/Visualizer.js';
import { RobotController } from './utils/RobotController.js';

// Load the MuJoCo Module
const mujoco = await load_mujoco();

// Virtual FS Setup
var initialScene = "go2/cross_stairs.xml";
mujoco.FS.mkdir('/working');
mujoco.FS.mount(mujoco.MEMFS, { root: '.' }, '/working');

export class MuJoCoDemo {
    constructor() {
        this.mujoco = mujoco;
        this.model = null;
        this.data = null;

        // Managers
        this.sceneSetup = new SceneSetup(document.body); // DOM container moved here
        this.inputHandler = new InputHandler();
        this.visualizer = new ArrowVisualizer(this.sceneSetup.scene);
        this.robotController = new RobotController(mujoco);
        this.inputVisualizer = new InputVisualizer(document.body);

        // Aliases for convenience (used by mujocoUtils and DragStateManager)
        this.scene = this.sceneSetup.scene;
        this.camera = this.sceneSetup.camera;
        this.renderer = this.sceneSetup.renderer;
        this.controls = this.sceneSetup.controls;
        this.container = this.sceneSetup.container;
        this.modelConfigs = {
            "ppo": {
                url: './models/ppo.onnx',
                history: 1,
                stacking: 'frame'
            },
            "moects": {
                url: './models/moects.onnx', // 你的新模型文件名
                history: 5,
                stacking: 'term'
            }
        };
        // State Variables
        this.params = {
            scene: initialScene,
            paused: false,
            help: false,
            ctrlnoiserate: 0.0,
            ctrlnoisestd: 0.0,
            follow: true,
            enableRL: true,
            showArrows: true,
            model: 'moects'
        };

        this.mujoco_time = 0.0;
        this.bodies = {};
        this.lights = {};
        this.tmpVec = new THREE.Vector3();
        this.tmpQuat = new THREE.Quaternion();
        this.updateGUICallbacks = [];

        this.stepCounter = 0;
        this.control_decimation = 10;

        // Init Logic
        this.dragStateManager = new DragStateManager(this.scene, this.renderer, this.camera, this.container, this.controls);

        this.renderer.setAnimationLoop(this.render.bind(this));
    }

    async init() {
        await downloadExampleScenesFolder(mujoco);

        [this.model, this.data, this.bodies, this.lights] = await loadSceneFromURL(mujoco, initialScene, this);

        // Notify RobotController about new model
        this.robotController.setPhysics(this.model, this.data);
        this.robotController.resetPose(); // Initial stand
        if (this.params.enableRL) {
            await this.toggleRL(true);  
        }
        this.gui = new GUI();
        setupGUI(this);
        addRepoButton('https://github.com/windigal/mujoco_wasm');
    }

    async toggleRL(enabled) {
        if (enabled) {
            const config = this.modelConfigs[this.params.model] || this.modelConfigs["ppo"];
            const success = await this.robotController.loadModel(config);
            if (success) {
                this.robotController.resetPose();
            } else {
                this.params.enableRL = false;
            }
        } else {
            console.log("RL Disabled.");
        }
    }
    async reloadScene(scenePath) {
        this.scene.remove(this.scene.getObjectByName("MuJoCo Root"));

        [this.model, this.data, this.bodies, this.lights] =
            await loadSceneFromURL(this.mujoco, scenePath, this);

        this.robotController.setPhysics(this.model, this.data);
        this.robotController.resetPose();
        if (this.params.enableRL) {
            this.currentAction.fill(0);
            this.robotController.currentAction.fill(0);
        }

        if (this.dragStateManager) {
            this.dragStateManager.dispose(); // 先销毁，移除监听器和箭头
        }
        this.dragStateManager = new DragStateManager(
            this.scene,
            this.renderer,
            this.camera,
            this.container,
            this.controls
        );

        this.mujoco.mj_forward(this.model, this.data);
        for (let i = 0; i < this.updateGUICallbacks.length; i++) {
            this.updateGUICallbacks[i](this.model, this.data, this.params);
        }
    }
    async render(timeMS) {
        if (!this.model || !this.data) {
            this.sceneSetup.render();
            return;
        }

        // 1. Camera Follow
        if (this.params.follow && this.bodies[1]) {
            const robotPos = this.bodies[1].position;
            const offset = this.camera.position.clone().sub(this.controls.target);
            this.controls.target.copy(robotPos);
            this.camera.position.copy(robotPos).add(offset);
        }

        // 2. Input
        this.inputHandler.update();
        const cmd_vel = this.inputHandler.getCmd();
        this.inputVisualizer.update(this.inputHandler);

        // 3. Visualization
        this.visualizer.update(this.params.showArrows, this.bodies[1], this.data.qvel, cmd_vel);

        this.controls.update();

        // 4. Physics Loop
        if (!this.params["paused"]) {
            let timestep = this.model.opt.timestep;
            if (timeMS - this.mujoco_time > 35.0) { this.mujoco_time = timeMS; }

            while (this.mujoco_time < timeMS) {
                // A. Inference
                if (this.params.enableRL && (this.stepCounter % this.control_decimation === 0)) {
                    await this.robotController.infer(cmd_vel);
                }

                // B. Noise (Keeping legacy logic here for now, or move to Controller)
                if (this.params["ctrlnoisestd"] > 0.0) {
                    let rate = Math.exp(-timestep / Math.max(1e-10, this.params["ctrlnoiserate"]));
                    let scale = this.params["ctrlnoisestd"] * Math.sqrt(1 - rate * rate);
                    let currentCtrl = this.data.ctrl;
                    for (let i = 0; i < currentCtrl.length; i++) {
                        currentCtrl[i] = rate * currentCtrl[i] + scale * standardNormal();
                    }
                }

                // C. Drag Perturbation
                for (let i = 0; i < this.data.qfrc_applied.length; i++) { this.data.qfrc_applied[i] = 0.0; }

                let dragged = this.dragStateManager.physicsObject;
                if (dragged && dragged.bodyID) {
                    // Sync Three.js bodies to current MuJoCo state for accurate raycasting
                    // (Strictly speaking, we need updated positions to calculate the drag force vector correctly)
                    for (let b = 0; b < this.model.nbody; b++) {
                        if (this.bodies[b]) {
                            getPosition(this.data.xpos, b, this.bodies[b].position);
                            getQuaternion(this.data.xquat, b, this.bodies[b].quaternion);
                            this.bodies[b].updateWorldMatrix();
                        }
                    }

                    let bodyID = dragged.bodyID;
                    this.dragStateManager.update(); // Update the world-space force origin

                    // Calculate force: (Target - Current) * Stiffness
                    let force = toMujocoPos(this.dragStateManager.currentWorld.clone()
                        .sub(this.dragStateManager.worldHit)
                        .multiplyScalar(this.model.body_mass[bodyID] * 250));

                    let point = toMujocoPos(this.dragStateManager.worldHit.clone());

                    // Apply force to the body
                    mujoco.mj_applyFT(this.model, this.data,
                        [force.x, force.y, force.z],
                        [0, 0, 0],
                        [point.x, point.y, point.z],
                        bodyID,
                        this.data.qfrc_applied
                    );
                }

                // D. PD Control
                this.robotController.computePD(this.params.enableRL);

                // E. Step
                mujoco.mj_step(this.model, this.data);

                this.stepCounter++;
                this.mujoco_time += timestep * 1000.0;
            }
        } else if (this.params["paused"]) {
            this.dragStateManager.update(); // Update the world-space force origin

            let dragged = this.dragStateManager.physicsObject;
            if (dragged && dragged.bodyID) {
                let b = dragged.bodyID;
                // Get raw coordinate from MuJoCo (swizzle=false)
                getPosition(this.data.xpos, b, this.tmpVec, false);
                getQuaternion(this.data.xquat, b, this.tmpQuat, false);

                // Calculate offset based on mouse drag
                let offset = toMujocoPos(this.dragStateManager.currentWorld.clone()
                    .sub(this.dragStateManager.worldHit).multiplyScalar(0.3));

                if (this.model.body_mocapid[b] >= 0) {
                    // Set the root body's mocap position...
                    let addr = this.model.body_mocapid[b] * 3;
                    let pos = this.data.mocap_pos;
                    pos[addr + 0] += offset.x;
                    pos[addr + 1] += offset.y;
                    pos[addr + 2] += offset.z;
                } else {
                    // Set the root body's position directly...
                    let root = this.model.body_rootid[b];
                    let addr = this.model.jnt_qposadr[this.model.body_jntadr[root]];
                    let pos = this.data.qpos;
                    pos[addr + 0] += offset.x;
                    pos[addr + 1] += offset.y;
                    pos[addr + 2] += offset.z;
                }
            }

            mujoco.mj_forward(this.model, this.data);
        }

        // 5. Update Three.js transforms
        for (let b = 0; b < this.model.nbody; b++) {
            if (this.bodies[b]) {
                getPosition(this.data.xpos, b, this.bodies[b].position);
                getQuaternion(this.data.xquat, b, this.bodies[b].quaternion);
                this.bodies[b].updateWorldMatrix();
            }
        }
        for (let l = 0; l < this.model.nlight; l++) {
            if (this.lights[l]) {
                getPosition(this.data.light_xpos, l, this.lights[l].position);
                getPosition(this.data.light_xdir, l, this.tmpVec);
                this.lights[l].lookAt(this.tmpVec.add(this.lights[l].position));
            }
        }

        drawTendonsAndFlex(this.mujocoRoot, this.model, this.data);
        this.sceneSetup.render();
    }
}

let demo = new MuJoCoDemo();
await demo.init();