import * as THREE from 'three';
import {OrbitControls} from 'OrbitControls';
import { CalaveraAzucar } from 'CalaveraAzucar';
import { Candelabro } from 'Candelabro';
import { Esqueleto } from 'Esqueleto';
import { PlatoSal } from 'PlatoSal';
import { VelasEnVaso } from 'VelasEnVaso';
import { platanos } from './Tino/platanos.js';
import { Tamales } from 'Tamales';
import { PapelPicado } from './Axel/PapelPidaco.js';
import { CruzFlores } from './Axel/FloresTerciopelo.js';
import { CaminoCempasuchil } from './Axel/CaminoCempasuchil.js';
import { CadenaFlores } from './Axel/CadenaFlores.js';
import { ArcoPeque } from './Axel/ArcoPequeño.js';
import { ArcoFlores } from 'ArcoFlores';
import { Dulces } from './Brandon/dulces.js';
import { foto } from './Brandon/foto.js';
import { Plataforma } from './Brandon/plataforma.js';
import { agua } from './Tino/agua.js'
import { botella } from './Tino/botella.js'
import { incienso } from './Tino/incienso.js'
import { mole } from './Tino/mole.js'
import { panM } from './Tino/panM.js'

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x30251f);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 5, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.9;
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls=new OrbitControls(camera,renderer.domElement);
controls.addEventListener('change', render);

function render() {
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
});

function agregarCopias(crearObjeto, configuraciones) {
    const plantilla = crearObjeto();
    const objetos = configuraciones.map(({ posicion, escala }, indice) => {
        const objeto = indice === 0 ? plantilla : plantilla.clone(true);
        objeto.position.set(...posicion);
        objeto.scale.set(...escala);
        scene.add(objeto);
        return objeto;
    });

    if (objetos.length < 2) {
        return;
    }

    scene.updateMatrixWorld(true);

    const grupos = new Map();
    let sePuedeAgrupar = true;

    objetos.forEach((objeto) => {
        objeto.traverse((parte) => {
            if (parte.visible === false || parte.isLight || parte.isLine || parte.isPoints || parte.isSprite) {
                sePuedeAgrupar = false;
            }

            if (!parte.isMesh) {
                return;
            }

            const materiales = Array.isArray(parte.material) ? parte.material : [parte.material];
            if (
                parte.isSkinnedMesh ||
                parte.morphTargetInfluences ||
                Array.isArray(parte.material) ||
                materiales.some((material) => material.transparent || material.opacity < 1)
            ) {
                sePuedeAgrupar = false;
                return;
            }

            const clave = [
                parte.geometry.uuid,
                parte.material.uuid,
                parte.castShadow,
                parte.receiveShadow,
                parte.renderOrder,
                parte.layers.mask,
                parte.isInstancedMesh && parte.instanceColor ? 'colored' : 'plain'
            ].join(':');

            let grupo = grupos.get(clave);
            if (!grupo) {
                grupo = {
                    geometria: parte.geometry,
                    material: parte.material,
                    castShadow: parte.castShadow,
                    receiveShadow: parte.receiveShadow,
                    renderOrder: parte.renderOrder,
                    layers: parte.layers,
                    matrices: [],
                    colores: parte.isInstancedMesh && parte.instanceColor ? [] : null
                };
                grupos.set(clave, grupo);
            }

            if (parte.isInstancedMesh) {
                const matrizInstancia = new THREE.Matrix4();
                const matrizMundo = new THREE.Matrix4();
                const colorInstancia = grupo.colores ? new THREE.Color() : null;

                for (let i = 0; i < parte.count; i++) {
                    parte.getMatrixAt(i, matrizInstancia);
                    matrizMundo.multiplyMatrices(parte.matrixWorld, matrizInstancia);
                    grupo.matrices.push(matrizMundo.clone());

                    if (colorInstancia) {
                        parte.getColorAt(i, colorInstancia);
                        grupo.colores.push(colorInstancia.clone());
                    }
                }
            } else {
                grupo.matrices.push(parte.matrixWorld.clone());
            }
        });
    });

    if (!sePuedeAgrupar || grupos.size === 0) {
        return;
    }

    grupos.forEach((grupo) => {
        const instancias = new THREE.InstancedMesh(
            grupo.geometria,
            grupo.material,
            grupo.matrices.length
        );

        grupo.matrices.forEach((matriz, indice) => {
            instancias.setMatrixAt(indice, matriz);
            if (grupo.colores) {
                instancias.setColorAt(indice, grupo.colores[indice]);
            }
        });

        instancias.instanceMatrix.needsUpdate = true;
        if (instancias.instanceColor) {
            instancias.instanceColor.needsUpdate = true;
        }
        instancias.castShadow = grupo.castShadow;
        instancias.receiveShadow = grupo.receiveShadow;
        instancias.renderOrder = grupo.renderOrder;
        instancias.layers.mask = grupo.layers.mask;
        scene.add(instancias);
    });

    objetos.forEach((objeto) => scene.remove(objeto));
}

