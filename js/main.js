import * as THREE from 'three';     

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 5;


const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);     //creando canvas en html para visualizar el js

const geometry = new THREE.BoxGeometry();

const material = new THREE.MeshBasicMaterial({
    color:0x00ff00
});

const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

renderer.render(scene,camera);

