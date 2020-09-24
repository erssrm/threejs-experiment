import * as THREE from "three";
export class GeneralLights {
  public scene;
  constructor(scene) {
    this.scene = scene;
  }

  pointLight = new THREE.PointLight("#2222ff", 1);
  public addToScene() {
    this.scene.add(this.pointLight);
  }

  public update(intensity, color) {
    this.pointLight.intensity = intensity;
  }
}
