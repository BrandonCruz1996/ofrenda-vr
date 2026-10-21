import * as THREE from 'three';

export class Plataforma {
    constructor() {
        this.plataforma = new THREE.Group();

        const altarMaterial = new THREE.MeshStandardMaterial({
            color: 0x8C5A2B,
            roughness: 0.8
        });

        const escalon1Geometry = new THREE.BoxGeometry(7, 0.6, 4);
        const escalon1 = new THREE.Mesh(escalon1Geometry, altarMaterial);
        escalon1.position.set(0, 0.3, 0);
        escalon1.castShadow = true;
        escalon1.receiveShadow = true;
        this.plataforma.add(escalon1);

        const escalon2Geometry = new THREE.BoxGeometry(6, 0.6, 3.5);
        const escalon2 = new THREE.Mesh(escalon2Geometry, altarMaterial);
        escalon2.position.set(0, 0.9, -0.25);
        escalon2.castShadow = true;
        escalon2.receiveShadow = true;
        this.plataforma.add(escalon2);

        const escalon3Geometry = new THREE.BoxGeometry(5, 0.6, 3);
        const escalon3 = new THREE.Mesh(escalon3Geometry, altarMaterial);
        escalon3.position.set(0, 1.5, -0.5);
        escalon3.castShadow = true;
        escalon3.receiveShadow = true;
        this.plataforma.add(escalon3);

        const escalon4Geometry = new THREE.BoxGeometry(4.2, 0.6, 2.6);
        const escalon4 = new THREE.Mesh(escalon4Geometry, altarMaterial);
        escalon4.position.set(0, 2.1, -0.7);
        escalon4.castShadow = true;
        escalon4.receiveShadow = true;
        this.plataforma.add(escalon4);

        const escalon5Geometry = new THREE.BoxGeometry(3.5, 0.6, 2.2);
        const escalon5 = new THREE.Mesh(escalon5Geometry, altarMaterial);
        escalon5.position.set(0, 2.7, -0.9);
        escalon5.castShadow = true;
        escalon5.receiveShadow = true;
        this.plataforma.add(escalon5);

        const escalon6Geometry = new THREE.BoxGeometry(2.8, 0.6, 1.8);
        const escalon6 = new THREE.Mesh(escalon6Geometry, altarMaterial);
        escalon6.position.set(0, 3.3, -1.1);
        escalon6.castShadow = true;
        escalon6.receiveShadow = true;
        this.plataforma.add(escalon6);

        const escalon7Geometry = new THREE.BoxGeometry(2.1, 0.6, 1.4);
        const escalon7 = new THREE.Mesh(escalon7Geometry, altarMaterial);
        escalon7.position.set(0, 3.9, -1.3);
        escalon7.castShadow = true;
        escalon7.receiveShadow = true;
        this.plataforma.add(escalon7);
    }

    getObject() {
        return this.plataforma;
    }
}