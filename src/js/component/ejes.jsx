import React, { useEffect, useRef } from "react";
import { AxesHelper } from "three";

//Componente para los ejes visuales
const Ejes = () => {
  //Creamos la referencia para los ejes.
  const ejes = useRef();
  useEffect(() => {
    /* Sobre el AxesHelper
    Inicializamos la clase AxesHelper, que es una herramienta visual utilizada para mostrar los ejes X, Y, y Z en la escena. Esto es útil para entender la orientación y la escala de los objetos en el espacio 3D. */
    const xyzEjes = new AxesHelper(300);

    /* Sobre el objeto current
    Agregamos los ejes (xyzEjes) al objeto current de la referencia ejes. current es la propiedad principal y la única propiedad estándar del objeto devuelto por useRef(). Es un contenedor mutable que puede almacenar cualquier tipo de valor, ya sea un nodo del DOM, un objeto de Three.js, una referencia a una instancia de clase, o cualquier dato que desees persistir entre renders. */
    ejes.current.add(xyzEjes);
  }, []);

  /* Sobre <group ref={ejes} />

  <group> es un componente proporcionado por @react-three/fiber que representa un objeto Group de Three.js. 
  Un Group en Three.js es un contenedor que puede tener múltiples objetos 3D como hijos. 
  Todos los objetos dentro de un grupo se moverán, rotarán, y escalarán juntos, como si fueran una sola entidad.

  Es una forma de organizar la jerarquía de objetos en una escena 3D.

  ref={ejes} asocia la referencia ejes (creada con useRef()) al grupo de Three.js que este componente group representa.

   Después de que el componente se monte, ejes.current apuntará a la instancia de Group en Three.js que corresponde a este <group>. Esto permite manipular el grupo y acceder a él directamente desde otros lugares en tu código.

   AGREGAR OBJETOS AL GRUPO: Puedes añadir objetos 3D (como mallas, luces, etc.) al grupo utilizando ejes.current.add(someObject).

   MANIPULAR TRANSFORMACIONES: Puedes cambiar la posición, rotación, o escala del grupo completo modificando ejes.current.position, ejes.current.rotation, o ejes.current.scale.

   ACCEDER A HIJOS: Puedes acceder a los objetos hijos del grupo a través de ejes.current.children. */
  return <group ref={ejes} />;
};

export default Ejes;
