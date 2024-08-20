import * as THREE from 'three';
// import { ViewHelper } from 'three/addons/helpers/ViewHelper.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

THREE.Cache.enabled = true;

let container;
let camera, cameraTarget, scene, renderer;
let group, textMesh1, textMesh2, textGeo, materials;
let firstLetter = true;
let text = 'Adrian',

  bevelEnabled = true,

  font = undefined;

let width = window.innerWidth;
let height =window.innerHeight;

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
// effect = new AsciiEffect( renderer, ' .:-+*=%@#', { invert: true } );
// effect.setSize( window.innerWidth, window.innerHeight );
// effect.domElement.style.color = 'white';
// effect.domElement.style.backgroundColor = 'black';

document.body.appendChild(renderer.domElement);

camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
camera.position.z = 200;

scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );


//~ Create an AmbientLight to simulate global illumination ~//
// let helper = new ViewHelper( camera, renderer.domElement );
const skycolor = 0xFFFFFF;
const skyintensity = 0.3;
const skylight = new THREE.AmbientLight(skycolor, skyintensity);
scene.add(skylight);


//~ Create a DirectionalLight ~//
const color = 0xFFFFFF;
const intensity = 2;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(10, 10, 10);

light.target.position.set(-5, 0, 0);

scene.add(light);
scene.add(light.target);

const controls = new OrbitControls( camera, renderer.domElement );
// controls.maxDistance = 50;//~ Max zoom out distance ~//
controls.update();

materials = [
  new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true}), // front
  new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
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

  renderer.setSize( window.innerWidth, window.innerHeight );

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

  textGeo.computeBoundingBox();
  console.log(`TextGeometry Depth: ${textGeo.parameters.options.depth}`);

  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);

  textMesh1 = new THREE.Mesh( textGeo, materials );

  textMesh1.position.x = 0;
  textMesh1.position.y = 0;
  textMesh1.position.z = 0;

  textMesh1.rotation.x = 0;
  textMesh1.rotation.y = Math.PI * 2;

  group.add( textMesh1 );

}


function refreshText() {
//   group.remove( textMesh1 );
//   if ( ! text ) return;
  createText();
}
  function animate() {
    
    renderer.render(scene, camera);
    // helper.render( renderer );
    controls.update();
    requestAnimationFrame(animate);//~ Request animation frame for smooth animation ~//
  }