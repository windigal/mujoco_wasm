<div align="center">
	<h1 align="center">MuJoCo WASM + Go2 ONNX Web</h1>
	<p align="center">
		<a href="README_zh.md">中文</a> | <span>English </span>
	</p>
</div>

**Overview**

This project runs MuJoCo (WASM) simulations in the browser and performs online inference of a Go2 (quadruped) policy using ONNX Runtime Web. The repository also includes several test terrains (steps, slopes, tracks, etc.) to validate control and policy performance. [See the live demo here](https://robogauge.github.io/mujoco_wasm/index.html)


## Quick Start (Local) 

1. Install dependencies:

```bash
npm install
```

2. Build the frontend bundle:

```bash
npm run build
```

3. Start the local static server:

```bash
python server.py
# Visit http://localhost:8090
```

> Note: To use ONNX Runtime Web multithreading / SharedArrayBuffer, the page must be served with COOP/COEP headers (already handled by `server.py`). Use a modern browser (latest Chrome/Edge/Firefox recommended).

## How to Use

- After the page loads you will see the simulation area and the GUI (lil-gui).
- Choose different terrains from the Scene dropdown; the page will reload the selected scene.
- In AI Controls select a model (PPO / MOECTS) and click "Enable AI Control" to activate policy inference.
- Use keyboard WASD/QE or joystick to control the 

## Adding / Replacing ONNX Models or Scenes

- Add an ONNX model: put the model file in `models/` (e.g. `my_model.onnx`), then add or replace an entry in `src/main.js`'s `modelConfigs`:

```js
modelConfigs: {
  "my_model": { url: './models/my_model.onnx', history: 3, stacking: 'frame' }
}
```

- Add a scene: place the scene and its assets in `assets/scenes/go2/` and add the scene path to the `Scene` options in `src/mujocoUtils.js`.

## Acknowledgment & Contributing

This repository references from [zalo/mujoco_wasm](https://github.com/zalo/mujoco_wasm)

Contributions are welcome (issues/PRs) to add scenes, models, or improve examples.
