import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  PlaneGeometry,
  MeshStandardMaterial,
  Mesh,
  TextureLoader,
  LinearFilter,
} from "three";
import imgMapa from "../../img/PrototipoConFiltro.jpg";

/* Sobre fowardRef
Se usa fowardRef para envolver a un componente hijo y pueda acceder a la referencia de un elemento padre a trevéz de las props del hijo, no es bidireccional. Ejemplo del paso de una ref de un hijo a un padre en Notas. */
const MapConCuadricula = forwardRef((props, ref) => {
  /* Sobre planeRef

   Se crea una referencia local llamada planeRef utilizando useRef. Esta referencia apunta a un elemento dentro del componente.
  
  Parámetros de useImperativeHandle:
  
   ref: La ref que se pasó desde el componente padre.
   createHandle: Una función que devuelve un objeto que contiene los métodos o propiedades que deseas exponer.

   deps (opcional): Dependencias que, cuando cambian, hacen que se vuelva a calcular el objeto expuesto. */
  const planeRef = useRef();

  useImperativeHandle(ref, () => ({
    // Devuelve un objeto con los métodos o propiedades que quieres exponer
    getGroup() {
      // Podrías agregar más métodos o propiedades aquí
      // Ejemplo: getAnotherRef: () => anotherRef.current,
      return planeRef.current;
    },
  }));

  useEffect(() => {
    // Si planeRef.current es null o undefined, no hace nada y sale del efecto
    if (!planeRef.current) return;

    // Crea una geometría de plano con 160x120 unidades y una subdivisión de 16x12 segmentos
    const geometry = new PlaneGeometry(160, 120, 16, 12);

    // Carga una textura desde la ruta indicada en 'imgMapa'
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load(imgMapa);

    // Configura los filtros de la textura para mejorar su apariencia al escalarla
    texture.minFilter = LinearFilter; // Filtro para minimizar la textura
    texture.magFilter = LinearFilter; // Filtro para magnificar la textura
    texture.anisotropy = 64; // Mejora la claridad de las texturas vistas en ángulo

    // Crea un material estándar usando la textura cargada
    const material = new MeshStandardMaterial({ map: texture });

    // Crea una malla usando la geometría del plano y el material con textura
    const mesh = new Mesh(geometry, material);

    // Establece el orden de renderizado para esta malla
    mesh.renderOrder = 0;

    // Agrega la malla a la referencia del plano, lo que lo coloca en la escena de Three.js
    planeRef.current.add(mesh);

    // Muestra en consola los objetos hijos añadidos a planeRef (incluyendo la malla)
    console.log("Objetos añadidos a planeRef:", planeRef.current.children);

    // Cleanup function que se ejecuta cuando el componente se desmonta o cuando el efecto se vuelve a ejecutar
    return () => {
      // Remueve la malla de la referencia planeRef
      planeRef.current.remove(mesh);

      // Libera la memoria utilizada por la geometría
      geometry.dispose();

      // Libera la memoria utilizada por el material
      material.dispose();
    };
  }, []);
  //el efecto se ejecuta una sola vez después de que el componente se monta.

  return <group ref={planeRef} />;
});

export default MapConCuadricula;
