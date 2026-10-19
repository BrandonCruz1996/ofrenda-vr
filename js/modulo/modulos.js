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
import { naranjas } from './Brandon/naranjas.js';
import { Plataforma } from './Brandon/plataforma.js';
import { agua } from './Tino/agua.js'
import { botella } from './Tino/botella.js'
import { incienso } from './Tino/incienso.js'
import { mole } from './Tino/mole.js'
import { panM } from './Tino/panM.js'

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2F2F4F);

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(0, 5, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls=new OrbitControls(camera,renderer.domElement);

const size=20;
const divisions=20;
const gridHelper=new THREE.GridHelper(size,divisions);
scene.add(gridHelper);

const axesHelper=new THREE.AxesHelper(5);
scene.add(axesHelper);

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
for (let i = -9; i <= 9; i += 0.65) {
    const tablaGeometry = new THREE.BoxGeometry(20, 0.025, 0.62);
    const tablaMaterial = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x5A3928 : 0x68452F,
        roughness: 0.9
    });

    const tabla = new THREE.Mesh(tablaGeometry, tablaMaterial);
    tabla.position.set(0, 0.012, i);
    tabla.receiveShadow = true;
    scene.add(tabla);
}
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

const cal1 = new CalaveraAzucar();
cal1.CalaveraAzucar.position.set(-3.7, 1.92, -1.95);
cal1.CalaveraAzucar.scale.set(0.1, 0.1, 0.1);
scene.add(cal1.CalaveraAzucar);

const cal2 = new CalaveraAzucar();
cal2.CalaveraAzucar.position.set(3.7, 1.92, -1.95);
cal2.CalaveraAzucar.scale.set(0.1, 0.1, 0.1);
scene.add(cal2.CalaveraAzucar);

const cal3 = new CalaveraAzucar();
cal3.CalaveraAzucar.position.set(4.1, 1, -1.25);
cal3.CalaveraAzucar.scale.set(0.1, 0.1, 0.1);
scene.add(cal3.CalaveraAzucar);

const cal4 = new CalaveraAzucar();
cal4.CalaveraAzucar.position.set(-2.5, 3.8, -3.3);
cal4.CalaveraAzucar.scale.set(0.1, 0.1, 0.1);
scene.add(cal4.CalaveraAzucar);

const cal5 = new CalaveraAzucar();
cal5.CalaveraAzucar.position.set(-4.1, 1, -1.25);
cal5.CalaveraAzucar.scale.set(0.1, 0.1, 0.1);
scene.add(cal5.CalaveraAzucar);

const cal6 = new CalaveraAzucar();
cal6.CalaveraAzucar.position.set(2.5, 3.8, -3.3);
cal6.CalaveraAzucar.scale.set(0.1, 0.1, 0.1);
scene.add(cal6.CalaveraAzucar);

//CANDELABRO

const candel1 = new Candelabro();
candel1.Candelabro.position.set(6.5, 0, -2);
candel1.Candelabro.scale.set(0.5, 0.5, 0.5);
scene.add(candel1.Candelabro);

const candel2 = new Candelabro();
candel2.Candelabro.position.set(-6.5, 0, -2);
candel2.Candelabro.scale.set(0.5, 0.5, 0.5);
scene.add(candel2.Candelabro);

//ESQUELETOS

const esq1 = new Esqueleto();
esq1.Esqueleto.position.set(8.5, -.3, -5.05);
esq1.Esqueleto.scale.set(0.5, 0.5, 0.5);
scene.add(esq1.Esqueleto);

const esq2 = new Esqueleto();
esq2.Esqueleto.position.set(-8.5, -.3, -5.05);
esq2.Esqueleto.scale.set(0.5, 0.5, 0.5);
scene.add(esq2.Esqueleto);

//PLATOS DE SAL

const plasal1 = new PlatoSal();
plasal1.PlatoSal.position.set(0, 2.88, -2.7);
plasal1.PlatoSal.scale.set(0.2, 0.2, 0.2);
scene.add(plasal1.PlatoSal);

const plasal2 = new PlatoSal();
plasal2.PlatoSal.position.set(0, 1.88, -1.95); //Y = 2DO PISO
plasal2.PlatoSal.scale.set(0.2, 0.2, 0.2);
scene.add(plasal2.PlatoSal);

