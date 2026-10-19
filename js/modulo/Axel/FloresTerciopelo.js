import * as THREE from 'three';

export class CruzFlores {
    constructor() {
        this.cruzGrupo = new THREE.Group();

        // 1. Materiales de terciopelo compartidos
        const matTerciopelo1 = new THREE.MeshStandardMaterial({ 
            color: 0x8B004F, 
            roughness: 0.85 
        });
        const matTerciopelo2 = new THREE.MeshStandardMaterial({ 
            color: 0x4B0082, 
            roughness: 0.85 
        });

        // 2. Geometrías compartidas (optimización de memoria)
        const nucleoGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.08, 16);
        const ondaGeo = new THREE.TorusGeometry(0.08, 0.038, 12, 24, Math.PI);
        const petaloGeo = new THREE.SphereGeometry(0.06, 12, 12);

        // 3. Generador individual de flor
        const crearFlorTerciopeloDetallada = (usarTonoPrincipal = true) => {
            const flor = new THREE.Group();

            const matBase = usarTonoPrincipal ? matTerciopelo1 : matTerciopelo2;
            const matRelieve = usarTonoPrincipal ? matTerciopelo2 : matTerciopelo1;

            // Núcleo
            const nucleo = new THREE.Mesh(nucleoGeo, matBase);
            nucleo.position.y = 0.04;
            nucleo.castShadow = true;
            nucleo.receiveShadow = true;
            flor.add(nucleo);

            // Crestas / Pliegues
            const numOndas = 7;
            for (let i = 0; i < numOndas; i++) {
                const ang = (i / numOndas) * Math.PI * 2;
                const materialOnda = (i % 2 === 0) ? matBase : matRelieve;
                const onda = new THREE.Mesh(ondaGeo, materialOnda);

                onda.rotation.x = Math.PI / 2;
                onda.rotation.y = (Math.random() - 0.5) * 0.4;
                onda.rotation.z = ang;
                onda.position.set(Math.cos(ang) * 0.05, 0.07, Math.sin(ang) * 0.05);

                onda.castShadow = true;
                onda.receiveShadow = true;
                flor.add(onda);
            }

            // Pétalos periféricos
            const numBorde = 8;
            for (let j = 0; j < numBorde; j++) {
                const ang = (j / numBorde) * Math.PI * 2 + 0.2;
                const matBorde = (j % 2 === 0) ? matRelieve : matBase;
                const petaloBorde = new THREE.Mesh(petaloGeo, matBorde);

                petaloBorde.scale.set(1.0, 0.55, 1.0);
                petaloBorde.position.set(Math.cos(ang) * 0.14, 0.035, Math.sin(ang) * 0.14);
                petaloBorde.castShadow = true;
                petaloBorde.receiveShadow = true;
                flor.add(petaloBorde);
            }

            return flor;
        };

        // 4. Helper para colocar cada flor en el grupo principal
        const colocarFlorOrdenada = (x, z, indice) => {
            const usarTonoPrincipal = indice % 2 === 0;
            const flor = crearFlorTerciopeloDetallada(usarTonoPrincipal);

            flor.position.set(x, 0, z);
            flor.scale.set(1.25, 1.25, 1.25);
            flor.rotation.y = indice * 0.65;

            this.cruzGrupo.add(flor);
        };

        // 5. Distribución de la cruz
        const centroZ = 2.0;
        const espacio = 0.38;
        let contadorFlores = 0;

        // Centro
        colocarFlorOrdenada(0, centroZ, contadorFlores++);

        // Brazo superior
        for (let paso = 1; paso <= 5; paso++) {
            colocarFlorOrdenada(0, centroZ - paso * espacio, contadorFlores++);
        }

        // Brazo inferior
        for (let paso = 1; paso <= 7; paso++) {
            colocarFlorOrdenada(0, centroZ + paso * espacio, contadorFlores++);
        }

        // Brazo izquierdo
        for (let paso = 1; paso <= 4; paso++) {
            colocarFlorOrdenada(-paso * espacio, centroZ, contadorFlores++);
        }

        // Brazo derecho
        for (let paso = 1; paso <= 4; paso++) {
            colocarFlorOrdenada(paso * espacio, centroZ, contadorFlores++);
        }
    }

    getObject() {
        return this.cruzGrupo;
    }
}