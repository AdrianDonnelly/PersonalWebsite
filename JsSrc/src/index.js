import * as THREE from 'three';
import { ViewHelper } from 'three/addons/helpers/ViewHelper.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';

let width = window.innerWidth;
let height =window.innerHeight;

let camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
camera.position.z = 30;

scene.add(camera);

let scene = new THREE.Scene();
scene.background = new THREE.Color( 0, 0, 0 );

const pointLight1 = new THREE.PointLight( 0xffffff, 3, 0, 0 );
pointLight1.position.set( 500, 500, 500 );
scene.add( pointLight1 );

const pointLight2 = new THREE.PointLight( 0xffffff, 1, 0, 0 );
pointLight2.position.set( - 500, - 500, - 500 );
scene.add( pointLight2 );

renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
effect = new AsciiEffect( renderer, ' .:-+*=%@#', { invert: true } );
effect.setSize( window.innerWidth, window.innerHeight );
effect.domElement.style.color = 'white';
effect.domElement.style.backgroundColor = 'black';

document.body.appendChild(effect.domElement);

const controls = new OrbitControls( camera, renderer.domElement );
controls.maxDistance = 50;//~ Max zoom out distance ~//
controls.update();
resize();
animate();

window.addEventListener( 'resize', onWindowResize );
function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
  effect.setSize( window.innerWidth, window.innerHeight );

}



function animate() {
  controls.update();
  effect.render(scene, camera);


}