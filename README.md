<p align="center">
  <a href="https://zalo.github.io/mujoco_wasm/"><img src="./assets/MuJoCoWasmLogo.png" href></a>
</p>
<p align="left">
  <a href="https://github.com/zalo/mujoco_wasm/deployments/activity_log?environment=github-pages">
      <img src="https://img.shields.io/github/deployments/zalo/mujoco_wasm/github-pages?label=Github%20Pages%20Deployment" title="Github Pages Deployment"></a>
  <!--<a href="https://github.com/zalo/mujoco_wasm/deployments/activity_log?environment=Production">
      <img src="https://img.shields.io/github/deployments/zalo/mujoco_wasm/Production?label=Vercel%20Deployment" title="Vercel Deployment"></a> -->
  <!--<a href="https://lgtm.com/projects/g/zalo/mujoco_wasm/context:javascript">
      <img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/zalo/mujoco_wasm.svg?logo=lgtm&logoWidth=18"/></a> -->
  <a href="https://github.com/zalo/mujoco_wasm/commits/main">
      <img src="https://img.shields.io/github/last-commit/zalo/mujoco_wasm" title="Last Commit Date"></a>
  <a href="https://github.com/zalo/mujoco_wasm/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-brightgreen" title="License: MIT"></a>
</p>

## The Power of MuJoCo in your Browser.

Load and Run MuJoCo 3.3.8 Models using JavaScript and the official MuJoCo WebAssembly Bindings.

This project used to be a WASM compilation and set of javascript bindings for MuJoCo, but since Deepmind completed the official MuJoCo bindings, this project is now just a small demo suite in the `examples` folder.

### [See the Live Demo Here](https://zalo.github.io/mujoco_wasm/)

### [See a more Advanced Example Here](https://kzakka.com/robopianist/)

## Build

Simply ensure `npm` is installed and run `npm install` to pull three.js and MuJoCo's Official WASM bindings.

Then run `npm run build` and `python server.py` to start the program.