// PISO DE MADERA OSCURA
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0x493021,
    roughness: 0.9,
    metalness: 0
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = 0;
plane.receiveShadow = true;
scene.add(plane);

// TABLAS DE MADERA
const tablaGeometry = new THREE.BoxGeometry(20, 0.025, 0.62);
const tablaMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.9
});
const tablas = new THREE.InstancedMesh(tablaGeometry, tablaMaterial, 28);
const transformacionTabla = new THREE.Object3D();
let indiceTabla = 0;

for (let i = -9; i <= 9; i += 0.65) {
    transformacionTabla.position.set(0, 0.012, i);
    transformacionTabla.updateMatrix();
    tablas.setMatrixAt(indiceTabla, transformacionTabla.matrix);
    tablas.setColorAt(
        indiceTabla,
        new THREE.Color(i % 2 === 0 ? 0x5A3928 : 0x68452F)
    );
    indiceTabla += 1;
}
tablas.instanceMatrix.needsUpdate = true;
if (tablas.instanceColor) {
    tablas.instanceColor.needsUpdate = true;
}
tablas.receiveShadow = true;
scene.add(tablas);
// PARED DEL FONDO DE LA CASA
const paredGeometry = new THREE.PlaneGeometry(20, 10);

const paredMaterial = new THREE.MeshStandardMaterial({
    color: 0x987454,
    roughness: 1,
    metalness: 0,
    side: THREE.DoubleSide
});

const pared = new THREE.Mesh(paredGeometry, paredMaterial);
pared.position.set(0, 5, -9);
pared.receiveShadow = true;
scene.add(pared);

//CALABERA DE AZUCAR
agregarCopias(
    () => new CalaveraAzucar().CalaveraAzucar,
    [
        { posicion: [-3.7, 1.92, -1.95], escala: [0.1, 0.1, 0.1] },
        { posicion: [3.7, 1.92, -1.95], escala: [0.1, 0.1, 0.1] },
        { posicion: [4.1, 1, -1.25], escala: [0.1, 0.1, 0.1] },
        { posicion: [-2.5, 3.8, -3.3], escala: [0.1, 0.1, 0.1] },
        { posicion: [-4.1, 1, -1.25], escala: [0.1, 0.1, 0.1] },
        { posicion: [2.5, 3.8, -3.3], escala: [0.1, 0.1, 0.1] }
    ]
);

//CANDELABRO
agregarCopias(
    () => new Candelabro().Candelabro,
    [
        { posicion: [6.5, 0, -2], escala: [0.5, 0.5, 0.5] },
        { posicion: [-6.5, 0, -2], escala: [0.5, 0.5, 0.5] }
    ]
);

//ESQUELETOS
agregarCopias(
    () => new Esqueleto().Esqueleto,
    [
        { posicion: [8.5, -0.3, -5.05], escala: [0.5, 0.5, 0.5] },
        { posicion: [-8.5, -0.3, -5.05], escala: [0.5, 0.5, 0.5] }
    ]
);

//PLATOS DE SAL
agregarCopias(
    () => new PlatoSal().PlatoSal,
    [
        { posicion: [0, 2.88, -2.7], escala: [0.2, 0.2, 0.2] },
        { posicion: [0, 0.98, -1.25], escala: [0.2, 0.2, 0.2] },
        { posicion: [5, 2.88, -4.5], escala: [0.2, 0.2, 0.2] },
        { posicion: [-5, 2.88, -4.5], escala: [0.2, 0.2, 0.2] }
    ]
);

