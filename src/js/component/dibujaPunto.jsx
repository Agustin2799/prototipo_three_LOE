import React, { useRef, useEffect } from "react";
import { SphereGeometry, MeshBasicMaterial, Mesh} from "three";

const DibujaPunto = ({ territorios }) => {
  const groupRef = useRef();

  useEffect(() => {
    const coordenadas = territorios.map((terr) => terr.coordenadas);
    const group = groupRef.current;


    // Crear un punto para cada coordenada
    coordenadas.forEach(({ x, y }) => {
      const geometry = new SphereGeometry(1, 16, 16); // Tamaño del punto aumentado
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
  }, [territorios]);

  return <group ref={groupRef} />;
};

export default DibujaPunto;
