import * as THREE from 'three';
import { ViewHelper } from 'three/addons/helpers/ViewHelper.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { GUI } from 'lil-gui'
THREE.Cache.enabled = true;

let camera, scene, renderer,  effect;
let group, textMesh1, textGeo, materials;
let text = 'Adrian',
  font = undefined;

let width = window.innerWidth ;
let height = window.innerHeight;

renderer = new THREE.WebGLRenderer();
effect = new AsciiEffect( renderer, ' .:-+*=%@#', { invert: true } );
effect.setSize( width,height);
effect.domElement.style.color = 'white';
effect.domElement.style.backgroundColor = 'black';

document.body.appendChild(effect.domElement);

camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
camera.position.z = 500;

scene = new THREE.Scene();


let helper = new ViewHelper( camera, renderer.domElement );

const pointLight1 = new THREE.PointLight( 0xffffff, 3, 0, 0 );
pointLight1.position.set( 500, 500, 500 );
scene.add( pointLight1 );

const pointLight2 = new THREE.PointLight( 0xffffff, 1, 0, 0 );
pointLight2.position.set( - 500, - 500, - 500 );
scene.add( pointLight2 );

const controls = new TrackballControls( camera, effect.domElement );
controls.maxDistance = 450;
controls.minDistance = 100;
controls.panSpeed = 1;

controls.update();

materials = [
  new THREE.MeshPhongMaterial({ color: 0xffffff},{ flatShading: true }), // front
  new THREE.MeshPhongMaterial({ color: 0xffffff },{ flatShading: true }) // side
];

group = new THREE.Group();
group.position.y = 0;

scene.add( group,camera );


loadFont();
onWindowResize();
animate();

window.addEventListener( 'resize', onWindowResize );
function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  effect.setSize( window.innerWidth, window.innerHeight );

}

function loadFont() {


  const loader = new FontLoader();
  loader.load( './JsSrc/fonts/Montserrat.json', function ( response ) {

    font = response;

    refreshText();

  } );

}

//~ Create Text function ~\\
function createText() {

  textGeo = new TextGeometry( text, {

    font: font,
    depth: 20,
    size: 100,
		curveSegments: 6,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 5,
		bevelOffset: 0,
		bevelSegments: 5
  } );
  textMesh1 = new THREE.Mesh( textGeo, materials );
  textMesh1.rotation.x = 0;
  textMesh1.rotation.y = 0;
  textMesh1.rotation.z = 0;
  textMesh1.position.x = -200;

  group.add( textMesh1 );

}
function refreshText() {
  createText();
}

function animate() {
  effect.render(scene, camera);
  helper.render( renderer );
  controls.update();
  requestAnimationFrame(animate);
}