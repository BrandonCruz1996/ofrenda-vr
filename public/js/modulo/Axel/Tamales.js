import * as THREE from 'three';

export class Tamales {
    constructor() {
        this.tam = new THREE.Group();

        // 1. Materiales compartidos
        const matPlatoBarro = new THREE.MeshStandardMaterial({
            color: 0xB8532F,
            roughness: 0.35,
            metalness: 0.05
        });

        const matHojaMaiz = new THREE.MeshStandardMaterial({
            color: 0xFFF2A3,
            roughness: 0.65
        });

        const matAmarreHebra = new THREE.MeshStandardMaterial({
            color: 0xA0522D,
            roughness: 0.7
        });

        const matHojaPlatano = new THREE.MeshStandardMaterial({
            color: 0x2A3D18,
            roughness: 0.35,
            metalness: 0.05
        });

        const matTiraPlatano = new THREE.MeshStandardMaterial({
            color: 0x1E2D12,
            roughness: 0.5
        });

        // 2. Geometrías compartidas (optimización de memoria)
        const fondoGeo = new THREE.CylinderGeometry(0.66, 0.48, 0.075, 32);
        const labioGeo = new THREE.TorusGeometry(0.68, 0.06, 16, 32);

        const cuerpoMaizGeo = new THREE.CylinderGeometry(0.11, 0.185, 0.51, 16);
        const costillaGeo = new THREE.CylinderGeometry(0.017, 0.017, 0.50, 8);
        const doblezGeo = new THREE.ConeGeometry(0.13, 0.12, 12);
        const amarreGeo = new THREE.TorusGeometry(0.135, 0.022, 8, 16);
        const nudoGeo = new THREE.SphereGeometry(0.033, 8, 8);

        const cuerpoOaxGeo = new THREE.BoxGeometry(0.51, 0.105, 0.345);
        const solapaGeo = new THREE.BoxGeometry(0.48, 0.022, 0.165);
        const tiraGeo = new THREE.BoxGeometry(0.055, 0.117, 0.354);

        // 3. Constructores de sub-ensamblajes
        const crearPlatoBarro = (x, z) => {
            const platoGrupo = new THREE.Group();

            const fondo = new THREE.Mesh(fondoGeo, matPlatoBarro);
            fondo.position.y = 0;
            fondo.castShadow = true;
            fondo.receiveShadow = true;
            platoGrupo.add(fondo);

            const labio = new THREE.Mesh(labioGeo, matPlatoBarro);
            labio.rotation.x = Math.PI / 2;
            labio.position.y = 0;
            labio.castShadow = true;
            labio.receiveShadow = true;
            platoGrupo.add(labio);

            platoGrupo.position.set(x, 0, z);
            return platoGrupo;
        };

        const crearTamalMaizDetallado = () => {
            const tamal = new THREE.Group();

            const cuerpo = new THREE.Mesh(cuerpoMaizGeo, matHojaMaiz);
            cuerpo.scale.set(1.15, 1.0, 0.7);
            cuerpo.castShadow = true;
            cuerpo.receiveShadow = true;
            tamal.add(cuerpo);

            for (let i = 0; i < 5; i++) {
                const costilla = new THREE.Mesh(costillaGeo, matHojaMaiz);
                const ang = (i / 5) * Math.PI * 2;
                costilla.position.set(Math.cos(ang) * 0.135, 0, Math.sin(ang) * 0.075);
                costilla.castShadow = true;
                tamal.add(costilla);
            }

            const doblez = new THREE.Mesh(doblezGeo, matHojaMaiz);
            doblez.position.y = 0.27;
            doblez.rotation.z = 0.3;
            doblez.scale.set(1.1, 0.6, 0.7);
            doblez.castShadow = true;
            tamal.add(doblez);

            const amarreTorus = new THREE.Mesh(amarreGeo, matAmarreHebra);
            amarreTorus.rotation.x = Math.PI / 2;
            amarreTorus.position.y = 0.12;
            amarreTorus.scale.set(1.15, 0.75, 1.0);
            amarreTorus.castShadow = true;
            tamal.add(amarreTorus);

            const nudo = new THREE.Mesh(nudoGeo, matAmarreHebra);
            nudo.position.set(0.15, 0.12, 0);
            nudo.castShadow = true;
            tamal.add(nudo);

            return tamal;
        };

        const crearTamalOaxaquenoDetallado = () => {
            const oax = new THREE.Group();

            const cuerpo = new THREE.Mesh(cuerpoOaxGeo, matHojaPlatano);
            cuerpo.castShadow = true;
            cuerpo.receiveShadow = true;
            oax.add(cuerpo);

            const solapa = new THREE.Mesh(solapaGeo, matHojaPlatano);
            solapa.position.set(0, 0.06, 0.045);
            solapa.rotation.y = 0.05;
            solapa.castShadow = true;
            oax.add(solapa);

            const tira = new THREE.Mesh(tiraGeo, matTiraPlatano);
            tira.castShadow = true;
            oax.add(tira);

            return oax;
        };

        // 4. Plato Izquierdo (Tamales de Maíz)
        this.tam.add(crearPlatoBarro(-0.9, 0));

        const t1 = crearTamalMaizDetallado();
        t1.position.set(-1.1, 0.28, 0);
        t1.rotation.set(0.12, 0.2, 0.3);
        this.tam.add(t1);

        const t2 = crearTamalMaizDetallado();
        t2.position.set(-0.7, 0.28, 0);
        t2.rotation.set(-0.08, -0.25, -0.28);
        this.tam.add(t2);

        const t3 = crearTamalMaizDetallado();
        t3.position.set(-0.9, 0.15, 0);
        t3.rotation.set(Math.PI / 2, 0.1, 0.45);
        this.tam.add(t3);

        // 5. Plato Derecho (Tamales Oaxaqueños)
        this.tam.add(crearPlatoBarro(0.9, 0));

        const oax1 = crearTamalOaxaquenoDetallado();
        oax1.position.set(0.88, 0.12, 0);
        oax1.rotation.y = 0.22;
        this.tam.add(oax1);

        const oax2 = crearTamalOaxaquenoDetallado();
        oax2.position.set(0.92, 0.23, 0);
        oax2.rotation.y = -0.32;
        this.tam.add(oax2);
    }

    getObject() {
        return this.tam;
    }
}