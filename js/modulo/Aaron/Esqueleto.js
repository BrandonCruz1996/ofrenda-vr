
import * as THREE from 'three';

export class Esqueleto {

    constructor() {

        // Grupo principal de la instancia
        this.Esqueleto = new THREE.Group();

        // Materiales
        this.huesoMat = new THREE.MeshStandardMaterial({
            color: 0xe3dac9,
            roughness: 0.55,
            metalness: 0.02
        });

        this.betunBlanco = new THREE.MeshStandardMaterial({
            color: 0xfff8dc,
            roughness: 0.3
        });

        this.betunNegro = new THREE.MeshStandardMaterial({
            color: 0x111111,
            roughness: 0.5
        });

        this.betunRosa = new THREE.MeshStandardMaterial({
            color: 0xf72585,
            roughness: 0.3
        });

        this.betunNaranja = new THREE.MeshStandardMaterial({
            color: 0xff8500,
            roughness: 0.3
        });

        this.betunAmarillo = new THREE.MeshStandardMaterial({
            color: 0xffd166,
            roughness: 0.3
        });

        this.betunAzul = new THREE.MeshStandardMaterial({
            color: 0x118ab2,
            roughness: 0.3
        });

        this.betunVerde = new THREE.MeshStandardMaterial({
            color: 0x06a77d,
            roughness: 0.3
        });

        // Construcción del esqueleto
        this.crearCabeza();
        this.crearColumna();
        this.crearTorax();
        this.crearPelvis();
        this.crearBrazos();
        this.crearPiernas();
    }

    // HUESOS LARGOS

    crearHuesoLargo(largo, radioInicio, radioFin) {

        const grupo = new THREE.Group();

        const cuerpo = new THREE.Mesh(
            new THREE.CylinderGeometry(
                radioFin,
                radioInicio,
                largo,
                16
            ),
            this.huesoMat
        );

        cuerpo.position.y = -largo / 2;
        cuerpo.castShadow = true;
        cuerpo.receiveShadow = true;
        grupo.add(cuerpo);

        const extSuperior = new THREE.Mesh(
            new THREE.SphereGeometry(
                radioInicio * 1.3,
                16,
                16
            ),
            this.huesoMat
        );

        extSuperior.castShadow = true;
        grupo.add(extSuperior);

        const extInferior = new THREE.Mesh(
            new THREE.SphereGeometry(
                radioFin * 1.3,
                16,
                16
            ),
            this.huesoMat
        );

        extInferior.position.y = -largo;
        extInferior.castShadow = true;
        grupo.add(extInferior);

        return grupo;
    }

    // A. CABEZA Y ROSTRO

