import React, { useRef, useEffect, useState } from "react";
import { Line2 } from "three/examples/jsm/lines/Line2";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";

const DibujarConexiones = ({ mapa, mostrar }) => {
  const grupoRef = useRef();
  const [conexionesDibujadas, setConexionesDibujadas] = useState([]);

  useEffect(() => {
    if (!mostrar) {
      // Eliminar todas las líneas si mostrar es falso
      if (grupoRef.current) {
        while (grupoRef.current.children.length) {
          grupoRef.current.remove(grupoRef.current.children[0]);
        }
      }
      setConexionesDibujadas([]);
      return;
    }

    // Eliminar todas las líneas antes de agregar las nuevas
    if (grupoRef.current) {
      while (grupoRef.current.children.length) {
        grupoRef.current.remove(grupoRef.current.children[0]);
      }
    }

    const nuevasConexiones = [];

    const dibujaConexion = (territorios, color) => {
      territorios.forEach((territorio) => {
        territorio.conexiones.forEach((conexion) => {
          const [x1, y1, x2, y2] =
            territorio.coordenadas.x <= conexion.x
              ? [
                  territorio.coordenadas.x,
                  territorio.coordenadas.y,
                  conexion.x,
                  conexion.y,
                ]
              : [
                  conexion.x,
                  conexion.y,
                  territorio.coordenadas.x,
                  territorio.coordenadas.y,
                ];

          const claveConexion = `${x1},${y1}-${x2},${y2}`;

          if (!nuevasConexiones.includes(claveConexion)) {
            nuevasConexiones.push(claveConexion);

            const geometria = new LineGeometry();
            geometria.setPositions([x1, y1, 0, x2, y2, 0]);

            const material = new LineMaterial({
              color: color,
              linewidth: 4,
              transparent: true,
              opacity: 0.3,
            });

            const linea = new Line2(geometria, material);
            grupoRef.current.add(linea);
          }
        });
      });
    };

    if (mapa.territorios_terrestres) {
      dibujaConexion(mapa.territorios_terrestres, "#bdc3c7");
    }
    if (mapa.territorios_acuaticos) {
      dibujaConexion(mapa.territorios_acuaticos, "#bdc3c7");
    }
    if (mapa.territorios_costeros) {
      dibujaConexion(mapa.territorios_costeros, "#bdc3c7");
    }

    setConexionesDibujadas(nuevasConexiones);
  }, [mapa, mostrar]);

  return mostrar ? <group ref={grupoRef} /> : null;
};

export default DibujarConexiones;
