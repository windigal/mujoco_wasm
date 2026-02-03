<div align="center">
  <h1 align="center">MuJoCo WASM + Go2 ONNX Web</h1>
  <p align="center">
    <a href="README.md">English</a> | <span>中文</span>
  </p>
</div>

**简介**

这个项目在浏览器中运行 MuJoCo（WASM）仿真，并使用 **ONNX Runtime Web** 对 Unitree-Go2模型进行在线推理。仓库还包含多种测试地形（台阶、坡道、赛道等），用于验证运动控制与策略推理的效果。[点击查看实例](https://robogauge.github.io/mujoco_wasm/index.html)


## 快速上手（本地运行）

1. 安装依赖

```bash
npm install
```

2. 构建前端 bundle

```bash
npm run build
```

3. 启动本地静态服务器

```bash
python server.py
# 访问 http://localhost:8090
```

> 说明：为了支持 `onnxruntime-web` 的多线程/SharedArrayBuffer，页面需要启用 **COOP/COEP** 安全头（`server.py` 已自动设置），推荐使用现代浏览器（Chrome/Edge/Firefox 最新版）。


## 使用说明

- 页面加载后会显示仿真界面与右侧 GUI（lil-gui）。
- 在 `Scene` 下拉菜单选择不同地形，页面会自动重载对应场景。
- 在 `AI Controls` 中选择模型（PPO / MOECTS）并点击 **Enable AI Control** 启用策略推理。
- 可以使用键盘WASD/QE或者手柄来控制前后左右与转向

## 添加模型与场景
- 添加模型：将模型文件放到`models/`后在 `src/main.js` 的 `modelConfigs` 中新增一项或替换现有项：

```js
modelConfigs: {
  "my_model": { url: './models/my_model.onnx', history: 3, stacking: 'frame' }
}
```

- 添加场景：把场景及其资源放到 `assets/scenes/go2/`，并在 `src/mujocoUtils.js` 的 `Scene` 选项中添加对应路径。


## 致谢 & 贡献

仓库代码参考自[zalo/mujoco_wasm](https://github.com/zalo/mujoco_wasm)

欢迎提交 Issues/PR 来改进示例、添加新的地形或模型。

