import * as THREE from 'three';

export class platanos {
    constructor() {
        this.ofrenda = new THREE.Group();

        // 1. Manzana
        function createAppleTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            const grad = ctx.createLinearGradient(0, 0, 0, 512);
            grad.addColorStop(0, '#8b0000');
            grad.addColorStop(0.2, '#d90429');
            grad.addColorStop(0.75, '#ef233c');
            grad.addColorStop(0.95, '#ccff33');
            grad.addColorStop(1.0, '#70e000');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 512, 512);

            for (let i = 0; i < 120; i++) {
                const x = Math.random() * 512;
                ctx.fillStyle = 'rgba(255, 200, 80, 0.08)';
                ctx.fillRect(x, 0, Math.random() * 6 + 2, 512);
            }

            ctx.fillStyle = 'rgba(255, 235, 180, 0.35)';
            for (let i = 0; i < 1500; i++) {
                const x = Math.random() * 512;
                const y = Math.random() * 512;
                ctx.beginPath();
                ctx.arc(x, y, Math.random() * 1.2, 0, Math.PI * 2);
                ctx.fill();
            }

            return new THREE.CanvasTexture(canvas);
        }

        function createApple(x, z) {
            const appleGroup = new THREE.Group();
            const points = [
                new THREE.Vector2(0.01, 0.42),
                new THREE.Vector2(0.12, 0.50),
                new THREE.Vector2(0.35, 0.58),
                new THREE.Vector2(0.60, 0.45),
                new THREE.Vector2(0.68, 0.15),
                new THREE.Vector2(0.65, -0.15),
                new THREE.Vector2(0.52, -0.42),
                new THREE.Vector2(0.25, -0.55),
                new THREE.Vector2(0.08, -0.52),
                new THREE.Vector2(0.01, -0.48)
            ];

            const bodyGeom = new THREE.LatheGeometry(points, 64);
            const pos = bodyGeom.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                let vx = pos.getX(i);
                let vy = pos.getY(i);
                let vz = pos.getZ(i);

                const angle = Math.atan2(vz, vx);
                if (vy < -0.1) {
                    const bump = 1.0 + 0.03 * Math.sin(angle * 5);
                    vx *= bump;
                    vz *= bump;
                }
                pos.setXYZ(i, vx, vy, vz);
            }
            bodyGeom.computeVertexNormals();

            const bodyMat = new THREE.MeshPhysicalMaterial({
                map: createAppleTexture(),
                roughness: 0.2,
                metalness: 0.0,
                clearcoat: 1.0,                
                clearcoatRoughness: 0.1,
            });

            const body = new THREE.Mesh(bodyGeom, bodyMat);
            body.castShadow = true;
            body.receiveShadow = true;
            appleGroup.add(body);

            const stemCurve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 0.38, 0),
                new THREE.Vector3(0.03, 0.58, 0.02),
                new THREE.Vector3(0.07, 0.72, 0.05)
            ]);
            const stemGeom = new THREE.TubeGeometry(stemCurve, 12, 0.025, 8, false);
            const stemMat = new THREE.MeshStandardMaterial({ color: 0x3d2314, roughness: 0.9 });
            const stem = new THREE.Mesh(stemGeom, stemMat);
            stem.castShadow = true;
            appleGroup.add(stem);

            const leafShape = new THREE.Shape();
            leafShape.moveTo(0, 0);
            leafShape.quadraticCurveTo(0.15, 0.12, 0.35, 0);
            leafShape.quadraticCurveTo(0.15, -0.12, 0, 0);
            const leafGeom = new THREE.ShapeGeometry(leafShape, 12);
            const leafMat = new THREE.MeshStandardMaterial({ color: 0x2d5a27, roughness: 0.4, side: THREE.DoubleSide });
            const leaf = new THREE.Mesh(leafGeom, leafMat);
            leaf.position.set(0.03, 0.58, 0.02);
            leaf.rotation.set(-Math.PI / 4, 0.4, Math.PI / 6);
            leaf.castShadow = true;
            appleGroup.add(leaf);

            appleGroup.position.set(x, 0.55, z);
            return appleGroup;
        }

        // 2. Plátano
        function createBananaTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 128;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            const grad = ctx.createLinearGradient(0, 0, 0, 512);
            grad.addColorStop(0.0, '#3e4d1a');  
            grad.addColorStop(0.08, '#829e2e');  
            grad.addColorStop(0.18, '#f3cb14');  
            grad.addColorStop(0.85, '#eec010');  
            grad.addColorStop(0.95, '#5c4314');  
            grad.addColorStop(1.0, '#241704');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 128, 512);

            ctx.fillStyle = 'rgba(70, 45, 10, 0.4)';
            for (let i = 0; i < 180; i++) {
                const x = Math.random() * 128;
                const y = 80 + Math.random() * 380;
                ctx.beginPath();
                ctx.arc(x, y, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
                ctx.fill();
            }

            return new THREE.CanvasTexture(canvas);
        }

        function createBanana(x, z) {
            const bananaGroup = new THREE.Group();
            const height = 2.4;
            const geom = new THREE.CylinderGeometry(0.18, 0.18, height, 5, 48);
            const pos = geom.attributes.position;

            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(-0.85, 0.38, 0),   
                new THREE.Vector3(-0.25, -0.02, 0),  
                new THREE.Vector3(0.25, 0.03, 0),    
                new THREE.Vector3(0.65, 0.22, 0),    
                new THREE.Vector3(0.82, 0.34, 0)     
            ]);

            const dummy = new THREE.Object3D();
            const up = new THREE.Vector3(0, 1, 0);

            for (let i = 0; i < pos.count; i++) {
                let vx = pos.getX(i);
                let vy = pos.getY(i);
                let vz = pos.getZ(i);

                let t = (vy + height / 2) / height;
                t = THREE.MathUtils.clamp(t, 0, 1);

                let rScale = 1.0;
                if (t < 0.08) {
                    rScale = THREE.MathUtils.lerp(0.2, 0.75, t / 0.08);
                } else if (t > 0.88) {
                    rScale = THREE.MathUtils.lerp(1.0, 0.35, (t - 0.88) / 0.12);
                } else {
                    const bodyT = (t - 0.08) / 0.80;
                    rScale = 0.75 + 0.35 * Math.sin(bodyT * Math.PI);
                }

                vx *= rScale;
                vz *= rScale;

                const point = curve.getPointAt(t);
                const tangent = curve.getTangentAt(t);

                dummy.position.set(0, 0, 0);
                dummy.quaternion.setFromUnitVectors(up, tangent);

                const offset = new THREE.Vector3(vx, 0, vz);
                offset.applyQuaternion(dummy.quaternion);

                pos.setXYZ(i, point.x + offset.x, point.y + offset.y, point.z + offset.z);
            }

            geom.computeVertexNormals();

            const bananaMat = new THREE.MeshStandardMaterial({
                map: createBananaTexture(),
                roughness: 0.45,
                metalness: 0.0,
            });

            const banana = new THREE.Mesh(geom, bananaMat);
            banana.castShadow = true;
            banana.receiveShadow = true;
            bananaGroup.add(banana);

            bananaGroup.rotation.z = 0.1;
            bananaGroup.rotation.y = Math.PI / 6;
            bananaGroup.position.set(x, 0.18, z);

            return bananaGroup;
        }

        // 3. Uvas
        function createGrapes(x, z) {
            const grapesGroup = new THREE.Group();
            const grapeMat = new THREE.MeshPhysicalMaterial({
                color: 0x4a154b,
                roughness: 0.35,
                metalness: 0.0,
                transmission: 0.2,
                clearcoat: 0.3,
                clearcoatRoughness: 0.4,
            });

            const grapeGeom = new THREE.SphereGeometry(0.14, 24, 24);
            grapeGeom.scale(1, 1.25, 1);

            const mainStemGeom = new THREE.CylinderGeometry(0.02, 0.03, 1.4, 8);
            const stemMat = new THREE.MeshStandardMaterial({ color: 0x4d3319, roughness: 0.9 });
            const mainStem = new THREE.Mesh(mainStemGeom, stemMat);
            mainStem.position.y = 0.5;
            mainStem.rotation.z = -0.15;
            grapesGroup.add(mainStem);

            const layers = [
                { y: 0.8, count: 7, radius: 0.32 },
                { y: 0.6, count: 8, radius: 0.38 },
                { y: 0.4, count: 6, radius: 0.30 },
                { y: 0.2, count: 4, radius: 0.22 },
                { y: 0.0, count: 2, radius: 0.12 },
                { y: -0.15, count: 1, radius: 0.02 }
            ];

            layers.forEach(layer => {
                for (let i = 0; i < layer.count; i++) {
                    const angle = (i / layer.count) * Math.PI * 2 + (Math.random() * 0.3);
                    const r = layer.radius + (Math.random() - 0.5) * 0.06;
                    
                    const gx = Math.cos(angle) * r;
                    const gy = layer.y + (Math.random() - 0.5) * 0.05;
                    const gz = Math.sin(angle) * r;

                    const grape = new THREE.Mesh(grapeGeom, grapeMat);
                    grape.position.set(gx, gy, gz);
                    grape.rotation.x = (Math.random() - 0.5) * 0.4;
                    grape.rotation.z = (Math.random() - 0.5) * 0.4;
                    grape.castShadow = true;
                    grape.receiveShadow = true;
                    
                    grapesGroup.add(grape);
                }
            });

            grapesGroup.position.set(x, 0.35, z);
            grapesGroup.rotation.z = 0.1;
            return grapesGroup;
        }

        // Añadimos todo al grupo principal de la clase
        this.ofrenda.add(createApple(-1.6, 0));
        this.ofrenda.add(createBanana(0, 0.2));
        this.ofrenda.add(createGrapes(1.6, -0.2));
    }

    getObject() {
        return this.ofrenda;
    }
}