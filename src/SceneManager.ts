/** Class based type script Threejs example */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SceneSubject } from "./sceneSubjects/SceneSubject";
import { GeneralLights } from "./sceneSubjects/GeneralLights";

export class SceneManager {
  public canvas!: any;
  constructor(canvas) {
    this.canvas = canvas
  }
  screenDimensions = {
    width: 500,
    height: 500,
  };
  scene = this.buildScene();
  renderer = this.buildRender(this.screenDimensions);
  camera = this.buildCamera(this.screenDimensions);
  sceneSubjects = this.createSceneSubjects(this.scene);

  setCanvasDimension() {
    this.screenDimensions = {
        width: this.canvas.width,
        height: this.canvas.height,
      };
  }

  public buildCamera({ width, height }) {
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

    return camera;
  }

  public buildRender({ width, height }) {
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);

    // renderer.gammaInput = true;
    // renderer.gammaOutput = true;

    return renderer;
  }

  public buildScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#000");

    return scene;
  }

  public createSceneSubjects(scene) {
    const sceneSubjects = [new GeneralLights(scene), new SceneSubject(scene)];

    return sceneSubjects;
  }

  public update() {
    const clock = new THREE.Clock();
    const elapsedTime = clock.getElapsedTime();

    for (let i = 0; i < this.sceneSubjects.length; i++)
      this.sceneSubjects[i].addToScene();

    this.renderer.render(this.scene, this.camera);
  }

  public onWindowResize = function () {
    const { width, height } = this.canvas;

    this.screenDimensions.width = width;
    this.screenDimensions.height = height;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    console.log("this.scene", this.scene);
  };
}
