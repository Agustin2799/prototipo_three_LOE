import React, { useEffect, useRef, useState, useContext } from "react";
import { Mesh, BoxGeometry, MeshBasicMaterial } from "three";
import { Context } from "../store/appContext";

// Componente del cubo
const Cubo = ({ position, dimentions, color }) => {
  const { store, actions } = useContext(Context)
  const cubeRef = useRef();
  const [ubication, setPosition] = useState(position);
  const [dimention, setDimention] = useState(dimentions);
  const [coloor, setColoor] = useState(color);

  const cuboClickeado = (options, position, visible, objetoSeleccionado) => {
    actions.changeDropdown(options, position, visible, objetoSeleccionado)
  }

  useEffect(() => {
    // Limpiar cualquier contenido anterior en el grupo
    while (cubeRef.current.children.length > 0) {
      cubeRef.current.remove(cubeRef.current.children[0]);
    }
    //Creamos la geometría del cubo
    const geometry = new BoxGeometry(dimention[0], dimention[1], dimention[2]); // x y z
    //Creamos el matierial del cubo
    const material = new MeshBasicMaterial({ color: coloor });
    //Creamos la malla y le asignamos la geometría y el material.
    const mesh = new Mesh(geometry, material);
    //Modificamos la ubicación del cubo con estos valores (x y z)
    mesh.renderOrder = 3;
    mesh.position.set(
      ubication[0],
      ubication[1],
      ubication[2] + dimention[2] / 2
    );
    //Agregamos la malla con la forma y el material a la referencia.
    cubeRef.current.add(mesh);
  }, [ubication, dimention, coloor]);
  return (
      <group
        ref={cubeRef}
        onClick={(e) => {
          e.stopPropagation();
          cuboClickeado(['Atacar', 'Mostrar info', 'Mover'], [e.clientX, e.clientY], true, {coordenadas: position, tipo: 'cubo'})
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setColoor("white");
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setColoor(color);
        }}
      />
  );
};

export default Cubo;