    crearCabeza() {

        this.cabeza = new THREE.Group();

        // Cráneo
        const craneo = new THREE.Mesh(
            new THREE.SphereGeometry(0.7, 32, 32),
            this.huesoMat
        );

        craneo.scale.set(1, 1.05, 1.05);
        craneo.castShadow = true;
        craneo.receiveShadow = true;
        this.cabeza.add(craneo);

        // Mandíbula
        const mandibula = new THREE.Mesh(
            new THREE.BoxGeometry(0.58, 0.38, 0.58),
            this.huesoMat
        );

        mandibula.position.set(0, -0.45, 0.08);
        mandibula.castShadow = true;
        this.cabeza.add(mandibula);

        // Ojos decorados
        this.crearOjoDecorado(8, -25);
        this.crearOjoDecorado(8, 25);

        // Nariz
        const narizGroup = new THREE.Group();

        const narizMesh = new THREE.Mesh(
            new THREE.ConeGeometry(0.08, 0.16, 3),
            this.betunNegro
        );

        narizMesh.rotation.x = Math.PI / 2;
        narizMesh.rotation.z = Math.PI;
        narizGroup.add(narizMesh);

        this.pegarAlRostro(narizGroup, -10, 0, 0.02);

        // Flores de la frente
        this.crearFlorFrente(36, 0, this.betunRosa);
        this.crearFlorFrente(30, -28, this.betunAzul);
        this.crearFlorFrente(30, 28, this.betunVerde);

        // Boca
        const bocaGroup = new THREE.Group();

        const lineaBoca = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.02, 0.02),
            this.betunNegro
        );

        bocaGroup.add(lineaBoca);

        for (let i = 0; i < 6; i++) {

            const diente = new THREE.Mesh(
                new THREE.BoxGeometry(0.05, 0.09, 0.03),
                this.betunBlanco
            );

            diente.position.set(-0.18 + i * 0.07, 0, 0.01);
            bocaGroup.add(diente);
        }

        this.pegarAlRostro(bocaGroup, -28, 0, 0.03);

        // Posición de la cabeza
        this.cabeza.position.set(0, 7.1, 0);

        this.Esqueleto.add(this.cabeza);
    }

    // Coloca una pieza sobre la superficie del cráneo
    pegarAlRostro(mesh, latitudDeg, longitudDeg, elevacion = 0.02) {

        const radio = 0.7 + elevacion;

        const lat = THREE.MathUtils.degToRad(latitudDeg);
        const lon = THREE.MathUtils.degToRad(longitudDeg);

        mesh.position.x =
            radio * Math.cos(lat) * Math.sin(lon);

        mesh.position.y =
            radio * Math.sin(lat);

        mesh.position.z =
            radio * Math.cos(lat) * Math.cos(lon);

        const normal = mesh.position.clone().normalize();

        mesh.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 0, 1),
            normal
        );

        this.cabeza.add(mesh);
    }

    // Ojos con pétalos de colores
    crearOjoDecorado(lat, lon) {

        const ojoGroup = new THREE.Group();

        const fondo = new THREE.Mesh(
            new THREE.CylinderGeometry(0.2, 0.2, 0.02, 24),
            this.betunNegro
        );

        fondo.rotation.x = Math.PI / 2;
        ojoGroup.add(fondo);

        const centro = new THREE.Mesh(
            new THREE.SphereGeometry(0.05, 12, 12),
            this.betunAmarillo
        );

        centro.position.z = 0.02;
        ojoGroup.add(centro);

        for (let i = 0; i < 10; i++) {

            const ang = (i / 10) * Math.PI * 2;

            const color =
                i % 2 === 0
                    ? this.betunRosa
                    : this.betunNaranja;

            const petalo = new THREE.Mesh(
                new THREE.SphereGeometry(0.04, 10, 10),
                color
            );

            petalo.position.set(
                Math.cos(ang) * 0.22,
                Math.sin(ang) * 0.22,
                0.01
            );

            ojoGroup.add(petalo);
        }

        this.pegarAlRostro(ojoGroup, lat, lon, 0.01);
    }

    // Flores decorativas de la frente
    crearFlorFrente(lat, lon, color) {

        const flor = new THREE.Group();

        const centro = new THREE.Mesh(
            new THREE.SphereGeometry(0.05, 10, 10),
            this.betunAmarillo
        );

        flor.add(centro);

        for (let i = 0; i < 6; i++) {

            const ang = (i / 6) * Math.PI * 2;

            const petalo = new THREE.Mesh(
                new THREE.SphereGeometry(0.04, 10, 10),
                color
            );

            petalo.position.set(
                Math.cos(ang) * 0.08,
                Math.sin(ang) * 0.08,
                0
            );

            flor.add(petalo);
        }

        this.pegarAlRostro(flor, lat, lon, 0.02);
    }

    // B. COLUMNA VERTEBRAL

    crearColumna() {

        this.columna = new THREE.Group();

        const numVertebras = 22;
        const altoVertebra = 0.13;
        const inicioY = 6.6;

        for (let i = 0; i < numVertebras; i++) {

            const vertebra = new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.16,
                    0.16,
                    altoVertebra,
                    16
                ),
                this.huesoMat
            );

            vertebra.position.y = inicioY - (i * 0.11);
            vertebra.castShadow = true;
            vertebra.receiveShadow = true;

            this.columna.add(vertebra);
        }

        this.Esqueleto.add(this.columna);
    }

    // C. CAJA TORÁCICA Y CLAVÍCULAS

    crearTorax() {

        this.torax = new THREE.Group();

        // Esternón
        const esternonGrupo = new THREE.Group();

        const manubrio = new THREE.Mesh(
            new THREE.BoxGeometry(0.24, 0.28, 0),
            this.huesoMat
        );

        manubrio.position.set(0, 6.0, 0.65);
        manubrio.castShadow = true;

        const cuerpoEsternon = new THREE.Mesh(
            new THREE.BoxGeometry(0.22, 1.3, 0.1),
            this.huesoMat
        );

        cuerpoEsternon.position.set(0, 5.3, 0.65);
        cuerpoEsternon.castShadow = true;

        esternonGrupo.add(manubrio, cuerpoEsternon);
        this.torax.add(esternonGrupo);

        // Costillas
        for (let i = 0; i < 8; i++) {

            const radioCostilla =
                0.75 - (Math.abs(i - 3) * 0.05);

            const altura = 6.3 - (i * 0.16);

            const costillaIzq = this.crearCostillaAnatomica(
                radioCostilla,
                0.65,
                0.15
            );

            costillaIzq.position.set(-0.05, altura, 0.05);
            costillaIzq.castShadow = true;
            costillaIzq.receiveShadow = true;
            this.torax.add(costillaIzq);

            const costillaDer = this.crearCostillaAnatomica(
                radioCostilla,
                0.65,
                0.15
            );

            costillaDer.scale.x = -1;
            costillaDer.position.set(0.05, altura, 0.05);
            costillaDer.castShadow = true;
            costillaDer.receiveShadow = true;
            this.torax.add(costillaDer);
        }

        // Clavículas
        this.torax.add(this.crearClaviculaAnatomica(1));
        this.torax.add(this.crearClaviculaAnatomica(-1));

        this.Esqueleto.add(this.torax);
    }

    crearCostillaAnatomica(radioX, radioZ, caidaY, grosor = 0.045) {

        const puntos = [];
        const segmentos = 20;

        for (let i = 0; i <= segmentos; i++) {

            const t = i / segmentos;
            const angulo = t * Math.PI * 0.88;

            const x = -Math.sin(angulo) * radioX;

            const z =
                -Math.cos(angulo) * radioZ +
                (radioZ * 0.55);

            const y = -Math.pow(t, 1.2) * caidaY;

            puntos.push(new THREE.Vector3(x, y, z));
        }

        const curva = new THREE.CatmullRomCurve3(puntos);

        const geometria = new THREE.TubeGeometry(
            curva,
            20,
            grosor,
            8,
            false
        );

        return new THREE.Mesh(geometria, this.huesoMat);
    }

    crearClaviculaAnatomica(lado) {

        const pInicio = new THREE.Vector3(0, 6.0, 0.62);

        const pMedio = new THREE.Vector3(
            lado * 0.45,
            6.05,
            0.35
        );

        const pFin = new THREE.Vector3(
            lado * 0.95,
            6.0,
            0
        );

        const curva = new THREE.CatmullRomCurve3([
            pInicio,
            pMedio,
            pFin
        ]);

        const geometria = new THREE.TubeGeometry(
            curva,
            12,
            0.05,
            8,
            false
        );

        const clavicula = new THREE.Mesh(
            geometria,
            this.huesoMat
        );

        clavicula.castShadow = true;
        clavicula.receiveShadow = true;

        return clavicula;
    }

    // D. PELVIS

    crearPelvis() {

        this.pelvis = new THREE.Group();
        this.pelvis.position.y = 4.3;

        const centroPelvis = new THREE.Mesh(
            new THREE.SphereGeometry(0.35, 16, 16),
            this.huesoMat
        );

        centroPelvis.castShadow = true;
        centroPelvis.receiveShadow = true;
        this.pelvis.add(centroPelvis);

        const ilionIzq = new THREE.Mesh(
            new THREE.SphereGeometry(0.55, 16, 16),
            this.huesoMat
        );

        ilionIzq.scale.set(0.4, 0.85, 0.85);
        ilionIzq.position.set(-0.4, 0.1, 0);
        ilionIzq.castShadow = true;
        ilionIzq.receiveShadow = true;

        this.pelvis.add(ilionIzq);

        const ilionDer = ilionIzq.clone();
        ilionDer.position.x = 0.4;

        this.pelvis.add(ilionDer);

        this.Esqueleto.add(this.pelvis);
    }

    // E. EXTREMIDADES SUPERIORES

    crearBrazos() {

        this.Esqueleto.add(this.crearBrazo(-1));
        this.Esqueleto.add(this.crearBrazo(1));
    }

    crearBrazo(lado) {

        const brazo = new THREE.Group();

        brazo.position.set(lado * 0.95, 6.0, 0);

        // Hombro
        const hombro = new THREE.Mesh(
            new THREE.SphereGeometry(0.14, 16, 16),
            this.huesoMat
        );

        hombro.castShadow = true;
        brazo.add(hombro);

        // Húmero
        const humero = this.crearHuesoLargo(
            1.3,
            0.09,
            0.07
        );

        humero.rotation.z = lado * -0.1;
        brazo.add(humero);

        // Antebrazo
        const antebrazo = new THREE.Group();

        antebrazo.position.set(-lado * 0.13, -1.3, 0);

        const codo = new THREE.Mesh(
            new THREE.SphereGeometry(0.12, 16, 16),
            this.huesoMat
        );

        codo.castShadow = true;
        antebrazo.add(codo);

        const radio = this.crearHuesoLargo(
            1.2,
            0.07,
            0.06
        );

        const cubito = this.crearHuesoLargo(
            1.2,
            0.06,
            0.05
        );

        cubito.position.x = lado * 0.07;

        antebrazo.add(radio);
        antebrazo.add(cubito);

        // Mano
        const mano = new THREE.Mesh(
            new THREE.BoxGeometry(0.28, 0.35, 0.09),
            this.huesoMat
        );

        mano.position.set(0, -1.25, 0);
        mano.castShadow = true;
        mano.receiveShadow = true;

        antebrazo.add(mano);
        brazo.add(antebrazo);

        return brazo;
    }

    // F. EXTREMIDADES INFERIORES

    crearPiernas() {

        this.Esqueleto.add(this.crearPierna(-1));
        this.Esqueleto.add(this.crearPierna(1));
    }

    crearPierna(lado) {

        const pierna = new THREE.Group();

        pierna.position.set(lado * 0.45, 4.2, 0);

        // Cadera
        const cadera = new THREE.Mesh(
            new THREE.SphereGeometry(0.16, 16, 16),
            this.huesoMat
        );

        cadera.castShadow = true;
        pierna.add(cadera);

        // Fémur
        const femur = this.crearHuesoLargo(
            1.7,
            0.11,
            0.09
        );

        pierna.add(femur);

        // Espinilla
        const espinilla = new THREE.Group();
        espinilla.position.y = -1.7;

        const rotula = new THREE.Mesh(
            new THREE.SphereGeometry(0.13, 16, 16),
            this.huesoMat
        );

        rotula.position.z = 0.05;
        rotula.castShadow = true;
        espinilla.add(rotula);

        // Tibia
        const tibia = this.crearHuesoLargo(
            1.6,
            0.1,
            0.08
        );

        // Peroné
        const perone = this.crearHuesoLargo(
            1.55,
            0.05,
            0.04
        );

        perone.position.x = lado * 0.08;

        espinilla.add(tibia);
        espinilla.add(perone);

        // Pie
        const pie = new THREE.Mesh(
            new THREE.BoxGeometry(0.32, 0.18, 0.65),
            this.huesoMat
        );

        pie.position.set(0, -1.65, 0.18);
        pie.castShadow = true;
        pie.receiveShadow = true;

        espinilla.add(pie);
        pierna.add(espinilla);

        return pierna;
    }

}
