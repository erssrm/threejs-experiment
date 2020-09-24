import * as THREE from "three";
export class SceneSubject {
  public scene: THREE.Scene;
  constructor(scene) {
    this.scene = scene;
  }
  material = new THREE.MeshBasicMaterial({
    color: 0xaaaaaa,
    wireframe: true,
  });
  box = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), this.material);

  public addToScene() {
    this.scene.add(this.box);
  }
  
  /**Update box geometry */
  public update(scale) {
    this.box.scale.set(scale, scale, scale);
  }
}
