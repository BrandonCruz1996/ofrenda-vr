import * as THREE from 'three';

export class ArcoPeque {
    constructor() {
        this.arcoGrupo = new THREE.Group();

        // 1. Estructura soporte base
        const arcoSoporteGeo = new THREE.TorusGeometry(0.8, 0.03, 8, 24, Math.PI);
        const arcoSoporteMat = new THREE.MeshStandardMaterial({ color: 0xA0522D, roughness: 0.7 });
        const arcoSoporte = new THREE.Mesh(arcoSoporteGeo, arcoSoporteMat);
        arcoSoporte.position.set(0, 0.8, 0.2);
        arcoSoporte.castShadow = true;
        arcoSoporte.receiveShadow = true;
        this.arcoGrupo.add(arcoSoporte);

        const posteGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.8, 8);
        const posteIzq = new THREE.Mesh(posteGeo, arcoSoporteMat);
        posteIzq.position.set(-0.8, 0.4, 0.2);
        posteIzq.castShadow = true;
        posteIzq.receiveShadow = true;
        this.arcoGrupo.add(posteIzq);

        const posteDer = new THREE.Mesh(posteGeo, arcoSoporteMat);
        posteDer.position.set(0.8, 0.4, 0.2);
        posteDer.castShadow = true;
        posteDer.receiveShadow = true;
        this.arcoGrupo.add(posteDer);

        // 2. Materiales compartidos para las flores de cempasúchil
        const matNaranjaOscuro = new THREE.MeshStandardMaterial({ color: 0xFF8C00, roughness: 0.55 });
        const matNaranjaClaro  = new THREE.MeshStandardMaterial({ color: 0xFFA500, roughness: 0.5 });
        const matAmarillo      = new THREE.MeshStandardMaterial({ color: 0xFFD700, roughness: 0.45 });

        // 3. Geometrías compartidas (optimización)
        const petaloGeo = new THREE.ConeGeometry(0.032, 0.09, 5);
        petaloGeo.translate(0, 0.045, 0);
        const centroGeo = new THREE.DodecahedronGeometry(0.05, 1);

        // 4. Generador de flor individual
        const crearFlorCempasuchilDetallada = (colorTipo) => {
            const flor = new THREE.Group();

            let matBase = matNaranjaOscuro;
            let matPuntas = matAmarillo;

            if (colorTipo === 'amarillo') {
                matBase = matNaranjaClaro;
                matPuntas = matAmarillo;
            } else if (colorTipo === 'dorado') {
                matBase = matNaranjaOscuro;
                matPuntas = matNaranjaClaro;
            }

            const nucleo = new THREE.Mesh(centroGeo, matBase);
            nucleo.castShadow = true;
            nucleo.receiveShadow = true;
            flor.add(nucleo);

            const capas = [
                { numPetalos: 7, inclinacion: 0.28, escala: 0.75, mat: matPuntas },
                { numPetalos: 11, inclinacion: 0.65, escala: 0.95, mat: matNaranjaClaro },
                { numPetalos: 15, inclinacion: 1.15, escala: 1.15, mat: matBase },
                { numPetalos: 18, inclinacion: 1.55, escala: 1.05, mat: matBase }
            ];

            capas.forEach(capa => {
                for (let i = 0; i < capa.numPetalos; i++) {
                    const azimut = (i / capa.numPetalos) * Math.PI * 2 + (Math.random() * 0.2);
                    const petalo = new THREE.Mesh(petaloGeo, capa.mat);

                    petalo.scale.set(capa.escala, capa.escala, capa.escala);
                    petalo.rotation.z = -capa.inclinacion;
                    petalo.rotation.y = azimut;
                    petalo.rotation.x = (Math.random() - 0.5) * 0.25;

                    petalo.castShadow = true;
                    petalo.receiveShadow = true;
                    flor.add(petalo);
                }
            });

            return flor;
        };

        const tiposColor = ['naranja', 'amarillo', 'dorado'];

        // 5. Helper para posicionar y orientar flores en el soporte
        const colocarFlorEnGuia = (x, y, z, normalDir, rotZ = 0) => {
            const tipo = tiposColor[Math.floor(Math.random() * tiposColor.length)];
            const flor = crearFlorCempasuchilDetallada(tipo);

            const escalaBase = 0.85 + Math.random() * 0.45;
            flor.scale.set(escalaBase, escalaBase, escalaBase);

            flor.position.set(x, y, z);

            const normal = normalDir.clone().normalize();
            flor.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
            flor.rotation.z += rotZ + (Math.random() - 0.5) * 0.3;

            this.arcoGrupo.add(flor);
        };

        // 6. Poblar postes laterales
        const pasosPoste = 10;
        for (let i = 0; i <= pasosPoste; i++) {
            const y = 0.08 + (i / pasosPoste) * 0.72;

            // Columna Izquierda (-0.8)
            colocarFlorEnGuia(-0.8, y, 0.22, new THREE.Vector3(0, 0, 1));
            colocarFlorEnGuia(-0.86, y + 0.02, 0.16, new THREE.Vector3(-0.5, 0, 0.8));
            colocarFlorEnGuia(-0.74, y - 0.02, 0.16, new THREE.Vector3(0.5, 0, 0.8));

            // Columna Derecha (+0.8)
            colocarFlorEnGuia(0.8, y, 0.22, new THREE.Vector3(0, 0, 1));
            colocarFlorEnGuia(0.86, y + 0.02, 0.16, new THREE.Vector3(0.5, 0, 0.8));
            colocarFlorEnGuia(0.74, y - 0.02, 0.16, new THREE.Vector3(-0.5, 0, 0.8));
        }

        // 7. Poblar semicírculo superior
        const pasosArco = 24;
        const radioArco = 0.8;
        const centroY = 0.8;

        for (let i = 0; i <= pasosArco; i++) {
            const theta = (i / pasosArco) * Math.PI;
            const dirRadial = new THREE.Vector3(Math.cos(theta), Math.sin(theta), 0);

            // Capa frontal principal
            const x = Math.cos(theta) * radioArco;
            const y = centroY + Math.sin(theta) * radioArco;
            colocarFlorEnGuia(x, y, 0.22, new THREE.Vector3(0, 0, 1));

            // Capa exterior perimetral
            const rExt = radioArco + 0.06;
            const xExt = Math.cos(theta) * rExt;
            const yExt = centroY + Math.sin(theta) * rExt;
            const normalExt = new THREE.Vector3(dirRadial.x * 0.5, dirRadial.y * 0.5, 0.7);
            colocarFlorEnGuia(xExt, yExt, 0.17, normalExt);

            // Capa interior
            const rInt = radioArco - 0.06;
            const xInt = Math.cos(theta) * rInt;
            const yInt = centroY + Math.sin(theta) * rInt;
            const normalInt = new THREE.Vector3(-dirRadial.x * 0.35, -dirRadial.y * 0.35, 0.8);
            colocarFlorEnGuia(xInt, yInt, 0.17, normalInt);
        }

        // Flor en la cima del arco
        colocarFlorEnGuia(0, centroY + radioArco + 0.03, 0.25, new THREE.Vector3(0, 0.3, 1));
    }

    getObject() {
        return this.arcoGrupo;
    }
}