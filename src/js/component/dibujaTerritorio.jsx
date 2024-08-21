import React, { useEffect, useRef } from "react";
import { Shape, ShapeGeometry, MeshBasicMaterial, Mesh } from "three";

const DibujaTerritorio = () => {
  const terrRef = useRef();

  useEffect(() => {
    // Definir los puntos del territorio (ejemplo de un cuadrado)
    const puntos = [
      { x: -33, y: -3 },
      { x: -28, y: -8 },
      { x: -29, y: -15 },
      { x: -39, y: -18 },
      { x: -42, y: -16 },
      { x: -53, y: -7 },
      { x: -42, y: -2 },
    ];

    // Crear la forma
    const shape = new Shape();
    shape.moveTo(puntos[0].x, puntos[0].y);
    for (let i = 1; i < puntos.length; i++) {
      shape.lineTo(puntos[i].x, puntos[i].y);
    }
    // Cerrar la forma
    shape.lineTo(puntos[0].x, puntos[0].y);

    // Crear la geometría a partir de la forma
    const geometry = new ShapeGeometry(shape);

    // Crear el material con color y transparencia
    const material = new MeshBasicMaterial({
      color: "#16a085", // Color verde
      transparent: true,
      opacity: 0.3, // Nivel de transparencia (0.0 - totalmente transparente, 1.0 - opaco)
    });

    // Crear el mesh y agregarlo al grupo de referencia
    const mesh = new Mesh(geometry, material);
    terrRef.current.add(mesh);

    // Limpieza al desmontar el componente
    return () => {
      terrRef.current.remove(mesh);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <group ref={terrRef} />;
};

export default DibujaTerritorio;
