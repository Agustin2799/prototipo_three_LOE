import React, {useEffect, useRef} from "react";
import {
  PlaneGeometry, // Geometría para crear un plano
  MeshBasicMaterial, // Material básico para el plano
  WireframeGeometry, // Geometría de alambre para mostrar la cuadrícula
  LineSegments, // Segmentos de línea para la cuadrícula
  LineBasicMaterial, // Material básico de línea para la cuadrícula
  Mesh, // Malla para combinar geometría y material
} from "three";

// Componente que crea un plano con una cuadrícula
const MapConCuadricula = ({ ladosYDivisiones }) => {
  const planeRef = useRef(); // Referencia para el grupo que contiene el plano y la cuadrícula

  // useEffect para ejecutar código después del renderizado inicial
  useEffect(() => {
    // Crear la geometría del plano: 15 unidades de ancho, 15 unidades de alto, 15 segmentos en ambas direcciones
    const geometry = new PlaneGeometry(
      ladosYDivisiones,
      ladosYDivisiones,
      ladosYDivisiones,
      ladosYDivisiones
    );
    // Crear un material básico de color verde y visible en ambas caras
    const material = new MeshBasicMaterial({ color: "green", side: 2 });

    // Crear la geometría de alambre para el plano
    const wireframe = new WireframeGeometry(geometry);
    // Crear el material de línea para la cuadrícula
    const lineMaterial = new LineBasicMaterial({ color: "black" });
    // Crear los segmentos de línea utilizando la geometría de alambre y el material de línea
    const lineSegments = new LineSegments(wireframe, lineMaterial);

    // Crear la malla combinando la geometría del plano y el material
    const mesh = new Mesh(geometry, material);
    //Establecemos el orden de renderizado
    mesh.renderOrder = 0;
    // Agregar la malla al grupo de referencias
    planeRef.current.add(mesh);
    // Agregar los segmentos de línea (cuadrícula) al grupo de referencias
    planeRef.current.add(lineSegments);
  }, []); // El array vacío como segundo argumento asegura que este efecto se ejecute solo una vez

  // Devolver un grupo que contiene el plano y la cuadrícula
  return <group ref={planeRef} />;
};

export default MapConCuadricula;

