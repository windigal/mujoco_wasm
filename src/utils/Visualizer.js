import * as THREE from 'three';

export class ArrowVisualizer {
    constructor(scene) {
        this.scene = scene;
        this.arrowCmd = this.createThickArrow(0x00ff00); // Green
        this.arrowReal = this.createThickArrow(0x0000ff); // Blue

        this.scene.add(this.arrowCmd);
        this.scene.add(this.arrowReal);
    }

    createThickArrow(color) {
        const arrowGroup = new THREE.Group();
        const material = new THREE.MeshPhongMaterial({ color: color, flatShading: true });

        const shaftGeo = new THREE.CylinderGeometry(0.02, 0.02, 1, 12);
        shaftGeo.translate(0, 0.5, 0);
        const shaft = new THREE.Mesh(shaftGeo, material);
        shaft.name = 'shaft';
        arrowGroup.add(shaft);

        const headGeo = new THREE.ConeGeometry(0.06, 0.15, 12);
        headGeo.translate(0, 0.075, 0);
        const head = new THREE.Mesh(headGeo, material);
        head.name = 'head';
        arrowGroup.add(head);

        arrowGroup.visible = false;
        return arrowGroup;
    }

    updateThickArrow(arrowGroup, origin, direction, length) {
        const maxLength = 1.0;
        const displayLength = Math.min(length, maxLength);

        if (displayLength < 0.05) {
            arrowGroup.visible = false;
            return;
        }
        arrowGroup.visible = true;

        arrowGroup.position.copy(origin);
        // Align Y axis to direction
        arrowGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

        const headLen = 0.15;
        const shaftLen = Math.max(0, displayLength - headLen);

        const shaft = arrowGroup.getObjectByName('shaft');
        const head = arrowGroup.getObjectByName('head');

        shaft.scale.set(1, shaftLen, 1);
        head.position.y = shaftLen;
    }

    update(enabled, robotBody, qvel, cmd_vel) {
        if (!enabled || !robotBody) {
            this.arrowCmd.visible = false;
            this.arrowReal.visible = false;
            return;
        }

        const robotPos = robotBody.position;
        const arrowOrigin = robotPos.clone().add(new THREE.Vector3(0, 0.4, 0));

        // 1. Real Velocity (Blue)
        // MuJoCo qvel: [vx, vy, vz]. Map to Three.js: x->x, y->-z, z->y
        // Force Y=0 for planar projection
        const realVel = new THREE.Vector3(qvel[0], 0, -qvel[1]);
        const realSpeed = realVel.length();
        this.updateThickArrow(this.arrowReal, arrowOrigin, realVel.normalize(), realSpeed * 0.5);

        // 2. Command Velocity (Green)
        // Local frame: X=Front, -Z=Left
        const localCmdVec = new THREE.Vector3(cmd_vel[0], 0, -cmd_vel[1]);
        const robotQuat = robotBody.quaternion;
        const globalCmdVec = localCmdVec.applyQuaternion(robotQuat);
        globalCmdVec.y = 0; // Force planar

        const cmdSpeed = globalCmdVec.length();
        this.updateThickArrow(this.arrowCmd, arrowOrigin, globalCmdVec.normalize(), cmdSpeed * 0.5);
    }
}

export class InputVisualizer {
    constructor(container) {
        this.container = container;
        this.initUI();
    }