//VELAS EN VASO
agregarCopias(
    () => new VelasEnVaso().VelasEnVaso,
    [
        { posicion: [-1.5, 3.8, -3.3], escala: [0.5, 0.5, 0.5] },
        { posicion: [1.5, 3.8, -3.3], escala: [0.5, 0.5, 0.5] },
        { posicion: [3.6, 2.88, -4.5], escala: [0.4, 0.4, 0.4] },
        { posicion: [-3.6, 2.88, -4.5], escala: [0.4, 0.4, 0.4] }
    ]
);

//FRUTAS
agregarCopias(
    () => new platanos().getObject(),
    [
        { posicion: [-5.4, 2.2, -4], escala: [0.3, 0.3, 0.3] },
        { posicion: [5.4, 2.2, -4], escala: [0.3, 0.3, 0.3] },
        { posicion: [-4.75, 3.6, -4.88], escala: [0.3, 0.3, 0.3] },
        { posicion: [4.75, 3.6, -4.88], escala: [0.3, 0.3, 0.3] }
    ]
);

//TAMALES
agregarCopias(
    () => new Tamales().getObject(),
    [
        { posicion: [-2.8, 0.98, -1.25], escala: [0.5, 0.5, 0.5] },
        { posicion: [2.8, 0.98, -1.25], escala: [0.5, 0.5, 0.5] },
        { posicion: [3.2, 2.88, -2.7], escala: [0.4, 0.4, 0.4] },
        { posicion: [-3.2, 2.88, -2.7], escala: [0.4, 0.4, 0.4] },
        { posicion: [6, 1.44, -3.5], escala: [0.4, 0.4, 0.4] },
        { posicion: [-6, 1.44, -3.5], escala: [0.4, 0.4, 0.4] }
    ]
);

//PAPEL PICADO
agregarCopias(
    () => new PapelPicado().getObject(),
    [
        { posicion: [-3.2, -1.3, -1.92], escala: [0.75, 0.75, 0.75] },
        { posicion: [0, -1.3, -1.92], escala: [0.75, 0.75, 0.75] },
        { posicion: [3.2, -1.3, -1.92], escala: [0.75, 0.75, 0.75] },
        { posicion: [2.7, 0.3, -2.68], escala: [0.6, 0.6, 0.6] },
        { posicion: [0, 0.1, -2.68], escala: [0.65, 0.65, 0.65] },
        { posicion: [-2.7, 0.3, -2.68], escala: [0.6, 0.6, 0.6] },
        { posicion: [2.3, 1.6, -3.25], escala: [0.5, 0.5, 0.5] },
        { posicion: [0, 1.4, -3.25], escala: [0.55, 0.55, 0.55] },
        { posicion: [-2.3, 1.6, -3.25], escala: [0.5, 0.5, 0.5] },
        { posicion: [1.9, 3, -3.87], escala: [0.4, 0.4, 0.4] },
        { posicion: [0, 2.79, -3.87], escala: [0.45, 0.45, 0.45] },
        { posicion: [-1.9, 3, -3.87], escala: [0.4, 0.4, 0.4] },
        { posicion: [1.5, 4.31, -4.47], escala: [0.33, 0.33, 0.33] },
        { posicion: [0, 4.22, -4.47], escala: [0.35, 0.35, 0.35] },
        { posicion: [-1.5, 4.31, -4.47], escala: [0.33, 0.33, 0.33] },
        { posicion: [1.15, 5.6, -5.08], escala: [0.25, 0.25, 0.25] },
        { posicion: [0, 5.39, -5.09], escala: [0.3, 0.3, 0.3] },
        { posicion: [-1.15, 5.6, -5.08], escala: [0.25, 0.25, 0.25] }
    ]
);

//CRUZ DE FLORES
agregarCopias(
    () => new CruzFlores().getObject(),
    [
        { posicion: [-5, 0, 1], escala: [0.7, 0.7, 0.7] },
        { posicion: [5, 0, 1], escala: [0.7, 0.7, 0.7] }
    ]
);

