import * as THREE from 'three';

export class mole {
    constructor() {
        this.ofrenda = new THREE.Group();

        // Materiales y geometría base del recipiente de mole
        const points = [
            new THREE.Vector2(0, 0),
            new THREE.Vector2(1.2, 0.05),
            new THREE.Vector2(1.8, 0.3),
            new THREE.Vector2(2.1, 0.7),
            new THREE.Vector2(2.35, 1.1),    
            new THREE.Vector2(2.45, 1.15),  
            new THREE.Vector2(2.30, 1.05),  
            new THREE.Vector2(2.0, 0.7),    
            new THREE.Vector2(0, 0.6)       
        ];

        const potGeometry = new THREE.LatheGeometry(points, 32);
        
        const potMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x9e4318,              
            roughness: 0.25,
            metalness: 0.05,
            clearcoat: 0.8,                 
            clearcoatRoughness: 0.15,
        });

        const pot = new THREE.Mesh(potGeometry, potMaterial);
        pot.castShadow = true;
        pot.receiveShadow = true;
        this.ofrenda.add(pot);

        for (let i = 0; i < 2; i++) {
            const handleGeom = new THREE.TorusGeometry(0.35, 0.09, 16, 32, Math.PI);
            const handle = new THREE.Mesh(handleGeom, potMaterial);
            const angle = i * Math.PI;
            handle.position.set(Math.cos(angle) * 2.25, 0.8, Math.sin(angle) * 2.25);
            handle.rotation.y = angle + Math.PI / 2;
            handle.rotation.x = -Math.PI / 6;
            handle.castShadow = true;
            this.ofrenda.add(handle);
        }

        const moleGeometry = new THREE.CylinderGeometry(2.05, 1.95, 0.15, 32);
        const moleMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x241107,              
            roughness: 0.3,
            metalness: 0.0,
            clearcoat: 0.5,               
            clearcoatRoughness: 0.2
        });
        const moleMesh = new THREE.Mesh(moleGeometry, moleMaterial);
        moleMesh.position.y = 0.78;
        this.ofrenda.add(moleMesh);

        const moleChickenMaterial = new THREE.MeshStandardMaterial({
            color: 0x31170a,              
            roughness: 0.4
        });

        const boneMaterial = new THREE.MeshStandardMaterial({
            color: 0xe6dfd3,              
            roughness: 0.6
        });

        function createChickenLeg(px, pz, rotY, rotZ) {
            const legGroup = new THREE.Group();

            const boneGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 12);
            const bone = new THREE.Mesh(boneGeom, boneMaterial);
            bone.position.y = 0.3;
            bone.castShadow = true;
            legGroup.add(bone);

            const boneJointGeom = new THREE.SphereGeometry(0.06, 12, 12);
            const joint1 = new THREE.Mesh(boneJointGeom, boneMaterial);
            joint1.position.set(0.03, 0.58, 0);
            const joint2 = new THREE.Mesh(boneJointGeom, boneMaterial);
            joint2.position.set(-0.03, 0.58, 0);
            legGroup.add(joint1);
            legGroup.add(joint2);

            const meatGeom = new THREE.SphereGeometry(0.38, 24, 24);
            meatGeom.scale(1, 1.4, 0.85);
            const meat = new THREE.Mesh(meatGeom, moleChickenMaterial);
            meat.position.y = 0.05;
            meat.castShadow = true;
            legGroup.add(meat);

            legGroup.position.set(px, 0.82, pz);
            legGroup.rotation.set(0.4, rotY, rotZ);
            return legGroup;
        }

        this.ofrenda.add(createChickenLeg(-0.6, -0.2, 0.5, -0.6));
        this.ofrenda.add(createChickenLeg(0.5, 0.3, -1.2, 0.7));
        this.ofrenda.add(createChickenLeg(-0.1, 0.5, 2.1, -0.5));

        const sesameGeom = new THREE.ConeGeometry(0.018, 0.04, 8);
        sesameGeom.scale(1, 1, 0.5);
        const sesameMat = new THREE.MeshStandardMaterial({ color: 0xf5eedc, roughness: 0.6 });

        const sesameCount = 120;
        const sesameInstanced = new THREE.InstancedMesh(sesameGeom, sesameMat, sesameCount);
        const dummy = new THREE.Object3D();

        for (let i = 0; i < sesameCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 1.7;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = (radius < 1.0 && Math.random() > 0.4) ? 0.92 : 0.86;

            dummy.position.set(x, y, z);
            dummy.rotation.set(Math.PI / 2 + (Math.random() - 0.5) * 0.4, Math.random() * Math.PI, 0);
            dummy.updateMatrix();
            sesameInstanced.setMatrixAt(i, dummy.matrix);
        }

        sesameInstanced.castShadow = true;
        this.ofrenda.add(sesameInstanced);
    }

    getObject() {
        return this.ofrenda;
    }
}