    initUI() {
        // 1. 注入 CSS 样式
        const style = document.createElement('style');
        style.innerHTML = `
            #input-hud {
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 40px;
                align-items: center;
                pointer-events: none; /* 让鼠标穿透，不影响拖拽 */
                user-select: none;
                font-family: 'Courier New', monospace;
                font-weight: bold;
            }

            /* --- 键盘部分 --- */
            .kb-group {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            .kb-row {
                display: flex;
                gap: 5px;
                justify-content: center;
            }
            .key-box {
                width: 40px;
                height: 40px;
                border: 2px solid rgba(255, 255, 255, 0.5);
                border-radius: 8px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: rgba(255, 255, 255, 0.7);
                background: rgba(0, 0, 0, 0.3);
                transition: all 0.1s;
                font-size: 18px;
            }
            .key-box.active {
                background: rgba(0, 255, 0, 0.8);
                color: black;
                border-color: rgba(0, 255, 0, 1);
                transform: scale(0.95);
                box-shadow: 0 0 10px #00ff00;
            }

            /* --- 手柄部分 --- */
            .gp-group {
                display: flex;
                gap: 20px;
            }
            .stick-base {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                border: 2px solid rgba(255, 255, 255, 0.3);
                background: rgba(0, 0, 0, 0.3);
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .stick-tip {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: rgba(0, 150, 255, 0.8);
                position: absolute;
                box-shadow: 0 0 5px rgba(0, 150, 255, 0.8);
                transition: transform 0.05s linear; /* 平滑移动 */
            }
            .gp-label {
                position: absolute;
                bottom: -20px;
                width: 100%;
                text-align: center;
                color: rgba(255, 255, 255, 0.5);
                font-size: 12px;
            }
        `;
        document.head.appendChild(style);

        // 2. 创建 HTML 结构
        this.hud = document.createElement('div');
        this.hud.id = 'input-hud';
        this.hud.innerHTML = `
            <!-- 键盘区域 -->
            <div class="kb-group">
                <div class="kb-row">
                    <div id="key-q" class="key-box">Q</div>
                    <div id="key-w" class="key-box">W</div>
                    <div id="key-e" class="key-box">E</div>
                </div>
                <div class="kb-row">
                    <div id="key-a" class="key-box">A</div>
                    <div id="key-s" class="key-box">S</div>
                    <div id="key-d" class="key-box">D</div>
                </div>
            </div>

            <!-- 手柄区域 -->
            <div class="gp-group">
                <div class="stick-base">
                    <div id="stick-l" class="stick-tip"></div>
                    <div class="gp-label">L (Move)</div>
                </div>
                <div class="stick-base">
                    <div id="stick-r" class="stick-tip"></div>
                    <div class="gp-label">R (Turn)</div>
                </div>
            </div>
        `;
        this.container.appendChild(this.hud);

        // 缓存 DOM 引用以提高性能
        this.els = {
            q: document.getElementById('key-q'),
            w: document.getElementById('key-w'),
            e: document.getElementById('key-e'),
            a: document.getElementById('key-a'),
            s: document.getElementById('key-s'),
            d: document.getElementById('key-d'),
            stickL: document.getElementById('stick-l'),
            stickR: document.getElementById('stick-r')
        };
    }

    update(inputHandler) {
        // 1. 更新键盘状态
        const keys = inputHandler.keys;
        this.toggleKey(this.els.w, keys.w);
        this.toggleKey(this.els.s, keys.s);
        this.toggleKey(this.els.a, keys.a);
        this.toggleKey(this.els.d, keys.d);
        this.toggleKey(this.els.q, keys.q);
        this.toggleKey(this.els.e, keys.e);

        // 2. 更新手柄状态 (摇杆可视化)
        // 我们从 inputHandler 的 update 逻辑中知道：
        // cmd[0] = vx (前), cmd[1] = vy (左), cmd[2] = yaw (左)
        // 这里的可视化我们尽量反映“输入源”的状态。

        const gp = navigator.getGamepads()[0];
        let lx = 0, ly = 0, rx = 0;

        if (gp) {
            // 如果连了手柄，直接显示手柄真实数据
            lx = gp.axes[0];
            ly = gp.axes[1];
            rx = gp.axes[2];
            // 死区简单的过滤一下，避免视觉抖动
            if (Math.abs(lx) < 0.1) lx = 0;
            if (Math.abs(ly) < 0.1) ly = 0;
            if (Math.abs(rx) < 0.1) rx = 0;
        } else {
            // 如果没连手柄，为了视觉效果，我们可以把键盘输入映射到摇杆上 (可选)
            // 这样即使只按键盘，右边的圆圈也会动，看起来更直观
            if (keys.a) lx = -1;
            if (keys.d) lx = 1;
            if (keys.w) ly = -1;
            if (keys.s) ly = 1;

            if (keys.q) rx = -1;
            if (keys.e) rx = 1;
        }

        // 限制移动范围 (25px 是半径差)
        const maxDist = 25;
        this.els.stickL.style.transform = `translate(${lx * maxDist}px, ${ly * maxDist}px)`;
        // 右摇杆只控制左右转向 (X轴)
        this.els.stickR.style.transform = `translate(${rx * maxDist}px, 0px)`;
    }

    toggleKey(el, isActive) {
        if (isActive) el.classList.add('active');
        else el.classList.remove('active');
    }
}