const plasal3 = new PlatoSal();
plasal3.PlatoSal.position.set(0, .98, -1.25); // Y = 1ER PISO
plasal3.PlatoSal.scale.set(0.2, 0.2, 0.2);
scene.add(plasal3.PlatoSal);

const plasal4 = new PlatoSal();
plasal4.PlatoSal.position.set(5, 2.88, -4.5);
plasal4.PlatoSal.scale.set(0.2, 0.2, 0.2);
scene.add(plasal4.PlatoSal);

const plasal5 = new PlatoSal();
plasal5.PlatoSal.position.set(-5, 2.88, -4.5);
plasal5.PlatoSal.scale.set(0.2, 0.2, 0.2);
scene.add(plasal5.PlatoSal);

//VELAS EN VASO

const velas1 = new VelasEnVaso();
velas1.VelasEnVaso.position.set(-1.5, 3.8, -3.3);
velas1.VelasEnVaso.scale.set(0.5, 0.5, 0.5);
scene.add(velas1.VelasEnVaso);

const velas2 = new VelasEnVaso();
velas2.VelasEnVaso.position.set(1.5, 3.8, -3.3); //Y = 4TO PISO
velas2.VelasEnVaso.scale.set(0.5, 0.5, 0.5);
scene.add(velas2.VelasEnVaso);

const velas3 = new VelasEnVaso();
velas3.VelasEnVaso.position.set(3.6, 2.88, -4.5); //Y = 3ER PISO
velas3.VelasEnVaso.scale.set(0.4, 0.4, 0.4);
scene.add(velas3.VelasEnVaso);

const velas4 = new VelasEnVaso();
velas4.VelasEnVaso.position.set(-3.6, 2.88, -4.5);
velas4.VelasEnVaso.scale.set(0.4, 0.4, 0.4);
scene.add(velas4.VelasEnVaso);

//FRUTAS

const plat1 = new platanos();
const grupoPlatanos = plat1.getObject();
grupoPlatanos.position.set(-5.4, 2.2, -4);
grupoPlatanos.scale.set(0.3, 0.3, 0.3);
scene.add(grupoPlatanos);

const plat2 = new platanos();
const grupoPlatanos2 = plat2.getObject();
grupoPlatanos2.position.set(5.4, 2.2, -4);
grupoPlatanos2.scale.set(0.3, 0.3, 0.3);
scene.add(grupoPlatanos2);

const plat3 = new platanos();
const grupoPlatanos3 = plat3.getObject();
grupoPlatanos3.position.set(-4.75, 3.6, -4.88);
grupoPlatanos3.scale.set(0.3, 0.3, 0.3);
scene.add(grupoPlatanos3);

const plat4 = new platanos();
const grupoPlatanos4 = plat4.getObject();
grupoPlatanos4.position.set(4.75, 3.6, -4.88);
grupoPlatanos4.scale.set(0.3, 0.3, 0.3);
scene.add(grupoPlatanos4);

//TAMALES

const tam1 = new Tamales();
const grupoTamales = tam1.getObject();
grupoTamales.position.set(-2.8, .98, -1.25);
grupoTamales.scale.set(0.5, 0.5, 0.5);
scene.add(grupoTamales);

const tam2 = new Tamales();
const grupoTamales2 = tam2.getObject();
grupoTamales2.position.set(2.8, .98, -1.25);
grupoTamales2.scale.set(0.5, 0.5, 0.5);
scene.add(grupoTamales2);

const tam3 = new Tamales();
const grupoTamales3 = tam3.getObject();
grupoTamales3.position.set(3.2, 2.88, -2.7);//Y = 3ER PISO
grupoTamales3.scale.set(0.4, 0.4, 0.4);
scene.add(grupoTamales3);

const tam4 = new Tamales();
const grupoTamales4 = tam4.getObject();
grupoTamales4.position.set(-3.2, 2.88, -2.7);
grupoTamales4.scale.set(0.4, 0.4, 0.4);
scene.add(grupoTamales4);

