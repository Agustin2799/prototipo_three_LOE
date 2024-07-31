import React, { useEffect, useRef } from "react";
import { Mesh, MeshBasicMaterial, CircleGeometry } from "three";

const Punto = ({ position }) => {
  console.log(position)
  console.log('soy el punto');

  const meshRef = useRef();

  useEffect(() => {
    // Crear geometría del círculo
    const geometry = new CircleGeometry(0.1, 32); // 32 segmentos para suavizar el círculo

    // Crear material del círculo
    const material = new MeshBasicMaterial({
      color: "white",
      transparent: true,
      opacity: 0.7,
      // depthTest: false,
    });

    // Crear malla y asignar geometría y material
    const mesh = new Mesh(geometry, material);

    // Establecer la posición de la malla
      mesh.position.set(position.x, position.y, 0);
    
      //Establecemos el orden de renderizado (no se si se aplica)
      mesh.renderOrder = 1

    // Añadir la malla a la referencia
    meshRef.current.add(mesh);

    // Limpiar la malla cuando el componente se desmonte
    return () => {
      if (meshRef.current) {
        meshRef.current.remove(mesh);
      }
    };
  }, []);

  return <group ref={meshRef} />;
};

export default Punto;
