import { initOnnxModel, runOnnx } from './onnxClient.js';

export class RobotController {
    constructor(mujoco) {
        this.mujoco = mujoco;
        this.model = null;
        this.data = null;

        // RL Configs (Go2)
        this.num_actions = 12;
        this.num_obs = 45;
        this.kps = [20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0];
        this.kds = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
        this.default_angles = [0.1, 0.8, -1.5, -0.1, 0.8, -1.5, 0.1, 1.0, -1.5, -0.1, 1.0, -1.5];
        this.lin_vel_scale = 2.0;
        this.ang_vel_scale = 0.25;
        this.dof_pos_scale = 1.0;
        this.dof_vel_scale = 0.05;
        this.action_scale = 0.25;
        this.cmd_scale = [2.0, 2.0, 0.25];

        // State
        this.currentTarget = new Float32Array(this.default_angles);
        this.currentAction = new Float32Array(12).fill(0.0);

        // 历史观测缓冲区
        this.historyLength = 1; // 默认为1 (无堆叠)
        this.obsHistory = [];   // 存储最近 N 帧的 Float32Array

        // Inference State
        this.onnxReady = false;
        this.loadingModel = false;
        this.obsSlices = [
            [0, 3],   // AngVel
            [3, 6],   // Gravity
            [6, 9],   // Commands
            [9, 21],  // Dof Pos
            [21, 33], // Dof Vel
            [33, 45]  // Previous Action
        ];
    }

    setPhysics(model, data) {
        this.model = model;
        this.data = data;
    }

    async loadModel(config) {
        const { url, history, stacking } = config;

        // 如果完全一样，直接返回
        if (this.onnxReady && this.currentModelUrl === url &&
            this.historyLength === history && this.stackingMode === stacking) {
            return true;
        }

        try {
            this.loadingModel = true;
            this.onnxReady = false;

            console.log(`Loading: ${url} | History: ${history} | Stacking: ${stacking}`);

            await initOnnxModel(url);

            this.currentModelUrl = url;
            this.historyLength = history;
            this.stackingMode = stacking; // 更新堆叠模式
            this.obsHistory = [];

            this.onnxReady = true;
            this.loadingModel = false;
            return true;
        } catch (e) {
            console.error("Model load failed", e);
            this.loadingModel = false;
            return false;
        }
    }

    resetPose() {
        if (!this.model || !this.data) return;
        console.log("Resetting robot pose...");

        this.data.qpos[2] += 0.2;
        this.data.qpos[3] = 1.0; // w
        this.data.qpos[4] = 0.0;
        this.data.qpos[5] = 0.0;
        this.data.qpos[6] = 0.0;

        for (let i = 0; i < 12; i++) {
            this.data.qpos[7 + i] = this.default_angles[i];
            this.currentTarget[i] = this.default_angles[i];
        }

        this.data.qvel.fill(0);
        this.data.qacc.fill(0);
        this.currentAction.fill(0);

        this.obsHistory = [];
        this.mujoco.mj_forward(this.model, this.data);
    }

    buildObservation(cmd_vel) {
        let obs = new Float32Array(this.num_obs);
        const d = this.data;

        // 1. Angular Velocity (qvel 3-6)
        obs[0] = d.qvel[3];
        obs[1] = d.qvel[4];
        obs[2] = d.qvel[5];

        // 2. Gravity Orientation
        const qw = d.qpos[3], qx = d.qpos[4], qy = d.qpos[5], qz = d.qpos[6];
        obs[3] = 2 * (-qz * qx + qw * qy);
        obs[4] = -2 * (qz * qy + qw * qx);
        obs[5] = 1 - 2 * (qw * qw + qz * qz);

        // 3. Command
        obs[6] = cmd_vel[0] * this.cmd_scale[0];
        obs[7] = cmd_vel[1] * this.cmd_scale[1];
        obs[8] = cmd_vel[2] * this.cmd_scale[2];

        // 4. Joint Data
        let qj = [], dqj = [];
        for (let i = 0; i < this.num_actions; i++) {
            qj.push(d.qpos[7 + i]);
            dqj.push(d.qvel[6 + i]);
        }

        for (let i = 0; i < this.num_actions; i++) {
            obs[9 + i] = (qj[i] - this.default_angles[i]) * this.dof_pos_scale;
            obs[9 + this.num_actions + i] = dqj[i] * this.dof_vel_scale;
            obs[9 + 2 * this.num_actions + i] = this.currentAction[i];
        }
        return obs;
    }

    flattenHistoryByTerm() {
        const totalSize = this.num_obs * this.historyLength;
        const flatObs = new Float32Array(totalSize);
        let offset = 0;

        // 遍历每个特征项 (AngVel, Gravity, ...)
        for (const [start, end] of this.obsSlices) {
            const sliceSize = end - start;

            // 遍历历史帧 (从旧到新)
            for (let t = 0; t < this.historyLength; t++) {
                const frameData = this.obsHistory[t];
                // 提取该帧的对应切片
                const termData = frameData.subarray(start, end);

                // 写入 flatObs
                flatObs.set(termData, offset);
                offset += sliceSize;
            }
        }
        return flatObs;
    }

    flattenHistoryByFrame() {
        const totalSize = this.num_obs * this.historyLength;
        const flatObs = new Float32Array(totalSize);
        for (let i = 0; i < this.historyLength; i++) {
            flatObs.set(this.obsHistory[i], i * this.num_obs);
        }
        return flatObs;
    }

    async infer(cmd_vel) {
        if (!this.onnxReady) return;

        const currentObs = this.buildObservation(cmd_vel);

        // 维护历史队列 (Cold Start 填充逻辑)
        if (this.obsHistory.length === 0) {
            for (let i = 0; i < this.historyLength - 1; i++) {
                this.obsHistory.push(new Float32Array(this.num_obs).fill(0));
            }
        }
        if (this.obsHistory.length >= this.historyLength) {
            this.obsHistory.shift();
        }
        this.obsHistory.push(new Float32Array(currentObs));

        // 👇 根据配置选择堆叠方式 👇
        let flatObs;
        if (this.stackingMode === 'term') {
            flatObs = this.flattenHistoryByTerm();
        } else {
            flatObs = this.flattenHistoryByFrame();
        }

        try {
            const action = await runOnnx(flatObs);
            this.currentAction = action;
            for (let i = 0; i < 12; i++) {
                this.currentTarget[i] = action[i] * this.action_scale + this.default_angles[i];
            }
        } catch (e) {
            console.error("Inference Error", e);
        }
    }

    computePD(enabledRL) {
        if (!this.model || this.model.nu < 12) return;

        for (let i = 0; i < 12; i++) {
            if (enabledRL) {
                let target = this.currentTarget[i];
                let q = this.data.qpos[7 + i];
                let dq = this.data.qvel[6 + i];
                let tau = (target - q) * this.kps[i] + (0.0 - dq) * this.kds[i];
                tau = Math.max(-100.0, Math.min(100.0, tau));
                this.data.ctrl[i] = tau;
            } else {
                this.data.ctrl[i] = 0.0;
            }
        }
    }
}