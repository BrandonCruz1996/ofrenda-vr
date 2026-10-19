
import * as THREE from 'three';

export class VelasEnVaso {

    constructor() {
        this.VelasEnVaso = new THREE.Group();
        this.animacionesLlama = [];

        this.crearVeladoraEnVaso(0, 0, 0);
    }

    crearVeladoraEnVaso(x, z) {

        const grupo = new THREE.Group();

        // Material del vidrio
        const vidrioMat = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.25,
            roughness: 0.1,
            transmission: 0.9,
            ior: 1.5,
            thickness: 0.15
        });

        // Materiales de la veladora
        const ceraMat = new THREE.MeshStandardMaterial({
            color: 0xfff8dc,
            roughness: 0.5
        });

        const mechaMat = new THREE.MeshBasicMaterial({
            color: 0x111111
        });

        const llamaMat = new THREE.MeshBasicMaterial({
            color: 0xffaa00
        });

        // Vaso de vidrio
        const vaso = new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.45, 0.38, 2.4, 32, 1, true
            ),
            vidrioMat
        );

        vaso.position.y = 1.2;
        vaso.castShadow = true;
        grupo.add(vaso);

        // Base del vaso
        const baseVaso = new THREE.Mesh(
            new THREE.CylinderGeometry(0.38, 0.38, 0.1, 32),
            vidrioMat
        );

        baseVaso.position.y = 0.05;
        grupo.add(baseVaso);

        // Cera
        const cera = new THREE.Mesh(
            new THREE.CylinderGeometry(0.41, 0.36, 1.8, 32),
            ceraMat
        );

        cera.position.y = 0.9;
        grupo.add(cera);

        // Mecha
        const mecha = new THREE.Mesh(
            new THREE.CylinderGeometry(0.02, 0.02, 0.25, 8),
            mechaMat
        );

        mecha.position.y = 1.92;
        grupo.add(mecha);

        // Llama
        const llama = new THREE.Mesh(
            new THREE.SphereGeometry(0.12, 16, 16),
            llamaMat
        );

        llama.position.y = 2.12;
        llama.scale.set(0.6, 1.8, 0.6);
        grupo.add(llama);

        // Luz cálida de la vela
        const luzVela = new THREE.PointLight(
            0xffaa33, 2.2, 6
        );

        luzVela.position.y = 2.2;
        luzVela.castShadow = true;
        grupo.add(luzVela);

        // Posición de la veladora
        grupo.position.set(x, 0, z);

        // Agregar al grupo principal de la instancia
        this.VelasEnVaso.add(grupo);

        // Guardar elementos para animar las llamas
        this.animacionesLlama.push({
            llama,
            luzVela
        });
    }

    actualizar(t) {

        this.animacionesLlama.forEach(
            ({ llama, luzVela }, index) => {

                const parpadeo =
                    Math.sin(t + index * 10) * 0.08 +
                    Math.random() * 0.04;

                llama.scale.x = 0.6 + parpadeo;
                llama.scale.z = 0.6 + parpadeo;

                luzVela.intensity = 2.0 + Math.random() * 0.6;
            }
        );
    }
}