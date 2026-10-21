
import * as THREE from 'three';

export class PlatoSal {

    constructor() {

        // Grupo principal de la instancia
        this.PlatoSal = new THREE.Group();

        // Materiales
        this.barroNegroMat = new THREE.MeshStandardMaterial({
            color: 0x1c1c1e,
            roughness: 0.25,
            metalness: 0.15,
            side: THREE.DoubleSide
        });

        this.salMat = new THREE.MeshStandardMaterial({
            color: 0xfcfcfc,
            roughness: 0.9,
            metalness: 0.02
        });

        this.granoSalBlancaMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.3,
            metalness: 0.1
        });

        this.granoSalRosaMat = new THREE.MeshStandardMaterial({
            color: 0xf4a261,
            roughness: 0.4,
            metalness: 0.05
        });

        this.granoSalMorenaMat = new THREE.MeshStandardMaterial({
            color: 0x8d5b4c,
            roughness: 0.6,
            metalness: 0.02
        });

        this.cempasuchilMat = new THREE.MeshStandardMaterial({
            color: 0xff8500,
            roughness: 0.4
        });

        // Construcción del objeto
        this.crearPlato();
        this.crearSal();
    }

    // PLATO DE BARRO NEGRO

    crearPlato() {

        const puntosPerfil = [
            new THREE.Vector2(0, 0),
            new THREE.Vector2(0.9, 0),
            new THREE.Vector2(1.1, 0.08),
            new THREE.Vector2(1.8, 0.5),
            new THREE.Vector2(1.85, 0.55),
            new THREE.Vector2(1.8, 0.6),
            new THREE.Vector2(1.7, 0.52),
            new THREE.Vector2(1.0, 0.18),
            new THREE.Vector2(0, 0.18)
        ];

        const geometria = new THREE.LatheGeometry(
            puntosPerfil,
            64
        );

        const platoMesh = new THREE.Mesh(
            geometria,
            this.barroNegroMat
        );

        platoMesh.castShadow = true;
        platoMesh.receiveShadow = true;

        this.PlatoSal.add(platoMesh);
    }

    // SAL Y GRANOS DECORATIVOS

    crearSal() {

        this.grupoSal = new THREE.Group();

        // Base de sal
        const rellenoBaseSal = new THREE.Mesh(
            new THREE.CylinderGeometry(1.68, 1.0, 0.28, 32),
            this.salMat
        );

        rellenoBaseSal.position.y = 0.31;
        rellenoBaseSal.castShadow = true;
        rellenoBaseSal.receiveShadow = true;

        this.grupoSal.add(rellenoBaseSal);

        // Montículo de sal
        const domoSal = new THREE.Mesh(
            new THREE.ConeGeometry(1.68, 0.55, 32),
            this.salMat
        );

        domoSal.position.y = 0.725;
        domoSal.castShadow = true;
        domoSal.receiveShadow = true;

        this.grupoSal.add(domoSal);

        // Granos de sal de diferentes colores
        const numGranos = 220;

        for (let i = 0; i < numGranos; i++) {

            const radio = Math.random() * 1.6;
            const angulo = Math.random() * Math.PI * 2;
            const tamano = 0.02 + Math.random() * 0.035;

            // Selección aleatoria del material
            let materialGrano;

            const aleatorio = Math.random();

            if (aleatorio < 0.45) {

                materialGrano = this.granoSalBlancaMat;

            } else if (aleatorio < 0.75) {

                materialGrano = this.granoSalRosaMat;

            } else {

                materialGrano = this.granoSalMorenaMat;
            }

            const grano = new THREE.Mesh(
                new THREE.BoxGeometry(
                    tamano,
                    tamano,
                    tamano
                ),
                materialGrano
            );

            const alturaY =
                0.44 +
                (1.6 - radio) * 0.33 +
                Math.random() * 0.02;

            grano.position.set(
                Math.cos(angulo) * radio,
                alturaY,
                Math.sin(angulo) * radio
            );

            grano.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                0
            );

            grano.castShadow = true;
            grano.receiveShadow = true;

            this.grupoSal.add(grano);
        }

        this.PlatoSal.add(this.grupoSal);
    }

}