const tam5 = new Tamales();
const grupoTamales5 = tam5.getObject();
grupoTamales5.position.set(6, 1.44, -3.5);
grupoTamales5.scale.set(0.4, 0.4, 0.4);
scene.add(grupoTamales5);

const tam6 = new Tamales();
const grupoTamales6 = tam6.getObject();
grupoTamales6.position.set(-6, 1.44, -3.5);
grupoTamales6.scale.set(0.4, 0.4, 0.4);
scene.add(grupoTamales6);

//PAPEL PICADO

const papel1 = new PapelPicado();
const grupoPapel = papel1.getObject();
grupoPapel.position.set(-3.2, -1.3, -1.92);
grupoPapel.scale.set(.75, .75, .75);
scene.add(grupoPapel);

const papel2 = new PapelPicado();
const grupoPapel2 = papel2.getObject();
grupoPapel2.position.set(0, -1.3, -1.92);
grupoPapel2.scale.set(.75, .75, .75);
scene.add(grupoPapel2);

const papel3 = new PapelPicado();
const grupoPapel3 = papel3.getObject();
grupoPapel3.position.set(3.2, -1.3, -1.92);
grupoPapel3.scale.set(.75, .75, .75);
scene.add(grupoPapel3);

const papel4 = new PapelPicado();
const grupoPapel4 = papel4.getObject();
grupoPapel4.position.set(2.7, 0.3, -2.68);
grupoPapel4.scale.set(.6, .6, .6);
scene.add(grupoPapel4);

const papel5 = new PapelPicado();
const grupoPapel5 = papel5.getObject();
grupoPapel5.position.set(0, 0.1, -2.68);
grupoPapel5.scale.set(.65, .65, .65);
scene.add(grupoPapel5);

const papel6 = new PapelPicado();
const grupoPapel6 = papel6.getObject();
grupoPapel6.position.set(-2.7, 0.3, -2.68);
grupoPapel6.scale.set(.6, .6, .6);
scene.add(grupoPapel6);

const papel7 = new PapelPicado();
const grupoPapel7 = papel7.getObject();
grupoPapel7.position.set(2.3, 1.6, -3.25);
grupoPapel7.scale.set(.5, .5, .5);
scene.add(grupoPapel7);

const papel8 = new PapelPicado();
const grupoPapel8 = papel8.getObject();
grupoPapel8.position.set(0, 1.4, -3.25);
grupoPapel8.scale.set(.55, .55, .55);
scene.add(grupoPapel8);

const papel9 = new PapelPicado();
const grupoPapel9 = papel9.getObject();
grupoPapel9.position.set(-2.3, 1.6, -3.25);
grupoPapel9.scale.set(.5, .5, .5);
scene.add(grupoPapel9);

const papel10 = new PapelPicado();
const grupoPapel10 = papel10.getObject();
grupoPapel10.position.set(1.9, 3, -3.87);
grupoPapel10.scale.set(.4, .4, .4);
scene.add(grupoPapel10);

const papel11 = new PapelPicado();
const grupoPapel11 = papel11.getObject();
grupoPapel11.position.set(0, 2.79, -3.87);
grupoPapel11.scale.set(.45, .45, .45);
scene.add(grupoPapel11);

const papel12 = new PapelPicado();
const grupoPapel12 = papel12.getObject();
grupoPapel12.position.set(-1.9, 3, -3.87);
grupoPapel12.scale.set(.4, .4, .4);
scene.add(grupoPapel12);

const papel13 = new PapelPicado();
const grupoPapel13 = papel13.getObject();
grupoPapel13.position.set(1.5, 4.31, -4.47);
grupoPapel13.scale.set(.33, .33, .33);
scene.add(grupoPapel13);

const papel14 = new PapelPicado();
const grupoPapel14 = papel14.getObject();
grupoPapel14.position.set(0, 4.22, -4.47);
grupoPapel14.scale.set(.35, .35, .35);
scene.add(grupoPapel14);

const papel15 = new PapelPicado();
const grupoPapel15 = papel15.getObject();
grupoPapel15.position.set(-1.5, 4.31, -4.47);
grupoPapel15.scale.set(.33, .33, .33);
scene.add(grupoPapel15);

