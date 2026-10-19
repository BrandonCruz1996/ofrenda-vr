import * as THREE from 'three';

export class botella {
    constructor() {
        this.ofrenda = new THREE.Group();

        const createBottle = () => {
            const bottleGroup = new THREE.Group();

            // Vectores ajustados: base ancha y cuello cónico largo
            const points = [
                new THREE.Vector2(0, 0),         
                new THREE.Vector2(1.05, 0),      
                new THREE.Vector2(1.15, 0.2),    
                new THREE.Vector2(1.15, 2.4),    // Fin del cuerpo ancho
                new THREE.Vector2(0.45, 4.0),    // Curva principal del cuello
                new THREE.Vector2(0.35, 4.5),    // Base de la boquilla
                new THREE.Vector2(0.38, 4.65),   // Anillo de retención
                new THREE.Vector2(0.34, 4.75),   // Borde superior
                new THREE.Vector2(0, 4.75)       
            ];

            const glassGeometry = new THREE.LatheGeometry(points, 64);

            // Material ajustado a tono ámbar oscuro
            const glassMaterial = new THREE.MeshPhysicalMaterial({
                color: 0x5e2c04,
                transparent: true,
                opacity: 0.85,
                roughness: 0.05,
                metalness: 0.0,
                transmission: 0.9,
                ior: 1.52,           
                thickness: 0.4,
                clearcoat: 1.0,            
                clearcoatRoughness: 0.05
            });

            const body = new THREE.Mesh(glassGeometry, glassMaterial);
            body.castShadow = true;
            body.receiveShadow = true;
            bottleGroup.add(body);

            // Corcholata dorada
            const capGeometry = new THREE.CylinderGeometry(0.36, 0.36, 0.2, 32);
            const capMaterial = new THREE.MeshStandardMaterial({
                color: 0xd4af37, 
                metalness: 0.85,
                roughness: 0.25,
            });
            const cap = new THREE.Mesh(capGeometry, capMaterial);
            cap.position.y = 4.78; 
            cap.castShadow = true;
            bottleGroup.add(cap);

            // Etiqueta
            const labelTexture = new THREE.TextureLoader().load('./texturas/etiqueta_corona.png');
            const labelGeometry = new THREE.CylinderGeometry(1.155, 1.155, 1.8, 64, 1, true, -Math.PI / 2, Math.PI);
            const labelMaterial = new THREE.MeshStandardMaterial({
                map: labelTexture,
                side: THREE.DoubleSide,
                transparent: true,
                roughness: 0.5,
                metalness: 0.0,
            });
            const label = new THREE.Mesh(labelGeometry, labelMaterial);
            label.position.y = 1.4;
            label.receiveShadow = true;
            bottleGroup.add(label);

            return bottleGroup;
        };

        const miBotella = createBottle();
        this.ofrenda.add(miBotella);
    }

    getObject() {
        return this.ofrenda;
    }
}