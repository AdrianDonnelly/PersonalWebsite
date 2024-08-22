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

let width = window.innerWidth;
let height =window.innerHeight;

renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setAnimationLoop( animate );

effect = new AsciiEffect( renderer, ' .:-+*=%@#', { invert: true } );
effect.setSize( window.innerWidth, window.innerHeight );
effect.domElement.style.color = 'white';
effect.domElement.style.backgroundColor = 'black';

document.body.appendChild(effect.domElement);

camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
camera.position.z = 500;

scene = new THREE.Scene();

// Store the default position and rotation
const defaultPosition = camera.position.clone();
const defaultRotation = camera.rotation.clone();


const resetButton = {
  reset: function(){ 
    camera.position.copy(defaultPosition);
    camera.rotation.copy(defaultRotation); 
    controls.update(); 
  }}

const gui = new GUI()
const cameraRotationFolder = gui.addFolder('cameraRotation')
cameraRotationFolder.add(camera.rotation, 'x', 0, Math.PI * 2)
cameraRotationFolder.add(camera.rotation, 'y', 0, Math.PI * 2)
cameraRotationFolder.add(camera.rotation, 'z', 0, Math.PI * 2)
cameraRotationFolder.add(resetButton,'reset');
cameraRotationFolder.open()

let helper = new ViewHelper( camera, renderer.domElement );

const pointLight1 = new THREE.PointLight( 0xffffff, 3, 0, 0 );
pointLight1.position.set( 500, 500, 500 );
scene.add( pointLight1 );

const pointLight2 = new THREE.PointLight( 0xffffff, 1, 0, 0 );
pointLight2.position.set( - 500, - 500, - 500 );
scene.add( pointLight2 );

const controls = new TrackballControls( camera, effect.domElement );
// controls.maxDistance = 500;//~ Max zoom out distance ~//
// controls.maxZoom = 50;
controls.update();


//let axes = new THREE.AxisHelper(50);
//scene.add( axes );

materials = [
  new THREE.MeshPhongMaterial({ color: 0xffffff},{ flatShading: true }), // front
  new THREE.MeshPhongMaterial({ color: 0xffffff },{ flatShading: true }) // side
];

group = new THREE.Group();
group.position.y = 0;

scene.add( group,camera );


loadFont();

// const controls = new OrbitControls( camera, renderer.domElement );
// controls.maxDistance = 50;//~ Max zoom out distance ~//
// controls.update();

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
  loader.load( '/JsSrc/fonts/Montserrat.json', function ( response ) {

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

  textMesh1.position.x = -200;
  textMesh1.position.y = 0;
  textMesh1.position.z = 0;

  textMesh1.rotation.x = 0;
  console.log(textMesh1.rotation)
  textMesh1.rotation.y = Math.PI * 2;

  group.add( textMesh1 );

  const resetButton = {
    reset: function(){textMesh1.rotation.x = Math.PI * 2,textMesh1.rotation.y = Math.PI * 2, textMesh1.rotation.z = Math.PI * 2;}
  }
  const rotationFolder = gui.addFolder('Rotation')
  rotationFolder.add(textMesh1.rotation, 'x', 0, Math.PI * 2)
  rotationFolder.add(textMesh1.rotation, 'y', 0, Math.PI * 2)
  rotationFolder.add(textMesh1.rotation, 'z', 0, Math.PI * 2)
  rotationFolder.add(resetButton,'reset');
  rotationFolder.open()


}


function refreshText() {
  createText();
}
  function animate() {
    effect.render(scene, camera);
    helper.render( renderer );
    controls.update();
    requestAnimationFrame(animate);//~ Request animation frame for smooth animation ~//
  }