const papel16 = new PapelPicado();
const grupoPapel16 = papel16.getObject();
grupoPapel16.position.set(1.15, 5.6, -5.08);
grupoPapel16.scale.set(.25, .25, .25);
scene.add(grupoPapel16);

const papel17 = new PapelPicado();
const grupoPapel17 = papel17.getObject();
grupoPapel17.position.set(0, 5.39, -5.09);
grupoPapel17.scale.set(.3, .3, .3);
scene.add(grupoPapel17);

const papel18 = new PapelPicado();
const grupoPapel18 = papel18.getObject();
grupoPapel18.position.set(-1.15, 5.6, -5.08);
grupoPapel18.scale.set(.25, .25, .25);
scene.add(grupoPapel18);

//CRUZ DE FLORES

const cruz1 = new CruzFlores();
const grupoCruz = cruz1.getObject();
grupoCruz.position.set(-5, 0, 1);
grupoCruz.scale.set(0.7, 0.7, 0.7);
scene.add(grupoCruz);

const cruz2 = new CruzFlores();
const grupoCruz2 = cruz2.getObject();
grupoCruz2.position.set(5, 0, 1);
grupoCruz2.scale.set(0.7, 0.7, 0.7);
scene.add(grupoCruz2);

//CAMINOS DE CEMPASUCHIL

const camino1 = new CaminoCempasuchil();
const grupoCamino = camino1.getObject();
grupoCamino.position.set(0, 0.1, 3);
grupoCamino.scale.set(0.8, 0.8, 0.8);
scene.add(grupoCamino);

const camino2 = new CaminoCempasuchil();
const grupoCamino2 = camino2.getObject();
grupoCamino2.position.set(0, 0.1, -3);
grupoCamino2.scale.set(0.8, 0.8, 0.8);
scene.add(grupoCamino2);

//CADENAS FLORALES

const cadena1 = new CadenaFlores();
const grupoCadena = cadena1.getObject();
grupoCadena.position.set(-2.4, 0, -7.5);
grupoCadena.scale.set(2, 1.8, 2);
scene.add(grupoCadena);

const cadena3 = new CadenaFlores();
const grupoCadena3 = cadena3.getObject();
grupoCadena3.position.set(-1.8, 0, -7.5);
grupoCadena3.scale.set(2, 1.8, 2);
scene.add(grupoCadena3);

const cadena5 = new CadenaFlores();
const grupoCadena5 = cadena5.getObject();
grupoCadena5.position.set(-1.1, 0, -7.5);
grupoCadena5.scale.set(2, 1.8, 2);
scene.add(grupoCadena5);

const cadena7 = new CadenaFlores();
const grupoCadena7 = cadena7.getObject();
grupoCadena7.position.set(-0.4, 0, -7.5);
grupoCadena7.scale.set(2, 1.8, 2);
scene.add(grupoCadena7);

const cadena9 = new CadenaFlores();
const grupoCadena9 = cadena9.getObject();
grupoCadena9.position.set(0.4, 0, -7.5);
grupoCadena9.scale.set(2, 1.8, 2);
scene.add(grupoCadena9);

const cadena11 = new CadenaFlores();
const grupoCadena11 = cadena11.getObject();
grupoCadena11.position.set(1.1, 0, -7.5);
grupoCadena11.scale.set(2, 1.8, 2);
scene.add(grupoCadena11);

const cadena13 = new CadenaFlores();
const grupoCadena13 = cadena13.getObject();
grupoCadena13.position.set(1.8, 0, -7.5);
grupoCadena13.scale.set(2, 1.8, 2);
scene.add(grupoCadena13);

const cadena15 = new CadenaFlores();
const grupoCadena15 = cadena15.getObject();
grupoCadena15.position.set(2.4, 0, -7.5);
grupoCadena15.scale.set(2, 1.8, 2);
scene.add(grupoCadena15);

const cadena2 = new CadenaFlores();
const grupoCadena2 = cadena2.getObject();
grupoCadena2.position.set(7, 0, -7.5);
grupoCadena2.scale.set(2, 1.1, 2);
scene.add(grupoCadena2);

