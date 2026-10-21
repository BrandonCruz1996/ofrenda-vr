import * as THREE from 'three';

export class foto {
    constructor() {
        this.foto = new THREE.Group();
        this.foto.rotation.y = -0.08;

        // Materiales
        const materialNegro = new THREE.MeshStandardMaterial({ color: 0x10100e, roughness: 0.45 });
        const materialRojo = new THREE.MeshStandardMaterial({ color: 0xc81420, roughness: 0.4 });
        const materialRojoOscuro = new THREE.MeshStandardMaterial({ color: 0x8e0e18, roughness: 0.5 });
        const materialNaranja = new THREE.MeshStandardMaterial({ color: 0xff8518, roughness: 0.35 });
        const materialAmarillo = new THREE.MeshStandardMaterial({ color: 0xffcf3f, roughness: 0.3 });
        const materialFoto = new THREE.MeshStandardMaterial({ color: 0x8f8b8c, roughness: 0.9 });
        const materialSoporte = new THREE.MeshStandardMaterial({ color: 0x24201d, roughness: 0.75 });

        // Funciones auxiliares adaptadas al contexto de la clase
        const crearCaja = (ancho, alto, profundidad, material, x, y, z) => {
            const geometria = new THREE.BoxGeometry(ancho, alto, profundidad);
            const objeto = new THREE.Mesh(geometria, material);
            objeto.position.set(x, y, z);
            objeto.castShadow = true;
            objeto.receiveShadow = true;
            this.foto.add(objeto);
            return objeto;
        };

        const crearPunto = (x, y, tamaño, material, z = 0.3) => {
            const geometria = new THREE.SphereGeometry(tamaño, 16, 16);
            const punto = new THREE.Mesh(geometria, material);
            punto.position.set(x, y, z);
            punto.scale.z = 0.45;
            punto.castShadow = true;
            this.foto.add(punto);
            return punto;
        };

        const crearFilaHorizontal = (inicioX, finalX, y, cantidad, tamaño, materiales) => {
            for (let i = 0; i < cantidad; i++) {
                const x = inicioX + (finalX - inicioX) * (i / (cantidad - 1));
                crearPunto(x, y, tamaño, materiales[i % materiales.length]);
            }
        };

        const crearFilaVertical = (x, inicioY, finalY, cantidad, tamaño, materiales) => {
            for (let i = 0; i < cantidad; i++) {
                const y = inicioY + (finalY - inicioY) * (i / (cantidad - 1));
                crearPunto(x, y, tamaño, materiales[i % materiales.length]);
            }
        };

        const crearFlor = (x, y, tamaño = 0.3) => {
            crearPunto(x, y, tamaño, materialRojo, 0.36);
            crearPunto(x, y, tamaño * 0.58, materialRojoOscuro, 0.42);
            crearPunto(x, y, tamaño * 0.38, materialNaranja, 0.48);
            crearPunto(x - tamaño * 0.08, y + tamaño * 0.08, tamaño * 0.17, materialAmarillo, 0.53);
        };

        const crearAnilloPuntos = (centroX, centroY, radio, cantidad, tamaño, materiales) => {
            for (let i = 0; i < cantidad; i++) {
                const angulo = (i / cantidad) * Math.PI * 2;
                const x = centroX + Math.cos(angulo) * radio;
                const y = centroY + Math.sin(angulo) * radio;
                crearPunto(x, y, tamaño, materiales[i % materiales.length], 0.47);
            }
        };

        // Estructura exterior del marco
        crearCaja(7.2, 0.65, 0.45, materialNegro, 0, 8.15, 0);
        crearCaja(7.2, 0.65, 0.45, materialNegro, 0, 0.65, 0);
        crearCaja(0.75, 7.8, 0.45, materialNegro, -3.22, 4.4, 0);
        crearCaja(0.75, 7.8, 0.45, materialNegro, 3.22, 4.4, 0);

        // Parte interior ancha del marco
        crearCaja(5.85, 1.15, 0.43, materialNegro, 0, 7.35, 0);
        crearCaja(5.85, 1.15, 0.43, materialNegro, 0, 1.45, 0);
        crearCaja(1.05, 5.0, 0.43, materialNegro, -2.35, 4.4, 0);
        crearCaja(1.05, 5.0, 0.43, materialNegro, 2.35, 4.4, 0);

        // Espacio donde se colocaría la fotografía
        const geometriaFoto = new THREE.PlaneGeometry(3.75, 4.85);
        const fotografia = new THREE.Mesh(geometriaFoto, materialFoto);
        fotografia.position.set(0, 4.4, 0.25);
        fotografia.receiveShadow = true;
        this.foto.add(fotografia);

        // Fondo detrás de la fotografía
        crearCaja(4.15, 5.25, 0.18, materialSoporte, 0, 4.4, -0.2);

        // Puntos pequeños del borde exterior
        crearFilaHorizontal(-2.75, 2.75, 8.15, 25, 0.07, [materialAmarillo]);
        crearFilaHorizontal(-2.75, 2.75, 0.65, 25, 0.07, [materialAmarillo]);
        crearFilaVertical(-3.22, 1.1, 7.7, 28, 0.07, [materialAmarillo]);
        crearFilaVertical(3.22, 1.1, 7.7, 28, 0.07, [materialAmarillo]);

        // Líneas rojas decorativas
        crearCaja(5.65, 0.08, 0.08, materialRojo, 0, 7.85, 0.3);
        crearCaja(5.65, 0.08, 0.08, materialRojo, 0, 0.95, 0.3);
        crearCaja(0.08, 6.65, 0.08, materialRojo, -2.92, 4.4, 0.3);
        crearCaja(0.08, 6.65, 0.08, materialRojo, 2.92, 4.4, 0.3);

        // Puntos del borde interior
        crearFilaHorizontal(-2.15, 2.15, 7.28, 17, 0.115, [materialNaranja, materialAmarillo]);
        crearFilaHorizontal(-2.15, 2.15, 1.52, 17, 0.115, [materialNaranja, materialAmarillo]);
        crearFilaVertical(-2.30, 1.75, 7.05, 20, 0.115, [materialNaranja, materialAmarillo]);
        crearFilaVertical(2.30, 1.75, 7.05, 20, 0.115, [materialNaranja, materialAmarillo]);

        // Segunda fila de puntos interiores
        crearFilaHorizontal(-2.05, 2.05, 7.02, 19, 0.085, [materialAmarillo, materialRojo]);
        crearFilaHorizontal(-2.05, 2.05, 1.78, 19, 0.085, [materialAmarillo, materialRojo]);
        crearFilaVertical(-2.05, 2.0, 6.8, 21, 0.085, [materialAmarillo, materialRojo]);
        crearFilaVertical(2.05, 2.0, 6.8, 21, 0.085, [materialAmarillo, materialRojo]);

        // Tercera fila de puntos junto a la fotografía
        crearFilaHorizontal(-1.82, 1.82, 6.92, 20, 0.065, [materialNaranja]);
        crearFilaHorizontal(-1.82, 1.82, 1.88, 20, 0.065, [materialNaranja]);
        crearFilaVertical(-1.92, 2.05, 6.75, 23, 0.065, [materialNaranja]);
        crearFilaVertical(1.92, 2.05, 6.75, 23, 0.065, [materialNaranja]);

        // Flores de la parte superior
        for (let i = 0; i < 9; i++) {
            crearFlor(-2.75 + i * 0.69, 8.15, 0.28);
        }

        // Flores de la parte inferior
        for (let i = 0; i < 8; i++) {
            crearFlor(-1.7 + i * 0.63, 0.65, 0.27);
        }

        // Flores del lado izquierdo
        for (let i = 0; i < 5; i++) {
            crearFlor(-3.22, 1.35 + i * 1.45, 0.27);
        }

        // Flores del lado derecho
        for (let i = 0; i < 7; i++) {
            crearFlor(3.22, 1.2 + i * 1.05, 0.27);
        }

        // Adorno circular grande de la esquina inferior izquierda
        const geometriaCirculoGrande = new THREE.CylinderGeometry(0.82, 0.82, 0.18, 24);
        const circuloGrande = new THREE.Mesh(geometriaCirculoGrande, materialNegro);
        circuloGrande.rotation.x = Math.PI / 2;
        circuloGrande.position.set(-2.7, 1.05, 0.35);
        circuloGrande.castShadow = true;
        this.foto.add(circuloGrande);

        // Centro del adorno circular
        crearFlor(-2.7, 1.05, 0.3);

        // Anillos de puntos alrededor del adorno
        crearAnilloPuntos(-2.7, 1.05, 0.42, 12, 0.07, [materialAmarillo, materialRojo]);
        crearAnilloPuntos(-2.7, 1.05, 0.62, 16, 0.08, [materialNaranja, materialAmarillo]);

        // SOPORTE TRASERO
        const geometriaSoporte = new THREE.BoxGeometry(2.2, 7.5, 0.25);
        geometriaSoporte.translate(0, -3.75, 0);
        const soporte = new THREE.Mesh(geometriaSoporte, materialSoporte);
        soporte.position.set(0, 7.2, -0.4);
        soporte.rotation.x = 0.35; 
        soporte.castShadow = true;
        this.foto.add(soporte);
    }

    getObject() {
        return this.foto;
    }
}