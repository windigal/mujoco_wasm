import * as THREE from 'three';
import { Vector3 } from 'three';

export class DragStateManager {
    constructor(scene, renderer, camera, container, controls) {
        this.scene = scene;
        this.renderer = renderer;
        this.camera = camera;
        this.container = container; // 保存 container 引用以便移除监听
        this.controls = controls;

        this.mousePos = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.raycaster.params.Line.threshold = 0.1;
        this.grabDistance = 0.0;
        this.active = false;
        this.physicsObject = null;

        // 初始化箭头
        this.arrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 15, 0x666666);
        this.arrow.setLength(15, 3, 1);
        this.scene.add(this.arrow);
        this.arrow.line.material.transparent = true;
        this.arrow.cone.material.transparent = true;
        this.arrow.line.material.opacity = 0.5;
        this.arrow.cone.material.opacity = 0.5;
        this.arrow.visible = false;

        this.previouslySelected = null;
        this.higlightColor = 0xff0000;

        this.localHit = new Vector3();
        this.worldHit = new Vector3();
        this.currentWorld = new Vector3();

        // 👇👇👇 关键修改：保存绑定后的函数引用，以便 removeEventListener 👇👇👇
        this._onPointer = this.onPointer.bind(this);

        this.container.addEventListener('pointerdown', this._onPointer, true);
        document.addEventListener('pointermove', this._onPointer, true);
        document.addEventListener('pointerup', this._onPointer, true);
        document.addEventListener('pointerout', this._onPointer, true); // 恢复 pointerout 防止鼠标移出窗口卡住
        this.container.addEventListener('dblclick', this._onPointer, false);
    }

    // 👇👇👇 新增：清理资源的方法 👇👇👇
    dispose() {
        // 1. 移除事件监听
        this.container.removeEventListener('pointerdown', this._onPointer, true);
        document.removeEventListener('pointermove', this._onPointer, true);
        document.removeEventListener('pointerup', this._onPointer, true);
        document.removeEventListener('pointerout', this._onPointer, true);
        this.container.removeEventListener('dblclick', this._onPointer, false);

        // 2. 从场景中移除箭头
        if (this.arrow) {
            this.scene.remove(this.arrow);
            // 释放几何体和材质内存
            if (this.arrow.line.geometry) this.arrow.line.geometry.dispose();
            if (this.arrow.cone.geometry) this.arrow.cone.geometry.dispose();
            if (this.arrow.line.material) this.arrow.line.material.dispose();
            if (this.arrow.cone.material) this.arrow.cone.material.dispose();
        }
    }

    updateRaycaster(x, y) {
        var rect = this.renderer.domElement.getBoundingClientRect();
        this.mousePos.x = ((x - rect.left) / rect.width) * 2 - 1;
        this.mousePos.y = -((y - rect.top) / rect.height) * 2 + 1;
        this.raycaster.setFromCamera(this.mousePos, this.camera);
    }

    start(x, y) {
        this.physicsObject = null;
        this.updateRaycaster(x, y);
        let intersects = this.raycaster.intersectObjects(this.scene.children);
        for (let i = 0; i < intersects.length; i++) {
            let obj = intersects[i].object;
            if (obj.bodyID !== undefined && obj.bodyID > 0) { // 修改判断条件更严谨
                this.physicsObject = obj;
                this.grabDistance = intersects[0].distance;
                let hit = this.raycaster.ray.origin.clone();
                hit.addScaledVector(this.raycaster.ray.direction, this.grabDistance);
                this.arrow.position.copy(hit);

                this.active = true;
                this.controls.enabled = false;
                this.localHit = obj.worldToLocal(hit.clone());
                this.worldHit.copy(hit);
                this.currentWorld.copy(hit);
                this.arrow.visible = true;
                break;
            }
        }
    }

    move(x, y) {
        if (this.active) {
            this.updateRaycaster(x, y);
            let hit = this.raycaster.ray.origin.clone();
            hit.addScaledVector(this.raycaster.ray.direction, this.grabDistance);
            this.currentWorld.copy(hit);
            this.update();
        }
    }

    update() {
        if (this.active && this.physicsObject) { // 增加 active 检查
            this.worldHit.copy(this.localHit);
            this.physicsObject.localToWorld(this.worldHit);
            this.arrow.position.copy(this.worldHit);
            this.arrow.setDirection(this.currentWorld.clone().sub(this.worldHit).normalize());
            this.arrow.setLength(this.currentWorld.clone().sub(this.worldHit).length());
        }
    }

    end(evt) {
        this.physicsObject = null;
        this.active = false;
        if (this.controls) this.controls.enabled = true;
        if (this.arrow) this.arrow.visible = false;
        this.mouseDown = false;
    }

    onPointer(evt) {
        if (evt.type == "pointerdown") {
            this.start(evt.clientX, evt.clientY);
            this.mouseDown = true;
        } else if (evt.type == "pointermove" && this.mouseDown) {
            if (this.active) { this.move(evt.clientX, evt.clientY); }
        } else if (evt.type == "pointerup" || evt.type == "pointerout") {
            this.end(evt);
        }
        if (evt.type == "dblclick") {
            // ... (保持原样)
            this.start(evt.clientX, evt.clientY);
            this.doubleClick = true;
            if (this.physicsObject) {
                if (this.physicsObject == this.previouslySelected) {
                    this.physicsObject.material.emissive.setHex(0x000000);
                    this.previouslySelected = null;
                } else {
                    if (this.previouslySelected) {
                        this.previouslySelected.material.emissive.setHex(0x000000);
                    }
                    this.physicsObject.material.emissive.setHex(this.higlightColor);
                    this.previouslySelected = this.physicsObject;
                }
            } else {
                if (this.previouslySelected) {
                    this.previouslySelected.material.emissive.setHex(0x000000);
                    this.previouslySelected = null;
                }
            }
        }
    }
}