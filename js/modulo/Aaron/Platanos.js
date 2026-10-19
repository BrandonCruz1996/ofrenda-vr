
import * as THREE from 'three';

export class Platanos {

    constructor() {
        this.Platanos = new THREE.Group();

        this.crearPlatano(0, 0, 0);
        this.crearPlatano(0.2,0.2);
        this.crearPlatano(-0.2,0.3);
    }

    // =========================
    // TEXTURA DEL PLÁTANO
    // =========================
    crearTexturaPlatano() {
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

    // =========================
    // PLÁTANO
    // =========================
    crearPlatano(x, z) {
        const platanoGroup = new THREE.Group();

        const height = 2.4;

        const geom = new THREE.CylinderGeometry(
            0.18, 0.18, height, 5, 48
        );

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

            // Grosor variable
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

            pos.setXYZ(
                i,
                point.x + offset.x,
                point.y + offset.y,
                point.z + offset.z
            );
        }

        geom.computeVertexNormals();

        const bananaMat = new THREE.MeshStandardMaterial({
            map: this.crearTexturaPlatano(),
            roughness: 0.45,
            metalness: 0.0
        });

        const banana = new THREE.Mesh(geom, bananaMat);
        banana.castShadow = true;
        banana.receiveShadow = true;
        platanoGroup.add(banana);

        // Colocar tumbado
        platanoGroup.rotation.z = 0.1;
        platanoGroup.rotation.y = Math.PI / 6;
        platanoGroup.position.set(x, 0.18, z);

        this.Platanos.add(platanoGroup);
    }

}