//CAMINOS DE CEMPASUCHIL
agregarCopias(
    () => new CaminoCempasuchil().getObject(),
    [
        { posicion: [0, 0.1, 3], escala: [0.8, 0.8, 0.8] },
        { posicion: [0, 0.1, -3], escala: [0.8, 0.8, 0.8] }
    ]
);

//CADENAS FLORALES
agregarCopias(
    () => new CadenaFlores().getObject(),
    [
        { posicion: [-2.4, 0, -7.5], escala: [2, 1.8, 2] },
        { posicion: [-1.1, 0, -7.5], escala: [2, 1.8, 2] },
        { posicion: [1.1, 0, -7.5], escala: [2, 1.8, 2] },
        { posicion: [2.4, 0, -7.5], escala: [2, 1.8, 2] },
        { posicion: [7, 0, -7.5], escala: [2, 1.1, 2] },
        { posicion: [6, 0, -7.5], escala: [2, 1.2, 2] },
        { posicion: [5, 0, -7.5], escala: [2, 1.1, 2] },
        { posicion: [-7, 0, -7.5], escala: [2, 1.1, 2] },
        { posicion: [-6, 0, -7.5], escala: [2, 1.2, 2] },
        { posicion: [-5, 0, -7.5], escala: [2, 1.1, 2] }
    ]
);

//ARCO DE FLORES PEQUEÑOS
agregarCopias(
    () => new ArcoPeque().getObject(),
    [
        { posicion: [0, 3.8, -3.75], escala: [0.8, 1, 0.8] },
        { posicion: [-2.35, 1.88, -2.45], escala: [0.8, 1, 0.8] },
        { posicion: [2.35, 1.88, -2.45], escala: [0.8, 1, 0.8] },
        { posicion: [3.5, 5, -7], escala: [0.8, 1, 0.8] },
        { posicion: [-3.5, 5, -7], escala: [0.8, 1, 0.8] },
        { posicion: [0, 6.72, -5.9], escala: [0.8, 1, 0.8] }
    ]
);

//ARCOS DE FLORES GRANDES
agregarCopias(
    () => new ArcoFlores().getObject(),
    [
        { posicion: [-5.5, 0, -7.5], escala: [0.5, 0.5, 0.5] },
        { posicion: [0, 0, -7.5], escala: [0.8, 0.8, 0.8] },
        { posicion: [5.5, 0, -7.5], escala: [0.5, 0.5, 0.5] }
    ]
);

//TAZA DE DULCES
agregarCopias(
    () => new Dulces().getObject(),
    [
        { posicion: [-1.2, 2.88, -2.75], escala: [0.15, 0.15, 0.15] },
        { posicion: [1.2, 2.88, -2.75], escala: [0.15, 0.15, 0.15] },
        { posicion: [5.3, 0.97, -2.5], escala: [0.15, 0.15, 0.15] },
        { posicion: [-5.3, 0.97, -2.5], escala: [0.15, 0.15, 0.15] }
    ]
);

//MARCOS DE FOTOS
agregarCopias(
    () => new foto().getObject(),
    [
        { posicion: [0, 6.72, -5.5], escala: [0.15, 0.15, 0.15] },
        { posicion: [0, 3.8, -3.2], escala: [0.15, 0.15, 0.15] },
        { posicion: [-2.35, 1.88, -1.9], escala: [0.15, 0.15, 0.15] },
        { posicion: [2.35, 1.88, -1.9], escala: [0.15, 0.15, 0.15] },
        { posicion: [-3.5, 5, -6.4], escala: [0.15, 0.15, 0.15] },
        { posicion: [3.5, 5, -6.4], escala: [0.15, 0.15, 0.15] }
    ]
);

//PLATAFORMAS
agregarCopias(
    () => new Plataforma().getObject(),
    [
        { posicion: [0, 0, -4], escala: [1.6, 1.6, 1.6] },
        { posicion: [-3.5, 0, -5], escala: [1.2, 1.2, 1.2] },
        { posicion: [3.5, 0, -5], escala: [1.2, 1.2, 1.2] }
    ]
);

