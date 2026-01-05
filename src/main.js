import * as THREE from 'three';
import { GUI } from '../node_modules/three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { DragStateManager } from './utils/DragStateManager.js';
import { setupGUI, downloadExampleScenesFolder, loadSceneFromURL, drawTendonsAndFlex, getPosition, getQuaternion, toMujocoPos, standardNormal } from './mujocoUtils.js';
import { initOnnxModel, runOnnx } from './onnxClient.js';
import load_mujoco from 'mujoco_wasm';

// Load the MuJoCo Module
const mujoco = await load_mujoco();

// Set up Emscripten's Virtual File System
var initialScene = "go2/stairs.xml";
mujoco.FS.mkdir('/working');
mujoco.FS.mount(mujoco.MEMFS, { root: '.' }, '/working');
// mujoco.FS.writeFile("/working/" + initialScene, await (await fetch("./assets/scenes/" + initialScene)).text());

export class MuJoCoDemo {
  constructor() {
    this.mujoco = mujoco;

    // Load in the state from XML
    // this.model = mujoco.MjModel.loadFromXML("/working/" + initialScene);
    // this.data = new mujoco.MjData(this.model);
    this.model = null;
    this.data = null;

    // Define Random State Variables
    this.params = { scene: initialScene, paused: false, help: false, ctrlnoiserate: 0.0, ctrlnoisestd: 0.0, keyframeNumber: 0 };
    this.mujoco_time = 0.0;
    this.bodies = {}, this.lights = {};
    this.tmpVec = new THREE.Vector3();
    this.tmpQuat = new THREE.Quaternion();
    this.updateGUICallbacks = [];
    this.autoControlInterval = null;
    this.autoControlStartTime = 0;
    // ONNX inference state
    this.onnxReady = false;
    this.pendingInference = null;
    this.currentAction = new Float32Array(12).fill(0.0);
    this.cmd_vel = new Float32Array([0.0, 0.0, 0.0]);
    this.max_cmd = [2.0, 1.0, 2.0]; 
    this.stepCounter = 0;
    this.control_decimation = 10; // default, overridden by config if needed
    // default normalization / control params (from deploy_mujoco/configs/go2.yaml)
    this.kps = [20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0];
    this.kds = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
    this.default_angles = [0.1, 0.8, -1.5, -0.1, 0.8, -1.5, 0.1, 1.0, -1.5, -0.1, 1.0, -1.5];
    this.lin_vel_scale = 2.0; 
    this.ang_vel_scale = 0.25; 
    this.dof_pos_scale = 1.0; 
    this.dof_vel_scale = 0.05; 
    this.action_scale = 0.25; 
    this.cmd_scale = [2.0, 2.0, 0.25];
    this.currentTarget = new Float32Array(this.default_angles);

    this.container = document.createElement('div');
    document.body.appendChild(this.container);

    this.scene = new THREE.Scene();
    this.scene.name = 'scene';

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.001, 100);
    this.camera.name = 'PerspectiveCamera';
    this.camera.position.set(2.0, 1.7, 1.7);
    this.scene.add(this.camera);

