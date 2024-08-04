import React, { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Line2 } from "three/examples/jsm/lines/Line2";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";

const DibujarLinea = ({ start, end }) => {
  const groupRef = useRef();
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    // Crear la geometría de la línea
    const points = [start, end].flat();
    const geometry = new LineGeometry();
    geometry.setPositions(points);

    // Crear el material de la línea con un grosor de 5
    const material = new LineMaterial({
      color: 'grey',
      linewidth: 3, // el grosor de la línea en píxeles
    });

    // Es necesario actualizar el material con el tamaño del renderizador
    material.resolution.set(window.innerWidth, window.innerHeight);

    // Crear la línea
    const line = new Line2(geometry, material);

    // Agregar la línea al grupo
    groupRef.current.add(line);

    // Actualizar la resolución del material al redimensionar la ventana
    // const handleResize = () => {
    //   material.resolution.set(window.innerWidth, window.innerHeight);
    // };
    // window.addEventListener("resize", handleResize);

    // // Limpiar al desmontar el componente
    // return () => {
    //   groupRef.current.remove(line);
    //   geometry.dispose();
    //   material.dispose();
    //   window.removeEventListener("resize", handleResize);
    // };
  }, [start, end]);
  console.log('Línea dibujada')
  return <group ref={groupRef} />;
};

export default DibujarLinea;
