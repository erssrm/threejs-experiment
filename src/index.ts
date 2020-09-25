// add styles
import "./style.css";
// three.js
import { SceneManager } from "./SceneManager";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const sceneManager = new SceneManager(canvas);

function bindEventListeners() {
  window.onresize = resizeCanvas;
  resizeCanvas();
}

function resizeCanvas() {
  canvas.style.width = "100%";
  canvas.style.height = "99%";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight-10;

  sceneManager.onWindowResize();
}

function render() {
  requestAnimationFrame(render);
  sceneManager.update();
}

bindEventListeners();
render();
