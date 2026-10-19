import * as THREE from 'three';

export class CadenaFlores {
    constructor(config = {}) {
        this.grupo = new THREE.Group();

        // Configuración inicial o por defecto
        const posX = config.x || 0;
        const posY = config.y || 0;
        const posZ = config.z || 0;
        const scaleY = config.scaleY || (0.75 + Math.random() * 0.35);
        const flowerScaleMod = config.flowerScale || (0.75 + Math.random() * 0.45);

        // --- MATERIALES ---
        this.matNaranja = new THREE.MeshStandardMaterial({ color: 0xFF8C00, roughness: 0.55 });
        this.matAmarilloMedio = new THREE.MeshStandardMaterial({ color: 0xFFA500, roughness: 0.5 });
        this.matDorado = new THREE.MeshStandardMaterial({ color: 0xFFD700, roughness: 0.45 });
        const stringMaterial = new THREE.MeshStandardMaterial({ color: 0xA0522D, roughness: 0.75 });

        // --- GEOMETRÍAS BASE COMPARTIDAS ---
        this.petaloGeo = new THREE.ConeGeometry(0.035, 0.1, 5);
        this.petaloGeo.translate(0, 0.05, 0); // Pivote en la inserción de la corola
        this.centroGeo = new THREE.SphereGeometry(0.07, 10, 8);

        const stringHeight = 5;

        // Cordel vertical
        const stringGeometry = new THREE.CylinderGeometry(0.01, 0.01, stringHeight, 6);
        const stringMesh = new THREE.Mesh(stringGeometry, stringMaterial);
        stringMesh.position.y = stringHeight / 2;
        stringMesh.castShadow = true;
        stringMesh.receiveShadow = true;
        this.grupo.add(stringMesh);

        // Flores ensartadas a lo largo de la tira
        const flowerCount = 9;
        const spacing = (stringHeight - 0.5) / flowerCount;
        const tiposColor = ['naranja', 'amarillo', 'dorado'];

        for (let i = 0; i < flowerCount; i++) {
            const tipo = tiposColor[i % tiposColor.length];
            const flower = this.crearFlorCempasuchilRealista(tipo);

            const yPos = 0.4 + (i * spacing);
            flower.position.set(0, yPos, 0);
            flower.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

            // Variación individual de volumen en las flores de cada tira
            const individualVariation = 0.9 + Math.random() * 0.2;
            const s = flowerScaleMod * individualVariation;
            flower.scale.set(1.2 * s, 0.85 * s, 1.2 * s);

            this.grupo.add(flower);
        }

        // Aplicar escala vertical e irregularidades de longitud
        this.grupo.scale.y = scaleY;
        this.grupo.rotation.y = Math.random() * Math.PI * 2;
        this.grupo.position.set(posX, posY, posZ);
    }

    crearFlorCempasuchilRealista(colorBase) {
        const flor = new THREE.Group();

        let matCentro = this.matNaranja;
        let matPuntas = this.matDorado;

        if (colorBase === 'amarillo') {
            matCentro = this.matAmarilloMedio;
            matPuntas = this.matDorado;
        } else if (colorBase === 'naranja') {
            matCentro = this.matNaranja;
            matPuntas = this.matAmarilloMedio;
        }

        // Núcleo interno
        const nucleo = new THREE.Mesh(this.centroGeo, matCentro);
        nucleo.castShadow = true;
        nucleo.receiveShadow = true;
        flor.add(nucleo);

        // Capas de pétalos esféricas densas
        const capas = [
            { count: 8,  inclinacion: 0.25, escala: 0.75, mat: matPuntas },
            { count: 12, inclinacion: 0.60, escala: 0.95, mat: matPuntas },
            { count: 16, inclinacion: 1.05, escala: 1.15, mat: matCentro },
            { count: 18, inclinacion: 1.50, escala: 1.10, mat: matCentro },
            { count: 14, inclinacion: 1.95, escala: 0.85, mat: matCentro }
        ];

        capas.forEach(capa => {
            for (let i = 0; i < capa.count; i++) {
                const azimut = (i / capa.count) * Math.PI * 2 + (Math.random() * 0.2);
                const petalo = new THREE.Mesh(this.petaloGeo, capa.mat);

                petalo.scale.set(capa.escala, capa.escala, capa.escala);
                petalo.rotation.z = -capa.inclinacion;
                petalo.rotation.y = azimut;
                petalo.rotation.x = (Math.random() - 0.5) * 0.25;

                petalo.castShadow = true;
                petalo.receiveShadow = true;
                flor.add(petalo);
            }
        });

        flor.scale.set(1.2, 0.85, 1.2);
        return flor;
    }

    getObject() {
        return this.grupo;
    }
}