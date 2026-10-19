import * as THREE from 'three';

export class Dulces {
    constructor() {
        this.ofrenda = new THREE.Group();

        // Materiales
        const materialBarro = new THREE.MeshStandardMaterial({ color: 0xa9421e, roughness: 0.8, side: THREE.DoubleSide });
        const materialBarroClaro = new THREE.MeshStandardMaterial({ color: 0xcf6530, roughness: 0.75, side: THREE.DoubleSide });
        const materialInteriorTazon = new THREE.MeshStandardMaterial({ color: 0x7d2d18, roughness: 0.9, side: THREE.DoubleSide });
        const materialBlanco = new THREE.MeshStandardMaterial({ color: 0xfff0c9, roughness: 0.65 });
        const materialRosa = new THREE.MeshStandardMaterial({ color: 0xf08a9c, roughness: 0.45 });
        const materialCafe = new THREE.MeshStandardMaterial({ color: 0x6a2f16, roughness: 0.65 });
        const materialAmarillo = new THREE.MeshStandardMaterial({ color: 0xf6bc32, roughness: 0.55 });
        const materialRojo = new THREE.MeshStandardMaterial({ color: 0xd84a2a, roughness: 0.5 });

        // Cuerpo exterior del tazón
        const cuerpoTazon = new THREE.Mesh(
            new THREE.SphereGeometry(3.0, 40, 24, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2),
            materialBarro
        );
        cuerpoTazon.scale.set(1, 0.58, 1);
        cuerpoTazon.position.y = 0;
        cuerpoTazon.castShadow = true;
        cuerpoTazon.receiveShadow = true;
        this.ofrenda.add(cuerpoTazon);

        // Interior oscuro
        const interiorTazon = new THREE.Mesh(
            new THREE.SphereGeometry(2.82, 40, 24, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2),
            materialInteriorTazon
        );
        interiorTazon.scale.set(1, 0.58, 1);
        interiorTazon.position.y = 1.57;
        interiorTazon.receiveShadow = true;
        this.ofrenda.add(interiorTazon);

        // Borde superior
        const bordeTazon = new THREE.Mesh(
            new THREE.TorusGeometry(3.0, 0.18, 16, 48),
            materialBarroClaro
        );
        bordeTazon.rotation.x = Math.PI / 2;
        bordeTazon.position.y = 1.55;
        bordeTazon.castShadow = true;
        this.ofrenda.add(bordeTazon);

        // Base del tazón
        const baseTazon = new THREE.Mesh(
            new THREE.CylinderGeometry(1.25, 1.55, 0.35, 32),
            materialBarro
        );
        baseTazon.position.y = 0.15;
        baseTazon.castShadow = true;
        baseTazon.receiveShadow = true;
        this.ofrenda.add(baseTazon);

        // Funciones auxiliares internas
        const agregarAlTazon = (objeto) => {
            objeto.traverse((hijo) => {
                if (hijo.isMesh) {
                    hijo.castShadow = true;
                    hijo.receiveShadow = true;
                }
            });
            this.ofrenda.add(objeto);
            return objeto;
        };

        const posicionarDulce = (objeto, x, y, z) => {
            objeto.position.set(x * 1.2, y - 1, z * 1.2);
        };

        const crearCocada = (x, y, z, escala) => {
            const cocada = new THREE.Group();
            const dulce = new THREE.Mesh(new THREE.SphereGeometry(0.48, 20, 16), materialBlanco);
            dulce.scale.set(1, 0.65, 1);
            cocada.add(dulce);

            for (let i = 0; i < 7; i++) {
                const angulo = (i / 7) * Math.PI * 2;
                const coco = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 10), materialCafe);
                coco.position.set(Math.cos(angulo) * 0.28, 0.25, Math.sin(angulo) * 0.28);
                cocada.add(coco);
            }
            posicionarDulce(cocada, x, y, z);
            cocada.scale.set(escala, escala, escala);
            return agregarAlTazon(cocada);
        };

        const crearJamoncillo = (x, y, z, rotacion) => {
            const jamoncillo = new THREE.Group();
            const dulce = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.75, 20), materialRosa);
            dulce.rotation.z = Math.PI / 2;
            jamoncillo.add(dulce);

            const linea1 = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.025, 8, 20), materialBlanco);
            linea1.rotation.y = Math.PI / 2;
            linea1.position.x = -0.22;
            jamoncillo.add(linea1);

            const linea2 = linea1.clone();
            linea2.position.x = 0.22;
            jamoncillo.add(linea2);

            posicionarDulce(jamoncillo, x, y, z);
            jamoncillo.rotation.y = rotacion;
            return agregarAlTazon(jamoncillo);
        };

        const crearAlegria = (x, y, z, rotacion) => {
            const alegria = new THREE.Group();
            const base = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.30, 0.62), materialAmarillo);
            alegria.add(base);

            for (let i = 0; i < 8; i++) {
                const semilla = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), materialBlanco);
                semilla.position.set(-0.25 + (i % 4) * 0.16, 0.18, -0.16 + Math.floor(i / 4) * 0.28);
                alegria.add(semilla);
            }
            posicionarDulce(alegria, x, y, z);
            alegria.rotation.y = rotacion;
            return agregarAlTazon(alegria);
        };

        const crearTamarindo = (x, y, z, rotacion) => {
            const tamarindo = new THREE.Group();
            const dulce = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.85, 16), materialCafe);
            dulce.rotation.z = Math.PI / 2;
            tamarindo.add(dulce);

            const extremo1 = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.35, 12), materialRojo);
            extremo1.rotation.z = -Math.PI / 2;
            extremo1.position.x = -0.55;
            tamarindo.add(extremo1);

            const extremo2 = extremo1.clone();
            extremo2.rotation.z = Math.PI / 2;
            extremo2.position.x = 0.55;
            tamarindo.add(extremo2);

            posicionarDulce(tamarindo, x, y, z);
            tamarindo.rotation.y = rotacion;
            return agregarAlTazon(tamarindo);
        };

        const crearOblea = (x, y, z, color, rotacion) => {
            const materialOblea = new THREE.MeshStandardMaterial({ color: color, roughness: 0.7 });
            const oblea = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.10, 32), materialOblea);
            posicionarDulce(oblea, x, y, z);
            oblea.rotation.set(0.3, rotacion, 0.2);
            return agregarAlTazon(oblea);
        };

        const clonarDulce = (modelo, x, y, z, rotacion, escala = 1) => {
            const clon = modelo.clone();
            posicionarDulce(clon, x, y, z);
            clon.rotation.y = rotacion;
            clon.scale.multiplyScalar(escala);
            agregarAlTazon(clon);
        };

        const clonarDulceEnParedZ = (modelo, x, z, rotacion, alturaApoyo) => {
            const radioInterior = 2.82;
            const posX = x * 1.2;
            const posZ = z * 1.2 - Math.sign(z) * 0.5;
            const radio = Math.min(Math.hypot(posX, posZ), radioInterior - 0.1);
            const alturaInterior = 1.57 - 0.58 * Math.sqrt(radioInterior ** 2 - radio ** 2);

            clonarDulce(modelo, x, alturaInterior + alturaApoyo + 1, posZ / 1.2, rotacion);
        };

        // Creación de modelos y clones
        const modeloCocada = crearCocada(-1.35, 0, 0.20, 1);
        const modeloJamoncillo = crearJamoncillo(-1.85, 1.92, -0.45, 0.4);
        const modeloAlegria = crearAlegria(-0.85, 2.72, 0.15, 0.5);
        const modeloTamarindo = crearTamarindo(-1.65, 2.42, -0.10, 0.6);
        const modeloObleaAmarilla = crearOblea(-0.35, 2.25, 0.95, 0xf4bd3d, 0.2);
        const modeloObleaRosa = crearOblea(0.75, 2.42, -0.10, 0xe85b76, 1.0);
        const modeloObleaVerde = crearOblea(-1.15, 2.65, -0.55, 0x78a94d, -0.4);

        clonarDulce(modeloCocada, -0.55, 2.10, -0.80, 0.3, 0.95);
        clonarDulce(modeloCocada, 0.45, 1.88, -0.95, 1.1, 1.05);
        clonarDulce(modeloCocada, 1.35, 2.05, -0.20, -0.2, 0.9);
        clonarDulce(modeloCocada, 0.95, 2.35, 0.55, 0.7, 0.85);
        clonarDulce(modeloCocada, -1.05, 2.35, 0.65, -0.6, 0.85);
        clonarDulce(modeloCocada, 0.10, 2.55, 0.85, 0.4, 0.78);
        clonarDulce(modeloCocada, -1.95, 1.95, 0.25, 0.9, 0.75);

        clonarDulce(modeloJamoncillo, 1.60, 1.95, -0.75, -0.5, 1);
        clonarDulce(modeloJamoncillo, -0.15, 2.50, 0.15, 1.1, 0.92);
        clonarDulce(modeloJamoncillo, 1.65, 2.30, 0.50, 0.2, 0.88);
        clonarDulce(modeloJamoncillo, 0.80, 2.75, -0.55, -0.8, 0.82);
        clonarDulce(modeloJamoncillo, -1.45, 2.55, 0.85, 0.5, 0.80);
        clonarDulce(modeloJamoncillo, 0.25, 2.90, 0.25, -0.1, 0.72);

        clonarDulce(modeloAlegria, 0.45, 2.58, 0.40, -0.3, 1);
        clonarDulce(modeloAlegria, -1.65, 2.25, 0.70, 0.8, 0.85);
        clonarDulce(modeloAlegria, 1.25, 2.65, -0.25, 0.15, 0.85);
        clonarDulce(modeloAlegria, -0.30, 3.05, -0.20, 0.5, 0.75);
        clonarDulce(modeloAlegria, 1.75, 2.15, 0.35, -0.4, 0.72);
        clonarDulce(modeloAlegria, -1.25, 2.95, -0.70, 0.2, 0.70);

        clonarDulce(modeloTamarindo, 1.20, 2.40, 0.78, -0.7, 1);
        clonarDulce(modeloTamarindo, -0.10, 2.85, -0.30, 0.1, 0.9);
        clonarDulce(modeloTamarindo, 1.15, 3.00, 0.10, 0.8, 0.75);
        clonarDulce(modeloTamarindo, -1.85, 2.65, -0.45, -0.2, 0.70);
        clonarDulce(modeloTamarindo, 0.25, 3.15, 0.65, 0.4, 0.65);

        clonarDulce(modeloObleaAmarilla, 1.65, 2.55, 0.30, 0.7, 0.85);
        clonarDulce(modeloObleaAmarilla, -0.70, 3.12, 0.45, -0.6, 0.75);
        clonarDulce(modeloObleaAmarilla, 0.40, 3.20, -0.65, 0.3, 0.70);

        clonarDulce(modeloObleaRosa, -1.70, 2.55, 0.15, 0.4, 0.78);
        clonarDulce(modeloObleaRosa, 1.15, 2.85, 0.70, -0.3, 0.70);

        clonarDulce(modeloObleaVerde, 0.80, 3.00, -0.10, 0.5, 0.72);
        clonarDulce(modeloObleaVerde, -0.25, 3.35, 0.25, -0.5, 0.60);

        // Relleno al fondo del tazon, conservando el tamano base de cada dulce.
        clonarDulce(modeloCocada, -1.25, 2.20, -1.20, 0.2);
        clonarDulce(modeloAlegria, -0.35, 2.35, -1.35, -0.4);
        clonarDulce(modeloJamoncillo, 0.65, 2.25, -1.30, 0.8);
        clonarDulce(modeloTamarindo, 1.35, 2.35, -1.00, -0.2);
        clonarDulce(modeloObleaAmarilla, -1.65, 2.40, -0.80, 0.5);
        clonarDulce(modeloCocada, -0.80, 2.65, -0.75, -0.6);
        clonarDulce(modeloJamoncillo, 0.20, 2.70, -0.85, 0.3);
        clonarDulce(modeloAlegria, 1.10, 2.60, -0.65, 0.7);
        clonarDulce(modeloObleaRosa, -0.20, 2.95, -0.45, -0.2);
        clonarDulce(modeloTamarindo, -1.45, 2.80, -0.25, 0.6);

        // Dulces adicionales apoyados en las paredes delantera y trasera del tazon.
        clonarDulceEnParedZ(modeloCocada, -0.9, -1.65, 0.3, 0.32);
        clonarDulceEnParedZ(modeloJamoncillo, -0.3, -1.65, -0.5, 0.33);
        clonarDulceEnParedZ(modeloAlegria, 0.3, -1.65, 0.4, 0.25);
        clonarDulceEnParedZ(modeloTamarindo, 0.9, -1.65, -0.3, 0.22);
        clonarDulceEnParedZ(modeloObleaAmarilla, -0.9, 1.65, -0.4, 0.16);
        clonarDulceEnParedZ(modeloCocada, -0.3, 1.65, 0.7, 0.32);
        clonarDulceEnParedZ(modeloJamoncillo, 0.3, 1.65, 0.2, 0.33);
        clonarDulceEnParedZ(modeloAlegria, 0.9, 1.65, -0.6, 0.25);

        // Mas dulces siguiendo la curva interior, con el mismo ajuste hacia el centro en Z.
        clonarDulceEnParedZ(modeloAlegria, -1.2, -1.4, 0.5, 0.25);
        clonarDulceEnParedZ(modeloObleaRosa, -0.6, -1.4, -0.2, 0.16);
        clonarDulceEnParedZ(modeloTamarindo, 0, -1.4, 0.8, 0.22);
        clonarDulceEnParedZ(modeloCocada, 0.6, -1.4, -0.5, 0.32);
        clonarDulceEnParedZ(modeloJamoncillo, 1.2, -1.4, 0.3, 0.33);
        clonarDulceEnParedZ(modeloTamarindo, -1.2, 1.4, -0.4, 0.22);
        clonarDulceEnParedZ(modeloCocada, -0.6, 1.4, 0.2, 0.32);
        clonarDulceEnParedZ(modeloAlegria, 0, 1.4, -0.7, 0.25);
        clonarDulceEnParedZ(modeloObleaVerde, 0.6, 1.4, 0.6, 0.16);
        clonarDulceEnParedZ(modeloJamoncillo, 1.2, 1.4, -0.3, 0.33);
    }

    getObject() {
        return this.ofrenda;
    }
}