const cadena4 = new CadenaFlores();
const grupoCadena4 = cadena4.getObject();
grupoCadena4.position.set(6, 0, -7.5);
grupoCadena4.scale.set(2, 1.2, 2);
scene.add(grupoCadena4);

const cadena6 = new CadenaFlores();
const grupoCadena6 = cadena6.getObject();
grupoCadena6.position.set(5, 0, -7.5);
grupoCadena6.scale.set(2, 1.1, 2);
scene.add(grupoCadena6);

const cadena8 = new CadenaFlores();
const grupoCadena8 = cadena8.getObject();
grupoCadena8.position.set(-7, 0, -7.5);
grupoCadena8.scale.set(2, 1.1, 2);
scene.add(grupoCadena8);

const cadena10 = new CadenaFlores();
const grupoCadena10 = cadena10.getObject();
grupoCadena10.position.set(-6, 0, -7.5);
grupoCadena10.scale.set(2, 1.2, 2);
scene.add(grupoCadena10);

const cadena12 = new CadenaFlores();
const grupoCadena12 = cadena12.getObject();
grupoCadena12.position.set(-5, 0, -7.5);
grupoCadena12.scale.set(2, 1.1, 2);
scene.add(grupoCadena12);

//ARCO DE FLORES PEQUEÑOS

const arco1 = new ArcoPeque();
const grupoArco = arco1.getObject();
grupoArco.position.set(0, 3.8, -3.75);
grupoArco.scale.set(0.8, 1, 0.8);
scene.add(grupoArco);

const arco2 = new ArcoPeque();
const grupoArco2 = arco2.getObject();
grupoArco2.position.set(-2.35, 1.88, -2.45);
grupoArco2.scale.set(0.8, 1, 0.8);
scene.add(grupoArco2);

const arco3 = new ArcoPeque();
const grupoArco3 = arco3.getObject();
grupoArco3.position.set(2.35, 1.88, -2.45);
grupoArco3.scale.set(0.8, 1, 0.8);
scene.add(grupoArco3);

const arco4 = new ArcoPeque();
const grupoArco4 = arco4.getObject();
grupoArco4.position.set(3.5, 5, -7);
grupoArco4.scale.set(0.8, 1, 0.8);
scene.add(grupoArco4);

const arco5 = new ArcoPeque();
const grupoArco5 = arco5.getObject();
grupoArco5.position.set(-3.5, 5, -7);
grupoArco5.scale.set(0.8, 1, 0.8);
scene.add(grupoArco5);

const arco6 = new ArcoPeque();
const grupoArco6 = arco6.getObject();
grupoArco6.position.set(0, 6.72, -5.9);
grupoArco6.scale.set(0.8, 1, 0.8);
scene.add(grupoArco6);

//ARCOS DE FLORES GRANDES

const arcflor1 = new ArcoFlores();
const grupoArcoFlores = arcflor1.getObject();
grupoArcoFlores.position.set(-5.5, 0, -7.5);
grupoArcoFlores.scale.set(0.5, 0.5, 0.5);
scene.add(grupoArcoFlores);

const arcflor2 = new ArcoFlores();
const grupoArcoFlores2 = arcflor2.getObject();
grupoArcoFlores2.position.set(0, 0, -7.5);
grupoArcoFlores2.scale.set(0.8, 0.8, 0.8);
scene.add(grupoArcoFlores2);

const arcflor3 = new ArcoFlores();
const grupoArcoFlores3 = arcflor3.getObject();
grupoArcoFlores3.position.set(5.5, 0, -7.5);
grupoArcoFlores3.scale.set(0.5, 0.5, 0.5);
scene.add(grupoArcoFlores3);

//TAZA DE DULCES

const dulces1 = new Dulces();
const grupoDulces = dulces1.getObject();
grupoDulces.position.set(-1.2, 2.88, -2.75);
grupoDulces.scale.set(0.15, 0.15, 0.15);
scene.add(grupoDulces);

const dulces2 = new Dulces();
const grupoDulces2 = dulces2.getObject();
grupoDulces2.position.set(1.2, 2.88, -2.75);
grupoDulces2.scale.set(0.15, 0.15, 0.15);
scene.add(grupoDulces2);

