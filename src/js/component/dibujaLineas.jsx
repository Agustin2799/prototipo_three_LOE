import React, { useRef, useEffect, useState } from "react";
import { Line2 } from "three/examples/jsm/lines/Line2";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";

// Componente que dibuja líneas entre un territorio y sus conexiones.
const DibujarConexiones = ({ territorios }) => {
  // Crear una referencia para el grupo de conexiones.
  const grupoRef = useRef();
  // Estado para rastrear conexiones ya dibujadas.
  const [conexionesDibujadas, setConexionesDibujadas] = useState([]);
  // Lista de líneas creadas
  const [lineasCreadas, setLineasCreadas] = useState([]);

  useEffect(() => {
    // Guardar las conexiones actuales para comparación.
    const conexionesActuales = new Set();

    territorios.forEach((territorio) => {
      territorio.conexiones.forEach((conexion) => {
        const claveConexion = `${territorio.coordenadas.x},${territorio.coordenadas.y}-${conexion.x},${conexion.y}`;
        conexionesActuales.add(claveConexion);
      });
    });

    // Obtener las líneas en el grupo y convertirlas en un array para manipulación
    const lineasEnElGrupo = grupoRef.current
      ? Array.from(grupoRef.current.children)
      : [];

    // Eliminar las líneas más recientes si el nuevo objeto es más corto
    if (lineasEnElGrupo.length > conexionesActuales.size) {
      const lineasPorEliminar = lineasEnElGrupo.slice(
        -lineasEnElGrupo.length + conexionesActuales.size
      );
      lineasPorEliminar.forEach((linea) => grupoRef.current.remove(linea));
    }

    // Dibujar nuevas líneas
    const nuevasConexiones = [];

    territorios.forEach((territorio) => {
      territorio.conexiones.forEach((conexion) => {
        const claveConexion = `${territorio.coordenadas.x},${territorio.coordenadas.y}-${conexion.x},${conexion.y}`;
        if (!conexionesDibujadas.includes(claveConexion)) {
          nuevasConexiones.push(claveConexion);

          const geometria = new LineGeometry();
          geometria.setPositions([
            territorio.coordenadas.x,
            territorio.coordenadas.y,
            0,
            conexion.x,
            conexion.y,
            0,
          ]);

          const material = new LineMaterial({
            color: "#979076",
            linewidth: 4,
            dashed: false,
            transparent: true,
            opacity: 0.2, // Ajustar la transparencia
          });

          const linea = new Line2(geometria, material);
          grupoRef.current.add(linea);
          setLineasCreadas((prev) => [...prev, linea]); // Agregar la línea a la lista de líneas creadas
        }
      });
    });

    setConexionesDibujadas(nuevasConexiones);
  }, [territorios]);

  return <group ref={grupoRef} />;
};

export default DibujarConexiones;