//TAZON DE AGUA
agregarCopias(
    () => new agua().getObject(),
    [
        { posicion: [-7.5, 0.78, -5], escala: [0.5, 0.5, 0.5] },
        { posicion: [7.5, 0.78, -5], escala: [0.5, 0.5, 0.5] }
    ]
);

//BOTELLAS
agregarCopias(
    () => new botella().getObject(),
    [
        { posicion: [-1, 1.88, -1.95], escala: [0.2, 0.2, 0.2] },
        { posicion: [1, 1.88, -1.95], escala: [0.2, 0.2, 0.2] },
        { posicion: [-4.3, 2.88, -4.5], escala: [0.2, 0.2, 0.2] },
        { posicion: [4.3, 2.88, -4.5], escala: [0.2, 0.2, 0.2] }
    ]
);

//INCIENSOS
agregarCopias(
    () => new incienso().getObject(),
    [
        { posicion: [2.5, 4.8, -4.3], escala: [0.2, 0.2, 0.2] },
        { posicion: [-2.5, 4.8, -4.3], escala: [0.2, 0.2, 0.2] },
        { posicion: [-1.1, 6.8, -5.7], escala: [0.2, 0.2, 0.2] },
        { posicion: [1.1, 6.8, -5.7], escala: [0.2, 0.2, 0.2] }
    ]
);

//MOLE DE OLLA
agregarCopias(
    () => new mole().getObject(),
    [
        { posicion: [5, 0.98, -1.25], escala: [0.2, 0.2, 0.2] },
        { posicion: [-5, 0.98, -1.25], escala: [0.2, 0.2, 0.2] },
        { posicion: [-4.5, 1.88, -2.8], escala: [0.2, 0.2, 0.2] },
        { posicion: [4.5, 1.88, -2.8], escala: [0.2, 0.2, 0.2] }
    ]
);

//PAN DE MUERTO
agregarCopias(
    () => new panM().getObject(),
    [
        { posicion: [2, 4.7, -4], escala: [0.3, 0.3, 0.3] },
        { posicion: [-1.4, 5.75, -4.8], escala: [0.3, 0.3, 0.3] },
        { posicion: [1.4, 5.75, -4.8], escala: [0.3, 0.3, 0.3] },
        { posicion: [0, 5.75, -4.8], escala: [0.3, 0.3, 0.3] },
        { posicion: [1, 4.7, -4], escala: [0.3, 0.3, 0.3] },
        { posicion: [-1, 4.7, -4], escala: [0.3, 0.3, 0.3] },
        { posicion: [-2, 4.7, -4], escala: [0.3, 0.3, 0.3] },
        { posicion: [-1.35, 0.95, -1.28], escala: [0.3, 0.3, 0.3] },
        { posicion: [1.35, 0.95, -1.28], escala: [0.3, 0.3, 0.3] },
        { posicion: [0, 1.88, -1.95], escala: [0.3, 0.3, 0.3] }
    ]
);

function agregarLuzCalida(x, y, z, intensidad, alcance) {
    const luz = new THREE.PointLight(0xffbd78, intensidad, alcance, 1.5);
    luz.position.set(x, y, z);
    scene.add(luz);
}

// Copal encendido
agregarLuzCalida(-2.5, 5.18, -4.3, 0.9, 6);
agregarLuzCalida(2.5, 5.18, -4.3, 0.9, 6);
agregarLuzCalida(-1.1, 7.18, -5.7, 0.9, 6);
agregarLuzCalida(1.1, 7.18, -5.7, 0.9, 6);

// Llamas de los candelabros
agregarLuzCalida(-6.5, 1.59, -2, 1.1, 6);
agregarLuzCalida(6.5, 1.59, -2, 1.1, 6);

// Veladoras en vaso
agregarLuzCalida(-1.5, 4.86, -3.3, 0.85, 6);
agregarLuzCalida(1.5, 4.86, -3.3, 0.85, 6);
agregarLuzCalida(-3.6, 3.73, -4.5, 0.85, 6);
agregarLuzCalida(3.6, 3.73, -4.5, 0.85, 6);

// Relleno tenue en el centro y el camino de cempasuchil
agregarLuzCalida(0, 3, 0, 0.8, 40);
agregarLuzCalida(0, .35, 3.5, 0.4, 9);

render();