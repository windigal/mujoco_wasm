import * as THREE from 'three';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';

export class SceneSetup {
    constructor(container) {
        this.container = container;

        // 1. Scene
        this.scene = new THREE.Scene();
        this.scene.name = 'scene';
        this.scene.background = new THREE.Color(0.15, 0.25, 0.35);
        this.scene.fog = new THREE.Fog(this.scene.background, 15, 25.5);

        // 2. Camera
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.001, 100);
        this.camera.name = 'PerspectiveCamera';
        this.camera.position.set(2.0, 1.7, 1.7);
        this.scene.add(this.camera);

        // 3. Lights
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.1 * 3.14);
        this.scene.add(this.ambientLight);

        this.spotlight = new THREE.SpotLight();
        this.spotlight.angle = 1.11;
        this.spotlight.distance = 10000;
        this.spotlight.penumbra = 0.5;
        this.spotlight.castShadow = true;
        this.spotlight.intensity = this.spotlight.intensity * 3.14 * 10.0;
        this.spotlight.shadow.mapSize.width = 1024;
        this.spotlight.shadow.mapSize.height = 1024;
        this.spotlight.shadow.camera.near = 0.1;
        this.spotlight.shadow.camera.far = 100;
        this.spotlight.position.set(0, 3, 3);

        const targetObject = new THREE.Object3D();
        targetObject.position.set(0, 1, 0);
        this.scene.add(targetObject);
        this.spotlight.target = targetObject;
        this.scene.add(this.spotlight);

        // 4. Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(1.0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        THREE.ColorManagement.enabled = false;
        this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
        this.renderer.useLegacyLights = true;

        this.container.appendChild(this.renderer.domElement);

        // 5. Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 0.7, 0);
        this.controls.panSpeed = 2;
        this.controls.zoomSpeed = 1;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.10;
        this.controls.screenSpacePanning = true;
        this.controls.update();

        // Resize Event
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}