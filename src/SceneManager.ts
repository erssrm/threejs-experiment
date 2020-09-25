/** Class based type script Threejs example */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Sphere } from "./sceneSubjects/objects/Sphere";
import { GeneralLights } from "./sceneSubjects/lights/GeneralLights";
import { AxesHelper } from "./sceneSubjects/helper/AxesHelper";
import { Box } from './sceneSubjects/objects/Box';

export function SceneManager(canvas) {
  const clock = new THREE.Clock();

  const screenDimensions = {
    width: canvas.width,
    height: canvas.height,
  };

  const scene = buildScene();
  const renderer = buildRender(screenDimensions);
  const camera = buildCamera(screenDimensions);
  const sceneSubjects = createSceneSubjects(scene);
  const control = addOrbitControl(camera, renderer);

  function addOrbitControl(camera, renderer) {
    const orbitControl = new OrbitControls(camera, renderer.domElement);
    return orbitControl;
  }

  function buildScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#000");

    return scene;
  }

  function buildRender({ width, height }) {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);

    return renderer;
  }

  function buildCamera({ width, height }) {
    const aspectRatio = width / height;
    const fieldOfView = 60;
    const nearPlane = 1;
    const farPlane = 100;
    const camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );

    camera.position.set(0, 0, 30);

    return camera;
  }

  function createSceneSubjects(scene) {
    const sceneSubjects = [
      new GeneralLights(scene),
      new Sphere(scene),
      new AxesHelper(scene),
      new Box(scene),
    ];

    return sceneSubjects;
  }

  this.update = function () {
    const elapsedTime = clock.getElapsedTime();
    for (let i = 0; i < sceneSubjects.length; i++) {
      if (sceneSubjects[i].update) {
        sceneSubjects[i].update(elapsedTime);
      }
    }
    control.update();
    renderer.render(scene, camera);
  };

  this.onWindowResize = function () {
    const { width, height } = canvas;

    screenDimensions.width = width;
    screenDimensions.height = height;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  };
}