    this.scene.background = new THREE.Color(0.15, 0.25, 0.35);
    this.scene.fog = new THREE.Fog(this.scene.background, 15, 25.5);

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.1 * 3.14);
    this.ambientLight.name = 'AmbientLight';
    this.scene.add(this.ambientLight);

    this.spotlight = new THREE.SpotLight();
    this.spotlight.angle = 1.11;
    this.spotlight.distance = 10000;
    this.spotlight.penumbra = 0.5;
    this.spotlight.castShadow = true; // default false
    this.spotlight.intensity = this.spotlight.intensity * 3.14 * 10.0;
    this.spotlight.shadow.mapSize.width = 1024; // default
    this.spotlight.shadow.mapSize.height = 1024; // default
    this.spotlight.shadow.camera.near = 0.1; // default
    this.spotlight.shadow.camera.far = 100; // default
    this.spotlight.position.set(0, 3, 3);
    const targetObject = new THREE.Object3D();
    this.scene.add(targetObject);
    this.spotlight.target = targetObject;
    targetObject.position.set(0, 1, 0);
    this.scene.add(this.spotlight);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(1.0);////window.devicePixelRatio );
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    THREE.ColorManagement.enabled = false;
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    //this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    //this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    //this.renderer.toneMappingExposure = 2.0;
    this.renderer.useLegacyLights = true;

    this.renderer.setAnimationLoop(this.render.bind(this));

    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0.7, 0);
    this.controls.panSpeed = 2;
    this.controls.zoomSpeed = 1;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.10;
    this.controls.screenSpacePanning = true;
    this.controls.update();

    window.addEventListener('resize', this.onWindowResize.bind(this));

    // Initialize the Drag State Manager.
    this.dragStateManager = new DragStateManager(this.scene, this.renderer, this.camera, this.container.parentElement, this.controls);
  }

  async init() {
    // Download the the examples to MuJoCo's virtual file system
    await downloadExampleScenesFolder(mujoco);

    // Initialize the three.js Scene using the .xml Model in initialScene
    [this.model, this.data, this.bodies, this.lights] =
      await loadSceneFromURL(mujoco, initialScene, this);

    this.gui = new GUI();
    setupGUI(this);

    // initialize ONNX model from models/policy.onnx
    try {
      await initOnnxModel('./models/policy.onnx');
      this.onnxReady = true;
    } catch (e) {
      console.warn('ONNX model init failed', e);
    }
    // 强制设置初始关节状态 (Reset to stand)
    if (this.model && this.data) {
      // 抬高一点，别陷地里
      this.data.qpos[2] = 0.45;
      // 设置 12 个关节的初始角度
      for (let i = 0; i < 12; i++) {
        this.data.qpos[7 + i] = this.default_angles[i];
      }
      this.mujoco.mj_forward(this.model, this.data);
    }
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  updateGamepadInput() {
    // 获取所有连接的手柄
    const gamepads = navigator.getGamepads();
    // 通常第一个连接的手柄在 index 0
    const gp = gamepads[0];

    if (!gp) return; // 没有手柄连接，直接返回

    // HTML5 Gamepad 标准映射:
    // axes[0] = 左摇杆 X (左-1, 右+1)
    // axes[1] = 左摇杆 Y (上-1, 下+1)
    // axes[2] = 右摇杆 X (左-1, 右+1)
    // axes[3] = 右摇杆 Y (上-1, 下+1)

    let lx = gp.axes[0];
    let ly = gp.axes[1];
    let rx = gp.axes[2]; // 对应 Python 里的 axis 3 (通常是右摇杆横向)

    // 死区处理 (Deadzone) - 参考 Python 代码
    const dead_zone = 0.1;
    if (Math.abs(lx) < dead_zone) lx = 0;
    if (Math.abs(ly) < dead_zone) ly = 0;
    if (Math.abs(rx) < dead_zone) rx = 0;

    // 映射逻辑 (参考 Python get_xbox_command)
    // cmd_x = -ly (因为摇杆推上去是 -1，我们要的是正速度)
    // cmd_y = -lx (因为摇杆向左是 -1，Robotics里Y轴向左是正)
    // cmd_yaw = -rx (同理，向左拨是正旋转)

    this.cmd_vel[0] = -ly * this.max_cmd[0]; // Vx
    this.cmd_vel[1] = -lx * this.max_cmd[1]; // Vy
    console.log("rotation", rx);
    this.cmd_vel[2] = -rx * this.max_cmd[2]; // Yaw
  }

  async render(timeMS) {
    if (!this.model || !this.data) {
      // 可以选择在这里渲染一个空的场景，或者简单的 Loading 文字
      this.renderer.render(this.scene, this.camera);
      return;
    }
    this.controls.update();
    this.updateGamepadInput();

    if (!this.params["paused"]) {
      let timestep = this.model.opt.timestep;
      if (timeMS - this.mujoco_time > 35.0) { this.mujoco_time = timeMS; }
      while (this.mujoco_time < timeMS) {

        // --- 1. 同步推理逻辑 (Sync Inference) ---
        // 只有到了控制帧才进行推理
        if (this.onnxReady && (this.stepCounter % this.control_decimation === 0)) {
          const obs = buildObservation(this); // 1. 获取当前状态

          try {
            // 2. [关键改变] 使用 await 阻塞等待推理结果
            // 代码会在这里暂停，直到 ONNX 算出结果
            const action = await runOnnx(obs);

            // 3. 拿到结果后，立即更新动作和目标
            this.currentAction = action;
            for (let i = 0; i < 12; i++) {
              this.currentTarget[i] = action[i] * this.action_scale + this.default_angles[i];
            }
          } catch (e) {
            console.error("Inference error:", e);
          }
        }

        // Jitter the control state with gaussian random noise
        if (this.params["ctrlnoisestd"] > 0.0) {
          let rate = Math.exp(-timestep / Math.max(1e-10, this.params["ctrlnoiserate"]));
          let scale = this.params["ctrlnoisestd"] * Math.sqrt(1 - rate * rate);
          let currentCtrl = this.data.ctrl;
          for (let i = 0; i < currentCtrl.length; i++) {
            currentCtrl[i] = rate * currentCtrl[i] + scale * standardNormal();
            this.params["Actuator " + i] = currentCtrl[i];
          }
        }

        // Clear old perturbations, apply new ones.
        for (let i = 0; i < this.data.qfrc_applied.length; i++) { this.data.qfrc_applied[i] = 0.0; }
        let dragged = this.dragStateManager.physicsObject;
        if (dragged && dragged.bodyID) {
          for (let b = 0; b < this.model.nbody; b++) {
            if (this.bodies[b]) {
              getPosition(this.data.xpos, b, this.bodies[b].position);
              getQuaternion(this.data.xquat, b, this.bodies[b].quaternion);
              this.bodies[b].updateWorldMatrix();
            }
          }
          let bodyID = dragged.bodyID;
          this.dragStateManager.update(); // Update the world-space force origin
          let force = toMujocoPos(this.dragStateManager.currentWorld.clone().sub(this.dragStateManager.worldHit).multiplyScalar(this.model.body_mass[bodyID] * 250));
          let point = toMujocoPos(this.dragStateManager.worldHit.clone());
          mujoco.mj_applyFT(this.model, this.data, [force.x, force.y, force.z], [0, 0, 0], [point.x, point.y, point.z], bodyID, this.data.qfrc_applied);

          // TODO: Apply pose perturbations (mocap bodies only).
        }

        // Apply latest model action (if available) at each physics step
        if (this.model && this.model.nu >= 12) {
          for (let i = 0; i < 12; i++) {
            let target = this.currentTarget[i]; // 这里读到的绝对是最新鲜的目标

            let q = this.data.qpos[7 + i];
            let dq = this.data.qvel[6 + i];

            // 计算力矩
            let tau = (target - q) * this.kps[i] + (0.0 - dq) * this.kds[i];
            tau = Math.max(-25.0, Math.min(25.0, tau));

            this.data.ctrl[i] = tau;
          }
        }

        mujoco.mj_step(this.model, this.data);
        this.stepCounter++;
        this.mujoco_time += timestep * 1000.0;
      }

    } else if (this.params["paused"]) {
      this.dragStateManager.update(); // Update the world-space force origin
      let dragged = this.dragStateManager.physicsObject;
      if (dragged && dragged.bodyID) {
        let b = dragged.bodyID;
        getPosition(this.data.xpos, b, this.tmpVec, false); // Get raw coordinate from MuJoCo
        getQuaternion(this.data.xquat, b, this.tmpQuat, false); // Get raw coordinate from MuJoCo

        let offset = toMujocoPos(this.dragStateManager.currentWorld.clone()
          .sub(this.dragStateManager.worldHit).multiplyScalar(0.3));
        if (this.model.body_mocapid[b] >= 0) {
          // Set the root body's mocap position...
          console.log("Trying to move mocap body", b);
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

    // Update body transforms.
    for (let b = 0; b < this.model.nbody; b++) {
      if (this.bodies[b]) {
        getPosition(this.data.xpos, b, this.bodies[b].position);
        getQuaternion(this.data.xquat, b, this.bodies[b].quaternion);
        this.bodies[b].updateWorldMatrix();
      }
    }

    // Update light transforms.
    for (let l = 0; l < this.model.nlight; l++) {
      if (this.lights[l]) {
        getPosition(this.data.light_xpos, l, this.lights[l].position);
        getPosition(this.data.light_xdir, l, this.tmpVec);
        this.lights[l].lookAt(this.tmpVec.add(this.lights[l].position));
      }
    }

    // Draw Tendons and Flex verts
    drawTendonsAndFlex(this.mujocoRoot, this.model, this.data);

    // Render!
    this.renderer.render(this.scene, this.camera);
  }
}

function buildObservation(demo) {
  // Follow deploy_mujoco/configs/go2.yaml ordering
  const num_actions = 12;
  const num_obs = 45;
  let obs = new Float32Array(num_obs);
  // qpos: torso pos(3) + quat(4) + spinal(?) ... but deploy_go2 used specific layout
  // We'll replicate the same entries used in deploy_go2.py
  // obs[:3]=ang_vel, obs[3:6]=gravity_orientation, obs[6:9]=cmd*cmd_scale
  // obs[9:9+num_actions]=qj[idx_mj2model]
  // obs[9+num_actions:9+2*num_actions]=dqj[idx_mj2model]
  // obs[9+2*num_actions:9+3*num_actions]=action[idx_mj2model]

  // angular velocity (data.qvel[3:6])
  obs[0] = demo.data.qvel[3]; obs[1] = demo.data.qvel[4]; obs[2] = demo.data.qvel[5];
  // gravity orientation from quaternion
  const qw = demo.data.qpos[3], qx = demo.data.qpos[4], qy = demo.data.qpos[5], qz = demo.data.qpos[6];
  const gravity_orientation = [2 * (-qz * qx + qw * qy), -2 * (qz * qy + qw * qx), 1 - 2 * (qw * qw + qz * qz)];
  obs[3] = gravity_orientation[0]; 
  obs[4] = gravity_orientation[1]; obs[5] = gravity_orientation[2];
  // cmd - use default init command
  obs[6] = demo.cmd_vel[0] * demo.cmd_scale[0];
  obs[7] = demo.cmd_vel[1] * demo.cmd_scale[1];
  obs[8] = demo.cmd_vel[2] * demo.cmd_scale[2];

  // joint positions qj (exclude root and floating base) - qpos from index 7 onward
  let qj = [];
  for (let i = 0; i < num_actions; i++) { qj.push(demo.data.qpos[7 + i]); }
  // joint velocities dqj from data.qvel[6:]
  let dqj = [];
  for (let i = 0; i < num_actions; i++) { dqj.push(demo.data.qvel[6 + i]); }

  // normalize qj and dqj according to config scales
  for (let i = 0; i < num_actions; i++) {
    obs[9 + i] = (qj[i] - demo.default_angles[i]) * demo.dof_pos_scale;
    obs[9 + num_actions + i] = dqj[i] * demo.dof_vel_scale;
    obs[9 + 2 * num_actions + i] = demo.currentAction[i]; // previous action placeholder
  }

  return obs;
}

let demo = new MuJoCoDemo();
await demo.init();
