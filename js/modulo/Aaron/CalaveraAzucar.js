import * as THREE from 'three';

export class CalaveraAzucar {

    constructor() {

        this.CalaveraAzucar = new THREE.Group();

        function crearTexturaAzucar() {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = '#6e4327';
            ctx.fillRect(0, 0, 512, 512);

            for (let i = 0; i < 90000; i++) {
                const x = Math.random() * 512;
                const y = Math.random() * 512;
                const size = Math.random() * 2 + 0.5;
                const alpha = Math.random() * 0.35;

                ctx.fillStyle = Math.random() > 0.4
                    ? `rgba(240, 200, 150, ${alpha})`
                    : `rgba(40, 20, 10, ${alpha})`;

                ctx.fillRect(x, y, size, size);
            }

            const texture = new THREE.CanvasTexture(canvas);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(4, 4);
            texture.generateMipmaps = false;
            texture.minFilter = THREE.LinearFilter;

            return texture;
        }

        const texturaAzucar = crearTexturaAzucar();

        const azucarCafeMat = new THREE.MeshStandardMaterial({
            color: 0x5a3825,
            roughness: 0.85,
            metalness: 0.05,
            map: texturaAzucar,
            bumpMap: texturaAzucar,
            bumpScale: 0.06
        });

        const betunBlanco = new THREE.MeshStandardMaterial({
            color: 0xfff8dc,
            roughness: 0.3
        });

        const betunNegro = new THREE.MeshStandardMaterial({
            color: 0x111111,
            roughness: 0.5
        });

        const betunRosa = new THREE.MeshStandardMaterial({
            color: 0xf72585,
            roughness: 0.3
        });

        const betunNaranja = new THREE.MeshStandardMaterial({
            color: 0xff8500,
            roughness: 0.3
        });

        const betunAmarillo = new THREE.MeshStandardMaterial({
            color: 0xffd166,
            roughness: 0.3
        });

        const betunAzul = new THREE.MeshStandardMaterial({
            color: 0x118ab2,
            roughness: 0.3
        });

        const betunVerde = new THREE.MeshStandardMaterial({
            color: 0x06a77d,
            roughness: 0.3
        });

        const ofrenda = new THREE.Group();
        this.CalaveraAzucar.add(ofrenda);

        const centroCraneo = new THREE.Vector3(0, 3.2, 0);
        const radioCraneo = 3.0;

        function pegarAlCraneo(
            mesh,
            latitudDeg,
            longitudDeg,
            elevacionOffset = 0.05
        ) {
            const lat = THREE.MathUtils.degToRad(latitudDeg);
            const lon = THREE.MathUtils.degToRad(longitudDeg);

            const x = (radioCraneo + elevacionOffset)
                * Math.cos(lat) * Math.sin(lon);

            const y = (radioCraneo + elevacionOffset)
                * Math.sin(lat);

            const z = (radioCraneo + elevacionOffset)
                * Math.cos(lat) * Math.cos(lon);

            mesh.position.set(x, y, z).add(centroCraneo);

            const normal = new THREE.Vector3()
                .subVectors(mesh.position, centroCraneo)
                .normalize();

            mesh.quaternion.setFromUnitVectors(
                new THREE.Vector3(0, 0, 1),
                normal
            );

            mesh.castShadow = true;
            mesh.receiveShadow = true;

            ofrenda.add(mesh);

            return mesh;
        }

        // CRANEO

        const craneoGeo = new THREE.SphereGeometry(
            radioCraneo, 64, 64
        );

        const craneo = new THREE.Mesh(craneoGeo, azucarCafeMat);

        craneo.position.copy(centroCraneo);
        craneo.scale.set(1.0, 1.02, 1.0);
        craneo.castShadow = true;
        craneo.receiveShadow = true;

        ofrenda.add(craneo);

        // MANDIBULA

        const mandibulaGeo = new THREE.SphereGeometry(1.5, 32, 32);
        const mandibula = new THREE.Mesh(mandibulaGeo, azucarCafeMat);

        mandibula.position.set(0, 0.9, 0.4);
        mandibula.scale.set(1.1, 0.7, 0.85);
        mandibula.castShadow = true;
        mandibula.receiveShadow = true;

        ofrenda.add(mandibula);

        // OJOS

        function crearOjo(lat, lon) {

            const ojoGroup = new THREE.Group();

            const fondo = new THREE.Mesh(
                new THREE.CylinderGeometry(0.85, 0.85, 0.1, 32),
                betunNegro
            );

            fondo.rotation.x = Math.PI / 2;
            ojoGroup.add(fondo);

            const centro = new THREE.Mesh(
                new THREE.SphereGeometry(0.2, 16, 16),
                betunAmarillo
            );

            centro.position.z = 0.08;
            ojoGroup.add(centro);

            for (let i = 0; i < 8; i++) {
                const ang = (i / 8) * Math.PI * 2;

                const petalo = new THREE.Mesh(
                    new THREE.SphereGeometry(0.15, 16, 16),
                    betunNaranja
                );

                petalo.scale.set(1, 1, 0.4);

                petalo.position.set(
                    Math.cos(ang) * 0.38,
                    Math.sin(ang) * 0.38,
                    0.08
                );

                ojoGroup.add(petalo);
            }

            for (let i = 0; i < 12; i++) {
                const ang = (i / 12) * Math.PI * 2;

                const punto = new THREE.Mesh(
                    new THREE.SphereGeometry(0.1, 12, 12),
                    i % 2 === 0 ? betunRosa : betunAmarillo
                );

                punto.position.set(
                    Math.cos(ang) * 1.05,
                    Math.sin(ang) * 1.05,
                    0.05
                );

                ojoGroup.add(punto);
            }

            pegarAlCraneo(ojoGroup, lat, lon, 0.02);
        }

        crearOjo(8, -25);
        crearOjo(8, 25);

        // NARIZ

        const narizGroup = new THREE.Group();

        const narizMesh = new THREE.Mesh(
            new THREE.ConeGeometry(0.35, 0.6, 3),
            betunNegro
        );

        narizMesh.rotation.x = Math.PI / 2;
        narizMesh.rotation.z = Math.PI;
        narizMesh.scale.set(1, 0.3, 1);

        narizGroup.add(narizMesh);

        pegarAlCraneo(narizGroup, -12, 0, 0.05);

        // FLORES

        function crearFlorPegada(lat, lon, colorPetalos) {

            const florGroup = new THREE.Group();

            const centro = new THREE.Mesh(
                new THREE.SphereGeometry(0.18, 16, 16),
                betunAmarillo
            );

            centro.scale.z = 0.4;
            florGroup.add(centro);

            for (let i = 0; i < 6; i++) {
                const ang = (i / 6) * Math.PI * 2;

                const petalo = new THREE.Mesh(
                    new THREE.SphereGeometry(0.16, 16, 16),
                    colorPetalos
                );

                petalo.scale.z = 0.4;

                petalo.position.set(
                    Math.cos(ang) * 0.32,
                    Math.sin(ang) * 0.32,
                    0
                );

                florGroup.add(petalo);
            }

            pegarAlCraneo(florGroup, lat, lon, 0.03);
        }

        crearFlorPegada(38, 0, betunRosa);
        crearFlorPegada(32, -30, betunAzul);
        crearFlorPegada(32, 30, betunVerde);

        // PUNTOS DECORATIVOS DEL CRANEO

        const puntosFrente = [
            { lat: 48, lon: -15, color: betunNaranja },
            { lat: 48, lon: 15, color: betunNaranja },
            { lat: 25, lon: -48, color: betunRosa },
            { lat: 25, lon: 48, color: betunRosa },
            { lat: -5, lon: -48, color: betunAzul },
            { lat: -5, lon: 48, color: betunAzul }
        ];

        puntosFrente.forEach(p => {
            const punto = new THREE.Mesh(
                new THREE.SphereGeometry(0.12, 12, 12),
                p.color
            );

            punto.scale.z = 0.5;

            pegarAlCraneo(punto, p.lat, p.lon, 0.03);
        });

        // BOCA Y DIENTES

        const bocaGroup = new THREE.Group();

        const lineaBoca = new THREE.Mesh(
            new THREE.BoxGeometry(2.4, 0.1, 0.1),
            betunNegro
        );

        bocaGroup.add(lineaBoca);

        for (let i = 0; i < 8; i++) {
            const diente = new THREE.Mesh(
                new THREE.BoxGeometry(0.2, 0.42, 0.15),
                betunBlanco
            );

            diente.position.set(-0.875 + i * 0.25, 0, 0.05);

            bocaGroup.add(diente);
        }

        pegarAlCraneo(bocaGroup, -30, 0, 0.08);

        // ILUMINACION

        const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.1);
        this.CalaveraAzucar.add(luzAmbiente);

        const luzPrincipal = new THREE.DirectionalLight(0xffffff, 0.1);

        luzPrincipal.position.set(5, 10, 8);
        luzPrincipal.castShadow = true;
        luzPrincipal.shadow.mapSize.set(2048, 2048);

        this.CalaveraAzucar.add(luzPrincipal);

        const luzCalida = new THREE.PointLight(0xff9933, 1.5, 5);

        luzCalida.position.set(0, 5, 8);

        this.CalaveraAzucar.add(luzCalida);

    }

    getObject() {
        return this.CalaveraAzucar;
    }
}