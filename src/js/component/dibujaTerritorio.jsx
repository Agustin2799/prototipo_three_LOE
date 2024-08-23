import React, { useEffect, useRef, useContext } from "react";
import { Shape, ShapeGeometry, MeshBasicMaterial, Mesh } from "three";
import { Context } from "../store/appContext";

const DibujaTerritorio = ({ mapa }) => {
  const { store, actions } = useContext(Context);
  const terrRef = useRef();

  useEffect(() => {
    // Array de 20 colores variados
   const obtenerColorPorTipo = (tipoTerritorio) => {
     switch (tipoTerritorio) {
       case "terrestre":
         return 0x00ff00; // Verde brillante
       case "acuatico":
         return 0x0000ff; // Azul brillante
       case "costero":
         return 0xffff00; // Amarillo brillante
       default:
         return 0xffffff; // Blanco por defecto
     }
   };

    const tiposTerritorios = [
      mapa.territorios_terrestres,
      mapa.territorios_costeros,
      mapa.territorios_acuaticos,
    ];

    // Crear una lista de meshes y colores
    const meshes = [];
   

   tiposTerritorios.forEach((tipoTerr) => {
     tipoTerr.forEach((ubicacion) => {
       const tipoTerritorio = ubicacion.tipo; // Asegúrate de que `ubicacion` tenga la propiedad `tipo`
       const colorTerritorio = obtenerColorPorTipo(tipoTerritorio);

       if (ubicacion.vertices_territorio) {
         console.log("hay vertices");

         // Crear la forma
         const shape = new Shape();
         shape.moveTo(
           ubicacion.vertices_territorio[0].x,
           ubicacion.vertices_territorio[0].y
         );
         for (let i = 1; i < ubicacion.vertices_territorio.length; i++) {
           shape.lineTo(
             ubicacion.vertices_territorio[i].x,
             ubicacion.vertices_territorio[i].y
           );
         }
         // Cerrar la forma
         shape.lineTo(
           ubicacion.vertices_territorio[0].x,
           ubicacion.vertices_territorio[0].y
         );

         // Crear la geometría a partir de la forma
         const geometry = new ShapeGeometry(shape);

         // Crear el material con el color basado en el tipo de territorio y transparencia
         const material = new MeshBasicMaterial({
           color: colorTerritorio,
           transparent: true,
           opacity: 0.3, // Nivel de transparencia (0.0 - totalmente transparente, 1.0 - opaco)
         });

         // Crear el mesh y agregarlo al grupo de referencia
         const mesh = new Mesh(geometry, material);
         terrRef.current.add(mesh);
       }
     });
   });

    // Agregar los meshes al grupo
    meshes.forEach((mesh) => {
      terrRef.current.add(mesh);
    });

    // Limpieza al desmontar el componente
    return () => {
      meshes.forEach((mesh) => {
        terrRef.current.remove(mesh);
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
    };
  }, [mapa]); // Dependencia añadida para actualizar si `mapa` cambia

  return <group ref={terrRef} />;
};

export default DibujaTerritorio;
