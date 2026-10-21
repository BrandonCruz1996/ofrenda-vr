import * as THREE from 'three';

export class CaminoCempasuchil {
    constructor(config = {}) {
        this.caminoGrupo = new THREE.Group();

        // Parámetros opcionales personalizables
        const zInicio = config.zInicio !== undefined ? config.zInicio : 0.2;
        const zFin = config.zFin !== undefined ? config.zFin : 7.8;
        const pasos = config.pasos || 60;
        const mitadAncho = config.mitadAncho || 1.35;

        // --- PALETA DE PÉTALOS DE CEMPASÚCHIL ---
        const petalGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.005, 5);

        const petMatNaranja  = new THREE.MeshStandardMaterial({ color: 0xFF8C00, roughness: 0.6 });
        const petMatAmarillo = new THREE.MeshStandardMaterial({ color: 0xFFA500, roughness: 0.6 });
        const petMatDorado   = new THREE.MeshStandardMaterial({ color: 0xFFD700, roughness: 0.55 });

        const materiales = [petMatNaranja, petMatAmarillo, petMatDorado];

        // Función interna auxiliar para añadir pétalos al grupo local
        const addPetalo = (geom, mat, x, y, z, sx, sy, sz, ry) => {
            const mesh = new THREE.Mesh(geom, mat);
            mesh.position.set(x, y, z);
            mesh.scale.set(sx, sy, sz);
            mesh.rotation.y = ry;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            this.caminoGrupo.add(mesh);
            return mesh;
        };

        const puntosBordeIzq = [];
        const puntosBordeDer = [];

        // --- CAMINO EN S ALARGADO Y SIMÉTRICO ---
        for (let i = 0; i <= pasos; i++) {
            const t = i / pasos;
            const z = zInicio + t * (zFin - zInicio);

            const centroX = Math.sin(t * Math.PI * 2) * 1.5;
            const dx = Math.cos(t * Math.PI * 2) * 1.5 * (Math.PI * 2 / (zFin - zInicio));
            const normal = new THREE.Vector2(-1, dx).normalize();

            const xIzq = centroX + normal.x * mitadAncho;
            const zIzq = z + normal.y * mitadAncho;

            const xDer = centroX - normal.x * mitadAncho;
            const zDer = z - normal.y * mitadAncho;

            puntosBordeIzq.push([xIzq, zIzq]);
            puntosBordeDer.push([xDer, zDer]);

            const matIzq = materiales[i % materiales.length];
            const matDer = materiales[(i + 1) % materiales.length];

            addPetalo(petalGeo, matIzq, xIzq, 0.005, zIzq, 0.6, 1, 1.35, Math.random() * Math.PI);
            addPetalo(petalGeo, matDer, xDer, 0.005, zDer, 0.6, 1, 1.35, Math.random() * Math.PI);

            // Pocos pétalos centrales dispersos
            if (i % 6 === 0 && Math.random() > 0.35) {
                const offsetCentro = (Math.random() - 0.5) * (mitadAncho * 0.7);
                const matCentro = materiales[Math.floor(Math.random() * materiales.length)];
                addPetalo(
                    petalGeo,
                    matCentro,
                    centroX + normal.x * offsetCentro,
                    0.005,
                    z + normal.y * offsetCentro,
                    0.6,
                    1,
                    1.3,
                    Math.random() * Math.PI
                );
            }
        }

        // --- DENSIFICACIÓN EXTRA EN LAS ORILLAS ---
        const densificarOrillas = (puntos) => {
            puntos.forEach(([bx, bz]) => {
                const cantidadExtra = 8;
                for (let k = 0; k < cantidadExtra; k++) {
                    const mat = materiales[(k + Math.floor(Math.random() * 3)) % materiales.length];
                    const offsetX = (Math.random() - 0.5) * 0.28;
                    const offsetZ = (Math.random() - 0.5) * 0.2;
                    const sx = 0.5 + Math.random() * 0.3;
                    const sz = 1.0 + Math.random() * 0.45;
                    const ry = (Math.random() - 0.5) * Math.PI;

                    addPetalo(
                        petalGeo,
                        mat,
                        bx + offsetX,
                        0.005 + (k * 0.0006),
                        bz + offsetZ,
                        sx,
                        1,
                        sz,
                        ry
                    );
                }
            });
        };

        densificarOrillas(puntosBordeIzq);
        densificarOrillas(puntosBordeDer);

        // --- PÉTALOS SUELTOS ESPARCIDOS POR TODO EL PISO ---
        const totalPetalosPiso = 95;
        for (let p = 0; p < totalPetalosPiso; p++) {
            const px = (Math.random() - 0.5) * 17.0;
            const pz = (Math.random() - 0.5) * 17.0;

            const sobreCamino = (pz >= zInicio - 0.3 && pz <= zFin + 0.3 && px >= -2.6 && px <= 2.6);

            if (!sobreCamino) {
                const mat = materiales[Math.floor(Math.random() * materiales.length)];
                const sx = 0.45 + Math.random() * 0.25;
                const sz = 1.0 + Math.random() * 0.4;
                const ry = (Math.random() - 0.5) * Math.PI;

                addPetalo(
                    petalGeo,
                    mat,
                    px,
                    0.005,
                    pz,
                    sx,
                    1,
                    sz,
                    ry
                );
            }
        }
    }

    getObject() {
        return this.caminoGrupo;
    }
}