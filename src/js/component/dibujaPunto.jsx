import React, { useRef, useEffect } from "react";
import { SphereGeometry, MeshBasicMaterial, Mesh } from "three";

const DibujaPunto = ({ territorios, mostrar }) => {
  const groupRef = useRef();

  useEffect(() => {
    if (!mostrar) return; // Si mostrar es false, no hacer nada

    const coordenadas = territorios.map((terr) => terr.coordenadas);
    const group = groupRef.current;

    // Crear un punto para cada coordenada
    coordenadas.forEach(({ x, y }) => {
      const geometry = new SphereGeometry(0.5, 16, 16); // Tamaño del punto aumentado
      const material = new MeshBasicMaterial({
        color: "blue",
        transparent: true,
        opacity: 0.4, // Ajustar la transparencia
      });
      const sphere = new Mesh(geometry, material);

      sphere.position.set(x, y, 0);
      group.add(sphere);
    });

    return () => {
      // Limpiar geometrías y materiales cuando se desmonte el componente
      group.clear();
    };
  }, [territorios, mostrar]);

  return mostrar ? <group ref={groupRef} /> : null; // Renderizar el grupo solo si mostrar es true
};

export default DibujaPunto;
