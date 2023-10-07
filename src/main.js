import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import  {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';
import * as dat from "dat.gui";

export default class MyThree {
  constructor(dom) {
    // this.gui = new dat.GUI();
    this.scene = new THREE.Scene();
    this.container = dom;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
    this.renderer.setSize(this.width, this.height);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputColorSpace= THREE.SRGBColorSpace;
    this.container.appendChild(this.renderer.domElement);
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.001,
      1500
    );
    this.camera.position.z = 3.3;
    this.camera.position.x = 2;
    this.camera.position.y = 4.6;
    this.camera.lookAt(new THREE.Vector3(0,0,0))
    // var position = this.gui.addFolder('position');
    // var rotation= this.gui.addFolder('Rotation');
    // position.add(this.camera.position,'x',-10,10);
    // position.add(this.camera.position,'y',-10,10);
    // position.add(this.camera.position,'z',-10,10);
    // rotation.add(this.camera.rotation,'x',-10,10,0.01);
    // rotation.add(this.camera.rotation,'y',-10,10,0.01);
    // rotation.add(this.camera.rotation,'z',-10,10,0.01);

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.listenToKeyEvents(window);
    // optional

    // this.controls.addEventListener( 'change', ()=>this.render ); // call this only in static scenes (i.e., if there is no animation loop)

    // this.controls.minDistance = 0;
    // this.controls.maxDistance = 2000;

    // this.controls.maxPolarAngle = Math.PI / 2;
    this.addObjects();
    this.render();
  }
  render() {
    if (this.camera) this.renderer.render(this.scene, this.camera);
    // if (this.controls) this.controls.update();
    window.requestAnimationFrame(this.render.bind(this));
  }
  addObjects() {
    const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)
const bakedTexture = textureLoader.load('texture.jpg')
bakedTexture.flipY = false
bakedTexture.colorSpace = THREE.SRGBColorSpace
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })
gltfLoader.load(
    'robot.glb',
    (gltf) =>
    {
        gltf.scene.traverse((child) =>
        {
            child.material = bakedMaterial
        })
        this.scene.add(gltf.scene)
    }
)
  }
}
window.addEventListener("DOMContentLoaded", function () {
  const myThree = new MyThree(document.querySelector("#container"));
});