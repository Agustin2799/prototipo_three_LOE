import React, { useRef, useEffect } from "react";
import { SphereGeometry, MeshBasicMaterial, Mesh } from "three";

const DibujaPunto = ({ mapa, mostrar }) => {
  const groupRef = useRef();

  useEffect(() => {
    if (!mostrar) return; // Si mostrar es false, no hacer nada

    const group = groupRef.current;
    group.clear(); // Limpia el grupo antes de agregar nuevos puntos

    // Función para agregar puntos a un grupo
    const agregarPuntos = (territorios, color) => {
      territorios.forEach(({ coordenadas: { x, y } }) => {
        const geometry = new SphereGeometry(0.5, 16, 16); // Tamaño del punto
        const material = new MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.8, // Ajustar la transparencia
        });
        const sphere = new Mesh(geometry, material);
        sphere.position.set(x, y, 0);
        group.add(sphere);
      });
    };

    // Agregar puntos para cada tipo de territorio
    if (mapa.territorios_terrestres) {
      agregarPuntos(mapa.territorios_terrestres, "#F97F51"); // Color para terrenos
    }
    if (mapa.territorios_acuaticos) {
      agregarPuntos(mapa.territorios_acuaticos, "#16a085"); // Color para agua
    }
    if (mapa.territorios_costeros) {
      agregarPuntos(mapa.territorios_costeros, "#FFD700"); // Color para costeros
    }

    return () => {
      // Limpiar geometrías y materiales cuando se desmonte el componente
      group.clear();
    };
  }, [mapa, mostrar]);

  return mostrar ? <group ref={groupRef} /> : null; // Renderizar el grupo solo si mostrar es true
};

export default DibujaPunto;
