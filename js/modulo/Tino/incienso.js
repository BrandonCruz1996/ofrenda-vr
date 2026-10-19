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
        
        const bodyGeom = new THREE.LatheGeometry(points, 64);
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

        // Luz del fuego
        this.coalLight = new THREE.PointLight(0xff7700, 2.0, 1.5);
        this.coalLight.position.set(0, 2.1, 0);
        this.coalLight.castShadow = true;
        this.ofrenda.add(this.coalLight);

        // Humo
        const smokeCount = 300;
        const smokeGeom = new THREE.BufferGeometry();
        this.smokePositions = new Float32Array(smokeCount * 3);
        this.smokeData = [];

        for (let i = 0; i < smokeCount; i++) {
            const y = Math.random() * 2.5 + 2.2;
            const spread = (y - 2.2) * 0.25;
            const x = (Math.random() - 0.5) * spread;
            const z = (Math.random() - 0.5) * spread;

            this.smokePositions[i * 3] = x;
            this.smokePositions[i * 3 + 1] = y;
            this.smokePositions[i * 3 + 2] = z;

            this.smokeData.push({
                speed: 0.012 + Math.random() * 0.01,
                frequency: 1.5 + Math.random() * 2.0,
                amplitude: 0.003 + Math.random() * 0.004,
                phase: Math.random() * Math.PI * 2
            });
        }

        smokeGeom.setAttribute('position', new THREE.BufferAttribute(this.smokePositions, 3));

        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        grad.addColorStop(0.4, 'rgba(230, 230, 240, 0.3)');
        grad.addColorStop(1, 'rgba(200, 200, 200, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
        const smokeTexture = new THREE.CanvasTexture(canvas);

        const smokeMat = new THREE.PointsMaterial({
            map: smokeTexture,
            size: 0.25,
            transparent: true,
            opacity: 0.3,
            depthWrite: false,
            blending: THREE.NormalBlending
        });

        this.smokeParticles = new THREE.Points(smokeGeom, smokeMat);
        this.ofrenda.add(this.smokeParticles);
        this.smokeCount = smokeCount;
    }

    update(elapsedTime) {
        if (this.smokePositions && this.smokeData) {
            for (let i = 0; i < this.smokeCount; i++) {
                let idx = i * 3;
                let data = this.smokeData[i];

                this.smokePositions[idx + 1] += data.speed;
                this.smokePositions[idx] += Math.sin(elapsedTime * data.frequency + data.phase) * data.amplitude;
                this.smokePositions[idx + 2] += Math.cos(elapsedTime * data.frequency + data.phase) * data.amplitude;

                if (this.smokePositions[idx + 1] > 5.0) {
                    this.smokePositions[idx + 1] = 2.0;
                    this.smokePositions[idx] = (Math.random() - 0.5) * 0.1;
                    this.smokePositions[idx + 2] = (Math.random() - 0.5) * 0.1;
                }
            }
            this.smokeParticles.geometry.attributes.position.needsUpdate = true;
        }

        if (this.coalLight && this.coalMaterial) {
            const flicker = Math.sin(elapsedTime * 8) * 0.4 + Math.cos(elapsedTime * 18) * 0.2 + 0.5;
            this.coalLight.intensity = Math.max(1.0, flicker);
            this.coalMaterial.emissiveIntensity = flicker * 0.8;
        }
    }

    getObject() {
        return this.ofrenda;
    }
}