const dulces3 = new Dulces();
const grupoDulces3 = dulces3.getObject();
grupoDulces3.position.set(5.3, .97, -2.5);
grupoDulces3.scale.set(0.15, 0.15, 0.15);
scene.add(grupoDulces3);

const dulces4 = new Dulces();
const grupoDulces4 = dulces4.getObject();
grupoDulces4.position.set(-5.3, .97, -2.5);
grupoDulces4.scale.set(0.15, 0.15, 0.15);
scene.add(grupoDulces4);

//MARCOS DE FOTOS

const foto1 = new foto();
const grupofoto = foto1.getObject();
grupofoto.position.set(0, 6.72, -5.5);
grupofoto.scale.set(.15, .15, .15);
scene.add(grupofoto);

const foto2 = new foto();
const grupofoto2 = foto2.getObject();
grupofoto2.position.set(0, 3.8, -3.2);
grupofoto2.scale.set(.15, .15, .15);
scene.add(grupofoto2);

const foto3 = new foto();
const grupofoto3 = foto3.getObject();
grupofoto3.position.set(-2.35, 1.88, -1.9);
grupofoto3.scale.set(.15, .15, .15);
scene.add(grupofoto3);

const foto4 = new foto();
const grupofoto4 = foto4.getObject();
grupofoto4.position.set(2.35, 1.88, -1.9);
grupofoto4.scale.set(.15, .15, .15);
scene.add(grupofoto4);

const foto5 = new foto();
const grupofoto5 = foto5.getObject();
grupofoto5.position.set(-3.5, 5, -6.4);
grupofoto5.scale.set(.15, .15, .15);
scene.add(grupofoto5);

const foto6 = new foto();
const grupofoto6 = foto6.getObject();
grupofoto6.position.set(3.5, 5, -6.4);
grupofoto6.scale.set(.15, .15, .15);
scene.add(grupofoto6);

//PLATAFORMAS

const plataformas1 = new Plataforma();
const grupoplataformas = plataformas1.getObject();
grupoplataformas.position.set(0, 0, -4);
grupoplataformas.scale.set(1.6, 1.6, 1.6);
scene.add(grupoplataformas);

const plataformas4 = new Plataforma();
const grupoplataformas4 = plataformas4.getObject();
grupoplataformas4.position.set(-3.5, 0, -5);
grupoplataformas4.scale.set(1.2, 1.2, 1.2);
scene.add(grupoplataformas4);

const plataformas5 = new Plataforma();
const grupoplataformas5 = plataformas5.getObject();
grupoplataformas5.position.set(3.5, 0, -5);
grupoplataformas5.scale.set(1.2, 1.2, 1.2);
scene.add(grupoplataformas5);

//TAZON DE AGUA

const agua3 = new agua();
const grupoaguita3 = agua3.getObject();
grupoaguita3.position.set(-7.5, .78, -5);
grupoaguita3.scale.set(0.5, 0.5, 0.5);
scene.add(grupoaguita3);

const agua4 = new agua();
const grupoaguita4 = agua4.getObject();
grupoaguita4.position.set(7.5, .78, -5);
grupoaguita4.scale.set(0.5, 0.5, 0.5);
scene.add(grupoaguita4);

//BOTELLAS

const botella1 = new botella();
const grupobotella = botella1.getObject();
grupobotella.position.set(-1, 1.88, -1.95);
grupobotella.scale.set(0.2, 0.2, 0.2);
scene.add(grupobotella);

const botella2 = new botella();
const grupobotella2 = botella2.getObject();
grupobotella2.position.set(1, 1.88, -1.95);
grupobotella2.scale.set(0.2, 0.2, 0.2);
scene.add(grupobotella2);

const botella3 = new botella();
const grupobotella3 = botella3.getObject();
grupobotella3.position.set(-4.3, 2.88, -4.5);
grupobotella3.scale.set(0.2, 0.2, 0.2);
scene.add(grupobotella3);

const botella4 = new botella();
const grupobotella4 = botella4.getObject();
grupobotella4.position.set(4.3, 2.88, -4.5);
grupobotella4.scale.set(0.2, 0.2, 0.2);
scene.add(grupobotella4);

//INCIENSOS

