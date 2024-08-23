import React, { useRef, useEffect } from "react";
import { SphereGeometry, MeshBasicMaterial, Mesh } from "three";

const DibujaPunto = ({ coordenadas, mostrar, tipo }) => {
  const groupRef = useRef();

  useEffect(() => {
    if (!mostrar) return; // Si mostrar es false, no hacer nada
    const group = groupRef.current;
    group.clear(); // Limpia el grupo antes de agregar nuevos puntos
    if (tipo === 'ubicaciones') {


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
      if (coordenadas.territorios_terrestres) {
        agregarPuntos(coordenadas.territorios_terrestres, "#F97F51"); // Color para terrenos
      }
      if (coordenadas.territorios_acuaticos) {
        agregarPuntos(coordenadas.territorios_acuaticos, "#16a085"); // Color para agua
      }
      if (coordenadas.territorios_costeros) {
        agregarPuntos(coordenadas.territorios_costeros, "#FFD700"); // Color para costeros
      }

    } else if (tipo === 'marcadores') {
      coordenadas.forEach((coords) => {
        const geometry = new SphereGeometry(0.5, 16, 16); // Tamaño del punto
        const material = new MeshBasicMaterial({
          color: "white",
          transparent: true,
          opacity: 0.7, // Ajustar la transparencia
        });
        const sphere = new Mesh(geometry, material);
        sphere.position.set(coords.x, coords.y, 0);
        group.add(sphere);
      });
   }

    return () => {
      // Limpiar geometrías y materiales cuando se desmonte el componente
      group.clear();
    };
  }, [coordenadas, mostrar, tipo]);

  return mostrar ? <group ref={groupRef} /> : null; // Renderizar el grupo solo si mostrar es true
};

export default DibujaPunto;
