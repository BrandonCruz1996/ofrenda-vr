import * as THREE from 'three';

export class agua {
    constructor() {
        this.ofrenda = new THREE.Group();

        // Función auxiliar para crear la textura de la jícara
        const createJicaraTexture = (accentHex) => {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = '#4a2311';
            ctx.fillRect(0, 0, 512, 512);

            for (let i = 0; i < 5000; i++) {
                ctx.fillStyle = `rgba(210, 140, 90, ${Math.random() * 0.08})`;
                ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
            }

            ctx.strokeStyle = accentHex;
            ctx.lineWidth = 16;
            ctx.beginPath();
            ctx.arc(256, 256, 230, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            for (let a = 0; a < Math.PI * 2; a += Math.PI / 10) {
                const x = 256 + Math.cos(a) * 205;
                const y = 256 + Math.sin(a) * 205;
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, Math.PI * 2);
                ctx.fill();
            }

            return new THREE.CanvasTexture(canvas);
        };

        const createJicara = (x, z, accentColor = '#e63946') => {
            const jicaraGroup = new THREE.Group();

            // Anillo base
            const ringGeom = new THREE.TorusGeometry(0.38, 0.08, 16, 32);
            const ringMat = new THREE.MeshStandardMaterial({
                color: 0xc2a649,
                roughness: 0.9,
                metalness: 0.05,
            });
            const ring = new THREE.Mesh(ringGeom, ringMat);
            ring.rotation.x = Math.PI / 2;
            ring.position.y = 0.08;
            ring.castShadow = true;
            ring.receiveShadow = true;
            jicaraGroup.add(ring);

            // Cuerpo de la jícara
            const points = [
                new THREE.Vector2(0, 0.08),
                new THREE.Vector2(0.3, 0.1),
                new THREE.Vector2(0.68, 0.32),
                new THREE.Vector2(0.72, 0.65),
                new THREE.Vector2(0.7, 0.66),    
                new THREE.Vector2(0.65, 0.64),   
                new THREE.Vector2(0.58, 0.33),
                new THREE.Vector2(0, 0.15)      
            ];

            const bowlGeom = new THREE.LatheGeometry(points, 32);
            const bowlMat = new THREE.MeshPhysicalMaterial({
                map: createJicaraTexture(accentColor),
                roughness: 0.3,
                metalness: 0.05,
                clearcoat: 0.6,                     
                clearcoatRoughness: 0.2,
            });

            const bowl = new THREE.Mesh(bowlGeom, bowlMat);
            bowl.castShadow = true;
            bowl.receiveShadow = true;
            jicaraGroup.add(bowl);

            // Agua dentro de la jícara
            const waterGeom = new THREE.CylinderGeometry(0.64, 0.58, 0.32, 32, 8);
            const waterMat = new THREE.MeshPhysicalMaterial({
                color: 0x4ac5ee,
                transparent: true,
                opacity: 0.75,
                roughness: 0.02,
                metalness: 0.0,
                transmission: 0.9,                     
                ior: 1.333,                       
                thickness: 0.5,
                clearcoat: 1.0,
                clearcoatRoughness: 0.0,
            });

            const water = new THREE.Mesh(waterGeom, waterMat);
            water.position.y = 0.44;
            jicaraGroup.add(water);

            jicaraGroup.position.set(x, 0, z);
            return jicaraGroup;
        };

        // Creamos y agregamos las 3 jícaras al grupo principal de la clase
        this.ofrenda.add(createJicara(0, 0, '#e63946')); 
    }

    // Método obligatorio para que modulos.js pueda agregarlo a la escena
    getObject() {
        return this.ofrenda;
    }
}