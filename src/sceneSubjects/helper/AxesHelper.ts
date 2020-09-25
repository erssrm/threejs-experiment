import * as THREE from "three";

export function AxesHelper(scene) {
  const helper = new THREE.AxesHelper(100);
  scene.add(helper);
}
