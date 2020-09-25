import * as THREE from "three";

export function Box(scene) {
    var geometry = new THREE.BoxGeometry( 2, 2, 2 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var mesh = new THREE.Mesh( geometry, material );

    mesh.position.set(-10, 0, 0);

  scene.add(mesh);

  this.update = function (time) {
    const scale = Math.sin(time) + 2;
    mesh.scale.set(scale, scale, scale);
  };
}
