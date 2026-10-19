import * as THREE from 'three';

export class panM {
    constructor() {
        this.ofrenda = new THREE.Group();

        function createBreadBumpMap() {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = '#808080';
            ctx.fillRect(0, 0, 512, 512);

            for (let i = 0; i < 15000; i++) {
                const x = Math.random() * 512;
                const y = Math.random() * 512;
                const r = Math.random() * 1.5 + 0.5;
                const val = Math.floor(Math.random() * 90 + 80);
                ctx.fillStyle = `rgb(${val},${val},${val})`;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
            }

            const texture = new THREE.CanvasTexture(canvas);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(3, 3);
            return texture;
        }

        const breadBump = createBreadBumpMap();

        const breadMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xc47e3a,              
            roughness: 0.75,
            metalness: 0.0,
            bumpMap: breadBump,
            bumpScale: 0.015,
            clearcoat: 0.3,              
            clearcoatRoughness: 0.3,
        });

        const baseGeom = new THREE.SphereGeometry(1.2, 64, 64);
        const pos = baseGeom.attributes.position;

        for (let i = 0; i < pos.count; i++) {
            let vx = pos.getX(i);
            let vy = pos.getY(i);
            let vz = pos.getZ(i);

            if (vy < 0) {
                vy *= 0.15;
            } else {
                vy *= 0.62; 
            }

            const noise = (Math.sin(vx * 6) * Math.cos(vz * 6)) * 0.02;
            vx += noise;
            vz += noise;

            pos.setXYZ(i, vx, vy, vz);
        }
        baseGeom.computeVertexNormals();

        const base = new THREE.Mesh(baseGeom, breadMaterial);
        base.castShadow = true;
        base.receiveShadow = true;
        this.ofrenda.add(base);

        const angles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];

        angles.forEach((angle) => {
            const dirX = Math.cos(angle);
            const dirZ = Math.sin(angle);

            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(dirX * 0.05, 0.73, dirZ * 0.05),
                new THREE.Vector3(dirX * 0.45, 0.66, dirZ * 0.45),
                new THREE.Vector3(dirX * 0.85, 0.45, dirZ * 0.85),
                new THREE.Vector3(dirX * 1.15, 0.12, dirZ * 1.15)
            ]);

            const boneGeom = new THREE.TubeGeometry(curve, 24, 0.075, 16, false);
            const boneMesh = new THREE.Mesh(boneGeom, breadMaterial);
            boneMesh.castShadow = true;
            boneMesh.receiveShadow = true;
            this.ofrenda.add(boneMesh);

            const knobDistances = [0.45, 0.85, 1.15];
            knobDistances.forEach((d, index) => {
                const scaleFactor = index === 2 ? 0.11 : 0.095;
                const knobGeom = new THREE.SphereGeometry(scaleFactor, 16, 16);
                knobGeom.scale(1.2, 0.85, 1.2);
                const knob = new THREE.Mesh(knobGeom, breadMaterial);
                knob.position.set(dirX * d, 0.73 - d * 0.52, dirZ * d);
                knob.castShadow = true;
                knob.receiveShadow = true;
                this.ofrenda.add(knob);
            });
        });

        const ballGeom = new THREE.SphereGeometry(0.24, 32, 32);
        ballGeom.scale(1.1, 0.85, 1.1);
        const ball = new THREE.Mesh(ballGeom, breadMaterial);
        ball.position.set(0, 0.78, 0);
        ball.castShadow = true;
        ball.receiveShadow = true;
        this.ofrenda.add(ball);

        const sugarGeom = new THREE.DodecahedronGeometry(0.018);
        const sugarMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.15,
            metalness: 0.1,
            transparent: true,
            opacity: 0.92,
        });

        const sugarCount = 850;
        const sugarInstanced = new THREE.InstancedMesh(sugarGeom, sugarMat, sugarCount);
        const dummy = new THREE.Object3D();

        for (let i = 0; i < sugarCount; i++) {
            const u = Math.random();
            const v = Math.random() * Math.PI * 2;
            const rad = Math.sqrt(u) * 1.16;

            const sx = Math.cos(v) * rad;
            const sz = Math.sin(v) * rad;

            const distFromCenter = Math.sqrt(sx * sx + sz * sz);
            const surfaceY = 1.2 * 0.62 * Math.sqrt(
                Math.max(0, 1 - (distFromCenter * distFromCenter) / (1.2 * 1.2))
            );
            const scale = Math.random() * 0.85 + 0.55;
            const sugarRadius = 0.018 * scale;

            dummy.position.set(sx, surfaceY + sugarRadius + 0.004, sz);
            dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();

            sugarInstanced.setMatrixAt(i, dummy.matrix);
        }

        sugarInstanced.castShadow = true;
        this.ofrenda.add(sugarInstanced);
    }

    getObject() {
        return this.ofrenda;
    }
}