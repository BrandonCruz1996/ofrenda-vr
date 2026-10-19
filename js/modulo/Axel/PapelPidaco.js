import * as THREE from 'three';

export class PapelPicado {
    constructor(config = {}) {
        this.papel = new THREE.Group();

        // Posición y escala base opcionales
        const posX = config.x || 0;
        const posY = config.y || 0;
        const posZ = config.z || 0;
        const widthSpread = config.widthSpread || 2.2;
        const heightCenter = config.heightCenter || 4.16;

        // --- MATERIALES ---
        this.matRosaMexican    = new THREE.MeshStandardMaterial({ color: 0x8B004F, roughness: 0.6, side: THREE.DoubleSide });
        this.matMoradoObispo   = new THREE.MeshStandardMaterial({ color: 0x4B0082, roughness: 0.6, side: THREE.DoubleSide });
        this.matNaranjaCempa   = new THREE.MeshStandardMaterial({ color: 0xFF8C00, roughness: 0.6, side: THREE.DoubleSide });
        this.matAmarilloCalido = new THREE.MeshStandardMaterial({ color: 0xFFD700, roughness: 0.6, side: THREE.DoubleSide });
        this.matTerracota      = new THREE.MeshStandardMaterial({ color: 0xB8532F, roughness: 0.6, side: THREE.DoubleSide });
        this.matCorteBlanco    = new THREE.MeshStandardMaterial({ color: 0xF4EBD9, roughness: 0.5, side: THREE.DoubleSide });
        const hiloPicadoMat    = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.8 });

        // 1. Hilo horizontal superior con leve catenaria
        const hiloCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-widthSpread, heightCenter + 0.09, 0.5),
            new THREE.Vector3(0.0, heightCenter, 0.5),
            new THREE.Vector3(widthSpread, heightCenter + 0.09, 0.5)
        ]);
        const hiloPicado = new THREE.Mesh(new THREE.TubeGeometry(hiloCurve, 32, 0.012, 8, false), hiloPicadoMat);
        hiloPicado.castShadow = true;
        this.papel.add(hiloPicado);

        // 2. Geometrías base reutilizables
        this.papelGeo = new THREE.PlaneGeometry(0.68, 0.82);
        this.corteCentroGeo = new THREE.PlaneGeometry(0.18, 0.18);
        this.corteChicoGeo = new THREE.PlaneGeometry(0.065, 0.065);
        this.corteCircularGeo = new THREE.CircleGeometry(0.035, 12);
        this.flecoTrianguloGeo = new THREE.ConeGeometry(0.038, 0.08, 3);
        this.flecoTrianguloGeo.rotateZ(Math.PI);

        // --- CREAR BANDERAS EN TIRA ---
        const coloresTira = [
            this.matRosaMexican, 
            this.matMoradoObispo, 
            this.matNaranjaCempa, 
            this.matAmarilloCalido, 
            this.matTerracota
        ];

        const coordenadasX = [-1.6, -0.8, 0.0, 0.8, 1.6];
        const rotacionesZ = [0.03, 0.015, 0.0, -0.015, -0.03];
        const desnivelesY = [3.76, 3.73, 3.71, 3.73, 3.76];

        for (let i = 0; i < coordenadasX.length; i++) {
            this.crearBanderaDetallada(
                coloresTira[i], 
                coordenadasX[i], 
                desnivelesY[i], 
                0.5, 
                rotacionesZ[i]
            );
        }

        // Posicionar todo el grupo en la escena
        this.papel.position.set(posX, posY, posZ);
    }

    crearBanderaDetallada(materialColor, x, y, z, rotZ = 0) {
        const banderaGrupo = new THREE.Group();

        // Papel base rectangular
        const basePapel = new THREE.Mesh(this.papelGeo, materialColor);
        basePapel.castShadow = true;
        basePapel.receiveShadow = true;
        banderaGrupo.add(basePapel);

        // Calado central decorativo en diamante
        const cutCenter = new THREE.Mesh(this.corteCentroGeo, this.matCorteBlanco);
        cutCenter.position.set(0, 0.04, 0.003);
        cutCenter.rotation.z = Math.PI / 4;
        banderaGrupo.add(cutCenter);

        // Calados circulares laterales
        const cutCircIzq = new THREE.Mesh(this.corteCircularGeo, this.matCorteBlanco);
        cutCircIzq.position.set(-0.2, 0.04, 0.003);
        banderaGrupo.add(cutCircIzq);

        const cutCircDer = new THREE.Mesh(this.corteCircularGeo, this.matCorteBlanco);
        cutCircDer.position.set(0.2, 0.04, 0.003);
        banderaGrupo.add(cutCircDer);

        // Calados en las cuatro esquinas
        const esquinas = [
            [-0.22, 0.26],
            [0.22, 0.26],
            [-0.22, -0.18],
            [0.22, -0.18]
        ];

        esquinas.forEach(([ex, ey]) => {
            const cutCorner = new THREE.Mesh(this.corteChicoGeo, this.matCorteBlanco);
            cutCorner.position.set(ex, ey, 0.003);
            cutCorner.rotation.z = Math.PI / 4;
            banderaGrupo.add(cutCorner);
        });

        // Festón inferior dentado
        const numPicos = 7;
        for (let i = 0; i < numPicos; i++) {
            const pico = new THREE.Mesh(this.flecoTrianguloGeo, materialColor);
            const px = -0.27 + i * (0.54 / (numPicos - 1));
            pico.position.set(px, -0.44, 0);
            pico.castShadow = true;
            banderaGrupo.add(pico);
        }

        banderaGrupo.position.set(x, y, z);
        banderaGrupo.rotation.z = rotZ;
        banderaGrupo.rotation.x = 0.06; // Inclinación por gravedad
        this.papel.add(banderaGrupo);
    }

    getObject() {
        return this.papel;
    }
}