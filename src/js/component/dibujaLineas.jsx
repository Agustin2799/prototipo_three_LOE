import React, { useRef, useEffect, useState } from "react";
import { Line2 } from "three/examples/jsm/lines/Line2";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";

const DibujarConexiones = ({ territorios, mostrar }) => {
  const grupoRef = useRef();
  const [conexionesDibujadas, setConexionesDibujadas] = useState([]);

  useEffect(() => {
    // Limpiar el grupo si mostrar es false
    if (!mostrar) {
      if (grupoRef.current) {
        while (grupoRef.current.children.length) {
          grupoRef.current.remove(grupoRef.current.children[0]);
        }
      }
      setConexionesDibujadas([]); // Reiniciar conexiones dibujadas
      return; // Salir del efecto
    }

    const nuevasConexiones = [];

    territorios.forEach((territorio) => {
      territorio.conexiones.forEach((conexion) => {
        const claveConexion = `${territorio.coordenadas.x},${territorio.coordenadas.y}-${conexion.x},${conexion.y}`;
        // Solo dibujar si la conexión no ha sido dibujada antes
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
            transparent: true,
            opacity: 0.3,
          });

          const linea = new Line2(geometria, material);
          grupoRef.current.add(linea);
        }
      });
    });

    setConexionesDibujadas((prev) => [...prev, ...nuevasConexiones]);
  }, [territorios, mostrar]);

  return mostrar ? <group ref={grupoRef} /> : null;
};

export default DibujarConexiones;
