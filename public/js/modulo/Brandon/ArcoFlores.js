import * as THREE from 'three';

export class ArcoFlores {
    constructor() {
        this.arco = new THREE.Group();

        // Materiales naranjas
        const materialesPetalos = [
            new THREE.MeshStandardMaterial({ color: 0xc94b09, roughness: 0.55 }),
            new THREE.MeshStandardMaterial({ color: 0xdf5c0b, roughness: 0.5 }),
            new THREE.MeshStandardMaterial({ color: 0xf07110, roughness: 0.45 }),
            new THREE.MeshStandardMaterial({ color: 0xff8419, roughness: 0.42 })
        ];

        // Forma de cada pétalo
        const formaPetalo = new THREE.Shape();
        formaPetalo.moveTo(0, -0.40);
        formaPetalo.quadraticCurveTo(-0.28, -0.10, -0.25, 0.18);
        formaPetalo.quadraticCurveTo(-0.18, 0.45, 0, 0.62);
        formaPetalo.quadraticCurveTo(0.18, 0.45, 0.25, 0.18);
        formaPetalo.quadraticCurveTo(0.28, -0.10, 0, -0.40);

        const geometriaPetalo = new THREE.ExtrudeGeometry(formaPetalo, {
            depth: 0.06,
            bevelEnabled: true,
            bevelThickness: 0.02,
            bevelSize: 0.02,
            bevelSegments: 2
        });

        // Función interna para crear un pétalo
        const agregarPetalo = (grupo, angulo, radio, tamaño, profundidad, material) => {
            const petalo = new THREE.Mesh(geometriaPetalo, material);
            petalo.scale.set(tamaño, tamaño, tamaño);
            petalo.position.set(
                Math.cos(angulo) * radio,
                Math.sin(angulo) * radio,
                profundidad
            );
            petalo.rotation.z = angulo - Math.PI / 2;
            petalo.castShadow = true;
            petalo.receiveShadow = true;
            grupo.add(petalo);
        };

        // Función interna para crear una capa de pétalos
        const crearAnilloPetalos = (grupo, cantidad, radio, tamaño, profundidad, giro) => {
            for (let i = 0; i < cantidad; i++) {
                const angulo = (i / cantidad) * Math.PI * 2 + giro;
                const material = materialesPetalos[i % materialesPetalos.length];
                agregarPetalo(grupo, angulo, radio, tamaño, profundidad, material);
            }
        };

        // Función interna para crear UNA sola flor modelo
        const crearFlorModelo = () => {
            const flor = new THREE.Group();

            const base = new THREE.Mesh(
                new THREE.SphereGeometry(0.9, 20, 16),
                new THREE.MeshStandardMaterial({ color: 0xc94b09, roughness: 0.65 })
            );
            base.scale.set(1, 1, 0.5);
            base.position.z = -0.30;
            base.castShadow = true;
            base.receiveShadow = true;
            flor.add(base);

            crearAnilloPetalos(flor, 12, 0.68, 0.78, 0.00, 0);
            crearAnilloPetalos(flor, 10, 0.52, 0.65, 0.10, 0.14);
            crearAnilloPetalos(flor, 8, 0.35, 0.53, 0.20, 0.05);
            crearAnilloPetalos(flor, 5, 0.16, 0.38, 0.30, 0.18);

            const centro = new THREE.Mesh(
                new THREE.SphereGeometry(0.18, 16, 16),
                new THREE.MeshStandardMaterial({ color: 0xd85b0c, roughness: 0.5 })
            );
            centro.position.z = 0.38;
            centro.scale.z = 0.45;
            centro.castShadow = true;
            flor.add(centro);

            return flor;
        };

        const florModelo = crearFlorModelo();

        // Función para clonar la flor y colocarla en el arco
        const agregarFlor = (x, y, z, escala, rotacionY) => {
            const nuevaFlor = florModelo.clone();
            nuevaFlor.position.set(x, y, z);
            nuevaFlor.scale.set(escala, escala, escala);
            nuevaFlor.rotation.y = rotacionY;
            this.arco.add(nuevaFlor);
        };

        // Construir columnas laterales
        for (let i = 0; i < 8; i++) {
            const y = 1.0 + i * 0.85;
            agregarFlor(-5.2, y, 0, 0.82, 0.12);
            agregarFlor(5.2, y, 0, 0.82, -0.12);
            agregarFlor(-4.85, y + 0.15, -0.38, 0.68, 0.25);
            agregarFlor(4.85, y + 0.15, -0.38, 0.68, -0.25);
        }

        // Construir curva superior
        const radioArco = 5.2;
        const alturaBaseArco = 6.3;
        const cantidadFloresArriba = 25;

        for (let i = 0; i < cantidadFloresArriba; i++) {
            const proporcion = i / (cantidadFloresArriba - 1);
            const angulo = Math.PI - proporcion * Math.PI;
            const x = Math.cos(angulo) * radioArco;
            const y = alturaBaseArco + Math.sin(angulo) * radioArco;
            
            agregarFlor(x, y, 0, 0.88, (proporcion - 0.5) * 0.45);

            if (i % 2 === 0) {
                agregarFlor(x * 0.94, y - 0.28, -0.45, 0.68, (proporcion - 0.5) * 0.55);
            }
        }

        // Construir macizos a los pies
        for (let i = 0; i < 10; i++) {
            const x = -4.5 + i;
            const z = i % 2 === 0 ? 0.45 : -0.2;
            agregarFlor(x, 0.65, z, 0.70, (i - 5) * 0.10);
        }
    }

    getObject() {
        return this.arco;
    }
}