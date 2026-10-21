import * as THREE from 'three';

export class incienso {
    constructor() {
        this.ofrenda = new THREE.Group();

        // Material de barro negro brillante
        const ceramicMaterial = new THREE.MeshStandardMaterial({
            color: 0x0a0a0a,
            metalness: 0.1,
            roughness: 0.15,
        });

        // Perfil del copalero
        const points = [
            new THREE.Vector2(0, 0),         // Centro base
            new THREE.Vector2(0.8, 0),       // Borde base exterior
            new THREE.Vector2(0.75, 0.2),    // Curva base
            new THREE.Vector2(0.25, 0.8),    // Tallo inferior
            new THREE.Vector2(0.25, 1.2),    // Tallo superior
            new THREE.Vector2(0.9, 1.7),     // Copa exterior inferior
            new THREE.Vector2(1.05, 2.2),    // Borde superior exterior
            new THREE.Vector2(0.9, 2.2),     // Borde superior interior
            new THREE.Vector2(0.75, 1.8),    // Fondo interior copa
            new THREE.Vector2(0, 1.75)       // Centro interior copa
        ];
        
        const bodyGeom = new THREE.LatheGeometry(points, 32);
        const body = new THREE.Mesh(bodyGeom, ceramicMaterial);
        body.castShadow = true;
        body.receiveShadow = true;
        this.ofrenda.add(body);

        // Detalles: Protuberancias alrededor de la copa
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const knobGeom = new THREE.SphereGeometry(0.12, 16, 16);
            const knob = new THREE.Mesh(knobGeom, ceramicMaterial);
            knob.position.set(Math.cos(angle) * 1.0, 1.9, Math.sin(angle) * 1.0);
            knob.castShadow = true;
            this.ofrenda.add(knob);
        }

        // Fuego/Carbón (Copal ardiendo)
        const coalGeom = new THREE.ConeGeometry(0.3, 0.6, 16);
        this.coalMaterial = new THREE.MeshStandardMaterial({
            color: 0xffaa00,
            emissive: 0xff5500,
            emissiveIntensity: 2.0,
            roughness: 0.9,
        });
        const coal = new THREE.Mesh(coalGeom, this.coalMaterial);
        coal.position.y = 1.9;
        coal.castShadow = true;
        this.ofrenda.add(coal);

    }

    getObject() {
        return this.ofrenda;
    }
}