const inci1 = new incienso();
const grupoinci = inci1.getObject();
grupoinci.position.set(2.5, 4.8, -4.3);
grupoinci.scale.set(0.2, 0.2, 0.2);
scene.add(grupoinci);

const inci2 = new incienso();
const grupoinci2 = inci2.getObject();
grupoinci2.position.set(-2.5, 4.8, -4.3);
grupoinci2.scale.set(0.2, 0.2, 0.2);
scene.add(grupoinci2);

const inci3 = new incienso();
const grupoinci3 = inci3.getObject();
grupoinci3.position.set(-1.1, 6.8, -5.7);
grupoinci3.scale.set(0.2, 0.2, 0.2);
scene.add(grupoinci3);

const inci4 = new incienso();
const grupoinci4 = inci4.getObject();
grupoinci4.position.set(1.1, 6.8, -5.7);
grupoinci4.scale.set(0.2, 0.2, 0.2);
scene.add(grupoinci4);

//MOLE DE OLLA

const mol1 = new mole();
const grupomole = mol1.getObject();
grupomole.position.set(5, .98, -1.25);
grupomole.scale.set(0.2, 0.2, 0.2);
scene.add(grupomole);

const mol2 = new mole();
const grupomole2 = mol2.getObject();
grupomole2.position.set(-5, .98, -1.25);
grupomole2.scale.set(0.2, 0.2, 0.2);
scene.add(grupomole2);

const mol3 = new mole();
const grupomole3 = mol3.getObject();
grupomole3.position.set(-4.5, 1.88, -2.8);
grupomole3.scale.set(0.2, 0.2, 0.2);
scene.add(grupomole3);

const mol4 = new mole();
const grupomole4 = mol4.getObject();
grupomole4.position.set(4.5, 1.88, -2.8);
grupomole4.scale.set(0.2, 0.2, 0.2);
scene.add(grupomole4);

//PAN DE MUERTO

const pan1 = new panM();
const grupopan = pan1.getObject();
grupopan.position.set(2, 4.7, -4);
grupopan.scale.set(0.3, 0.3, 0.3);
scene.add(grupopan);

const pan2 = new panM();
const grupopan2 = pan2.getObject();
grupopan2.position.set(-1.4, 5.75, -4.8);
grupopan2.scale.set(0.3, 0.3, 0.3);
scene.add(grupopan2);

const pan3 = new panM();
const grupopan3 = pan3.getObject();
grupopan3.position.set(1.4, 5.75, -4.8);
grupopan3.scale.set(0.3, 0.3, 0.3);
scene.add(grupopan3);

const pan4 = new panM();
const grupopan4 = pan4.getObject();
grupopan4.position.set(0, 5.75, -4.8);
grupopan4.scale.set(0.3, 0.3, 0.3);
scene.add(grupopan4);

const pan5 = new panM();
const grupopan5 = pan5.getObject();
grupopan5.position.set(1, 4.7, -4);
grupopan5.scale.set(0.3, 0.3, 0.3);
scene.add(grupopan5);

const pan6 = new panM();
const grupopan6 = pan6.getObject();
grupopan6.position.set(-1, 4.7, -4);
grupopan6.scale.set(0.3, 0.3, 0.3);
scene.add(grupopan6);

const pan7 = new panM();
const grupopan7 = pan7.getObject();
grupopan7.position.set(-2, 4.7, -4);
grupopan7.scale.set(0.3, 0.3, 0.3);
scene.add(grupopan7);

const pan8 = new panM();
const grupopan8 = pan8.getObject();
grupopan8.position.set(-1.35, .95, -1.28);
grupopan8.scale.set(0.3, 0.3, 0.3);
scene.add(grupopan8);

const pan9 = new panM();
const grupopan9 = pan9.getObject();
grupopan9.position.set(1.35, .95, -1.28);
grupopan9.scale.set(0.3, 0.3, 0.3);
scene.add(grupopan9);

// ILUMINACIÓN TENUE DE LA HABITACIÓN
const directionalLight = new THREE.DirectionalLight(0xffd6a0, 0.08);
directionalLight.position.set(1.7, 8, -6.05);
directionalLight.castShadow = true;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x8c7865, 0.18);
scene.add(ambientLight);

function animate()
{
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
}

animate();