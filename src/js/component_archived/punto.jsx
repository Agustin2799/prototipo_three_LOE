import React, { useEffect, useRef, useState, useContext } from "react";
import { Mesh, MeshBasicMaterial, CircleGeometry } from "three";
import { Context } from "../store/appContext.js";
import DibujarLinea from "./dibujaLinea.jsx";

const Punto = ({ position }) => {
  const { store, actions } = useContext(Context);
  //Estado bandera que idica si se está haciendo over sobre el punto
  const [hover, setHover] = useState(false);
  const meshRef = useRef();

  if (hover) {
    console.log(`El PUNTO x:${position.x} y:${position.y} está en HOVER`);
  }
  const inicio = store.dropdown.objetoSeleccionado.coordenadas;
  console.log(inicio);
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
    mesh.renderOrder = 1;
    // Añadir la malla a la referencia
    meshRef.current.add(mesh);
    // Limpiar la malla cuando el componente se desmonte
    return () => {
      if (meshRef.current) {
        meshRef.current.remove(mesh);
      }
    };
  }, []);

  return (
    <>
      {hover && inicio && store.moverObjeto ? (
        <DibujarLinea start={inicio} end={[position.x, position.y, 0]} />
      ) : null}
      <group
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHover(false);
        }}
      />
    </>
  );
};

export default Punto;
