import * as THREE from 'three';

export class naranjas {
    constructor() {
        this.naranjas = new THREE.Group();

        // Geometría y material del tazón (Base tipo cilindro)
        const tazonGeometry = new THREE.CylinderGeometry(1.2, 0.8, 0.6, 16);
        const tazonMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.8 });
        const tazon = new THREE.Mesh(tazonGeometry, tazonMaterial);
        tazon.position.y = 0.3;
        tazon.castShadow = true;
        tazon.receiveShadow = true;
        this.naranjas.add(tazon);

        // Geometría y material compartido para las frutas
        const naranjaGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const naranjaMaterial = new THREE.MeshStandardMaterial({ color: 0xff8c00, roughness: 0.4 });

        // Naranja 1 (Centro arriba)
        const naranja1 = new THREE.Mesh(naranjaGeometry, naranjaMaterial);
        naranja1.position.set(0, 0.7, 0);
        naranja1.castShadow = true;
        naranja1.receiveShadow = true;
        this.naranjas.add(naranja1);

        // Naranja 2 (Frente derecha)
        const naranja2 = new THREE.Mesh(naranjaGeometry, naranjaMaterial);
        naranja2.position.set(0.4, 0.6, 0.4);
        naranja2.castShadow = true;
        naranja2.receiveShadow = true;
        this.naranjas.add(naranja2);

        // Naranja 3 (Frente izquierda)
        const naranja3 = new THREE.Mesh(naranjaGeometry, naranjaMaterial);
        naranja3.position.set(-0.4, 0.6, 0.3);
        naranja3.castShadow = true;
        naranja3.receiveShadow = true;
        this.naranjas.add(naranja3);

        // Naranja 4 (Atrás derecha)
        const naranja4 = new THREE.Mesh(naranjaGeometry, naranjaMaterial);
        naranja4.position.set(0.3, 0.6, -0.4);
        naranja4.castShadow = true;
        naranja4.receiveShadow = true;
        this.naranjas.add(naranja4);

        // Naranja 5 (Atrás izquierda)
        const naranja5 = new THREE.Mesh(naranjaGeometry, naranjaMaterial);
        naranja5.position.set(-0.3, 0.6, -0.4);
        naranja5.castShadow = true;
        naranja5.receiveShadow = true;
        this.naranjas.add(naranja5);
    }

    getObject() {
        return this.naranjas;
    }
}