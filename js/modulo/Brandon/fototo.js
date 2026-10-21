import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';

// Escena
const escena = new THREE.Scene();
escena.background = new THREE.Color(0xead8bd);

// Cámara
const camara = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camara.position.set(0, 6, 15);

// Renderizador
const renderizador = new THREE.WebGLRenderer({ antialias: true });
renderizador.setSize(window.innerWidth, window.innerHeight);
renderizador.setPixelRatio(window.devicePixelRatio);
renderizador.shadowMap.enabled = true;
renderizador.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.style.margin = '0';
document.body.appendChild(renderizador.domElement);

// Controles
const controles = new OrbitControls(camara, renderizador.domElement);
controles.enableDamping = false;
controles.target.set(0, 3.6, 0);
controles.minDistance = 5;
controles.maxDistance = 22;
controles.update();

// Piso
const piso = new THREE.Mesh(
    new THREE.PlaneGeometry(25, 25),
    new THREE.MeshStandardMaterial({
        color: 0x6d4630,
        roughness: 0.9
    })
);

piso.rotation.x = -Math.PI / 2;
piso.receiveShadow = true;
escena.add(piso);

// Mesa o base de la ofrenda
const materialMesa = new THREE.MeshStandardMaterial({
    color: 0x753b1d,
    roughness: 0.75
});

const mesa = new THREE.Mesh(
    new THREE.BoxGeometry(12, 0.45, 2.2),
    materialMesa
);

mesa.position.set(0, 1.1, 0);
mesa.castShadow = true;
mesa.receiveShadow = true;
escena.add(mesa);

// Patas de la mesa
for (const x of [-5.2, 5.2]) {
    const pata = new THREE.Mesh(
        new THREE.BoxGeometry(0.45, 1.2, 1.6),
        materialMesa
    );

    pata.position.set(x, 0.5, 0);
    pata.castShadow = true;
    pata.receiveShadow = true;
    escena.add(pata);
}

// Materiales del marco
const materialMaderaOscura = new THREE.MeshStandardMaterial({
    color: 0x542612,
    roughness: 0.72
});

const materialMadera = new THREE.MeshStandardMaterial({
    color: 0x93491f,
    roughness: 0.65
});

const materialDorado = new THREE.MeshStandardMaterial({
    color: 0xe2ae3b,
    metalness: 0.25,
    roughness: 0.4
});

const materialFondoFoto = new THREE.MeshStandardMaterial({
    color: 0x21140e,
    roughness: 0.85
});

const cargadorTexturas = new THREE.TextureLoader();

// Crear un marco de madera con una imagen
function crearMarcoConFoto(rutaFoto, x, y, z, ancho = 3, alto = 4) {
    const marco = new THREE.Group();

    const grosor = 0.28;
    const profundidad = 0.28;

    // Fondo detrás de la fotografía
    const fondo = new THREE.Mesh(
        new THREE.BoxGeometry(ancho + 0.18, alto + 0.18, 0.12),
        materialFondoFoto
    );

    fondo.position.z = -0.08;
    marco.add(fondo);

    // Cargar fotografía
    const textura = cargadorTexturas.load(rutaFoto);

    // Hace que los colores de la imagen se vean correctamente
    textura.colorSpace = THREE.SRGBColorSpace;

    const foto = new THREE.Mesh(
        new THREE.PlaneGeometry(ancho, alto),
        new THREE.MeshBasicMaterial({
            map: textura,
            side: THREE.DoubleSide
        })
    );

    foto.position.z = 0.01;
    marco.add(foto);

    // Parte superior de madera
    const arriba = new THREE.Mesh(
        new THREE.BoxGeometry(ancho + grosor * 2, grosor, profundidad),
        materialMaderaOscura
    );

    arriba.position.set(0, alto / 2 + grosor / 2, 0.16);
    marco.add(arriba);

    // Parte inferior de madera
    const abajo = arriba.clone();
    abajo.position.y = -alto / 2 - grosor / 2;
    marco.add(abajo);

    // Lado izquierdo
    const ladoIzquierdo = new THREE.Mesh(
        new THREE.BoxGeometry(grosor, alto, profundidad),
        materialMadera
    );

    ladoIzquierdo.position.set(-ancho / 2 - grosor / 2, 0, 0.16);
    marco.add(ladoIzquierdo);

    // Lado derecho
    const ladoDerecho = ladoIzquierdo.clone();
    ladoDerecho.position.x = ancho / 2 + grosor / 2;
    marco.add(ladoDerecho);

    // Adornos dorados en las cuatro esquinas
    const posicionesEsquinas = [
        [-ancho / 2, alto / 2],
        [ancho / 2, alto / 2],
        [-ancho / 2, -alto / 2],
        [ancho / 2, -alto / 2]
    ];

    for (const posicion of posicionesEsquinas) {
        const adorno = new THREE.Mesh(
            new THREE.SphereGeometry(0.10, 12, 12),
            materialDorado
        );

        adorno.position.set(posicion[0], posicion[1], 0.34);
        marco.add(adorno);
    }

    // Soporte trasero inclinado para que parezca un retrato real
    const soporte = new THREE.Mesh(
        new THREE.BoxGeometry(0.20, 3.2, 0.16),
        materialMaderaOscura
    );

    soporte.position.set(0, -1.1, -0.65);
    soporte.rotation.x = 0.35;
    marco.add(soporte);

    marco.position.set(x, y, z);

    marco.traverse((objeto) => {
        if (objeto.isMesh) {
            objeto.castShadow = true;
            objeto.receiveShadow = true;
        }
    });

    escena.add(marco);
}

// Tus tres retratos
crearMarcoConFoto('./fotos/foto1.jpg', -4, 3.7, 0, 2.7, 3.6);
crearMarcoConFoto('./fotos/foto2.jpg', 0, 3.7, 0, 2.7, 3.6);
crearMarcoConFoto('./fotos/foto3.jpg', 4, 3.7, 0, 2.7, 3.6);

controles.addEventListener('change', () => renderizador.render(escena, camara));
renderizador.render(escena, camara);

// Ajustar pantalla
window.addEventListener('resize', () => {
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
    renderizador.setSize(window.innerWidth, window.innerHeight);
});