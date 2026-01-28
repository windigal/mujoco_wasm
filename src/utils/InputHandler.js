export class InputHandler {
    constructor() {
        this.cmd_vel = new Float32Array([0.0, 0.0, 0.0]); // 最终输出给外部的 [vx, vy, yaw]

        // 内部状态：当前平滑后的归一化输入值 (-1.0 ~ 1.0)
        this.current_input = new Float32Array([0.0, 0.0, 0.0]);

        // 最大速度配置
        this.max_cmd = [1.5, 1.0, 2.0];

        // 平滑系数 (加速度)
        // 值越小越平滑，起步和刹车越慢。
        // 0.05 意味着从 0 到 1 需要 20 帧 (约 0.33秒)，比较像真实的惯性
        this.smoothing_step = 0.02;

        // 键盘状态记录
        this.keys = {
            w: false, s: false,
            a: false, d: false,
            q: false, e: false
        };

        // 绑定键盘事件
        this._onKey = (e, isDown) => this.onKey(e, isDown);
        window.addEventListener('keydown', (e) => this._onKey(e, true));
        window.addEventListener('keyup', (e) => this._onKey(e, false));

        // 👇👇👇 核心修复：监听窗口失去焦点事件 👇👇👇
        // 防止按住键切窗口后，指令卡死
        window.addEventListener('blur', () => this.resetKeys());
    }

    onKey(event, isDown) {
        const key = event.key.toLowerCase();
        if (this.keys.hasOwnProperty(key)) {
            this.keys[key] = isDown;
        }
    }

    // 当窗口失去焦点时，清空所有按键状态
    resetKeys() {
        for (const key in this.keys) {
            this.keys[key] = false;
        }
    }

    // 辅助函数：让 current 数值以固定步长向 target 靠近
    approach(current, target, step) {
        if (current < target) {
            return Math.min(current + step, target);
        } else if (current > target) {
            return Math.max(current - step, target);
        }
        return target;
    }

    update() {
        // --- 1. 获取目标输入 (Target Input) ---
        // 我们先计算用户“想要”达到的归一化速度 (-1 ~ 1)
        let target_gx = 0, target_gy = 0, target_gr = 0;

        const gamepads = navigator.getGamepads();
        const gp = gamepads[0];
        let hasGamepadInput = false;

        // A. 手柄处理
        if (gp) {
            let lx = gp.axes[0];
            let ly = gp.axes[1];
            let rx = gp.axes[2];

            const dead_zone = 0.1;
            if (Math.abs(lx) < dead_zone) lx = 0;
            if (Math.abs(ly) < dead_zone) ly = 0;
            if (Math.abs(rx) < dead_zone) rx = 0;

            if (lx !== 0 || ly !== 0 || rx !== 0) {
                hasGamepadInput = true;
                target_gx = -ly; // 前进
                target_gy = -lx; // 左移
                target_gr = -rx; // 左转
            }
        }

        // B. 键盘处理 (如果手柄没动，才读键盘)
        if (!hasGamepadInput) {
            if (this.keys.w) target_gx += 1.0;
            if (this.keys.s) target_gx -= 1.0;

            if (this.keys.a) target_gy += 1.0; // Y轴左正
            if (this.keys.d) target_gy -= 1.0;

            if (this.keys.q) target_gr += 1.0; // Yaw左正
            if (this.keys.e) target_gr -= 1.0;
        }

        // --- 2. 速度平滑插值 (Smoothing) ---
        // 这一步解决了键盘控制“太冲”的问题
        // 每一帧，内部状态只向目标状态移动一小步 (this.smoothing_step)

        this.current_input[0] = this.approach(this.current_input[0], target_gx, this.smoothing_step);
        this.current_input[1] = this.approach(this.current_input[1], target_gy, this.smoothing_step);
        this.current_input[2] = this.approach(this.current_input[2], target_gr, this.smoothing_step);

        // 如果想让手柄响应更跟手(不需要惯性)，可以在 hasGamepadInput 为 true 时使用更大的 step
        // 但统一用平滑会让机器狗看起来更有质感

        // --- 3. 输出最终指令 ---
        // 将归一化的平滑输入 * 最大速度
        this.cmd_vel[0] = this.current_input[0] * this.max_cmd[0];
        this.cmd_vel[1] = this.current_input[1] * this.max_cmd[1];
        this.cmd_vel[2] = this.current_input[2] * this.max_cmd[2];
    }

    getCmd() {
        return this.cmd_vel;
    }
}