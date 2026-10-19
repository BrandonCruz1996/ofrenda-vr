
import * as THREE from 'three';

export class Candelabro {

    constructor() {

        this.Candelabro = new THREE.Group();

        // Materiales
        this.barroNegroMat = new THREE.MeshStandardMaterial({
            color: 0x1c1c1e,
            roughness: 0.25,
            metalness: 0.15
        });

        this.ceraMat = new THREE.MeshStandardMaterial({
            color: 0xfffdd0,
            roughness: 0.6
        });

        this.llamaMat = new THREE.MeshBasicMaterial({
            color: 0xffaa00
        });

        this.cempasuchilMat = new THREE.MeshStandardMaterial({
            color: 0xff8500,
            roughness: 0.4
        });

        // Lista para animar las llamas
        this.llamas = [];

        // Crear las partes del candelabro
        this.crearBase();
        this.crearCuerpo();
        this.crearCalaverita();

        // Brazos laterales
        this.Candelabro.add(this.crearBrazo(1));
        this.Candelabro.add(this.crearBrazo(-1));

        // Velas
        this.Candelabro.add(
            this.crearPortavelaConVela(0, 2.3, 0)
        );

        this.Candelabro.add(
            this.crearPortavelaConVela(1.0, 2.7, 0)
        );

        this.Candelabro.add(
            this.crearPortavelaConVela(-1.0, 2.7, 0)
        );

        // Flores de cempasúchil
        this.crearFlores();
    }

    // Base inferior
    crearBase() {

        const baseInferior = new THREE.Mesh(
            new THREE.CylinderGeometry(0.9, 1.2, 0.25, 24),
            this.barroNegroMat
        );

        baseInferior.position.y = 0.125;
        baseInferior.castShadow = true;
        baseInferior.receiveShadow = true;

        this.Candelabro.add(baseInferior);
    }

    // Cuerpo principal
    crearCuerpo() {

        const cuerpoCandelabro = new THREE.Mesh(
            new THREE.SphereGeometry(0.7, 24, 24),
            this.barroNegroMat
        );

        cuerpoCandelabro.scale.set(0.8, 1.6, 0.8);
        cuerpoCandelabro.position.y = 1.1;
        cuerpoCandelabro.castShadow = true;
        cuerpoCandelabro.receiveShadow = true;

        this.Candelabro.add(cuerpoCandelabro);
    }

    // Calaverita decorativa
    crearCalaverita() {

        const calaveritaBarro = new THREE.Mesh(
            new THREE.SphereGeometry(0.22, 16, 16),
            this.barroNegroMat
        );

        calaveritaBarro.position.set(0, 1.1, 0.55);
        calaveritaBarro.castShadow = true;

        this.Candelabro.add(calaveritaBarro);
    }

    // Brazos laterales del candelabro
    crearBrazo(lado) {

        const puntos = [
            new THREE.Vector3(0, 1.5, 0),
            new THREE.Vector3(lado * 0.7, 1.2, 0.1),
            new THREE.Vector3(lado * 1.2, 2.0, 0.2),
            new THREE.Vector3(lado * 1.0, 2.7, 0)
        ];

        const curva = new THREE.CatmullRomCurve3(puntos);

        const geometria = new THREE.TubeGeometry(
            curva,
            24,
            0.07,
            12,
            false
        );

        const brazo = new THREE.Mesh(
            geometria,
            this.barroNegroMat
        );

        brazo.castShadow = true;
        brazo.receiveShadow = true;

        return brazo;
    }

    // Portavelas, velas, llamas y luces
    crearPortavelaConVela(x, y, z) {

        const porta = new THREE.Group();

        porta.position.set(x, y, z);

        // Copa del portavela
        const copa = new THREE.Mesh(
            new THREE.CylinderGeometry(0.22, 0.12, 0.3, 16),
            this.barroNegroMat
        );

        copa.castShadow = true;
        porta.add(copa);

        // Vela
        const vela = new THREE.Mesh(
            new THREE.CylinderGeometry(0.08, 0.08, 0.8, 16),
            this.ceraMat
        );

        vela.position.y = 0.4;
        vela.castShadow = true;
        porta.add(vela);

        // Llama
        const llama = new THREE.Mesh(
            new THREE.ConeGeometry(0.05, 0.18, 12),
            this.llamaMat
        );

        llama.position.y = 0.88;
        porta.add(llama);

        // Luz cálida de la llama
        const luzFuego = new THREE.PointLight(
            0xffaa00,
            1.0,
            5
        );

        luzFuego.position.y = 0.88;
        porta.add(luzFuego);

        // Guardar referencias para la animación
        this.llamas.push({
            mesh: llama,
            luz: luzFuego
        });

        return porta;
    }

    // Flores alrededor de la base
    crearFlores() {

        for (let i = 0; i < 10; i++) {

            const angulo = (i / 10) * Math.PI * 2;

            const flor = new THREE.Mesh(
                new THREE.DodecahedronGeometry(0.16, 1),
                this.cempasuchilMat
            );

            flor.position.set(
                Math.cos(angulo) * 1.3,
                0.08,
                Math.sin(angulo) * 1.3
            );

            flor.castShadow = true;
            flor.receiveShadow = true;

            this.Candelabro.add(flor);
        }
    }

    // Animación del parpadeo de las velas
    actualizar(t) {

        this.llamas.forEach((item, index) => {

            const parpadeo =
                Math.sin(t * 8 + index) * 0.15 +
                Math.cos(t * 13 + index) * 0.1;

            item.luz.intensity = 1.8 + parpadeo;

            item.mesh.scale.set(
                1 + parpadeo * 0.2,
                1 + parpadeo * 0.3,
                1 + parpadeo * 0.2
            );
        });
    }
}
