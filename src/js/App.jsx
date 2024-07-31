// Importaciones necesarias para el componente
import React, {useRef, useEffect} from "react"; // Importa React y hooks
import { Canvas } from "@react-three/fiber"; // Importa funcionalidades de react-three/fiber
import { PerspectiveCamera } from "@react-three/drei"; // Importa PerspectiveCamera desde @react-three/drei
import MapConCuadricula from "./component/mapConCuadricula.jsx";
import { AxesHelper } from "three";
import Cubo from "./component/cubo.jsx"
import Punto from "./component/punto.jsx";
import Dropdown from "./component/dropdown.jsx";


let objetos = {
  plano: {
    ladosYDivisiones: 20,
    puntos: []
  },
  cubos: [
    { position: [5, 4, 0], dimentions: [0.5, 0.5, 1], color: "red" },
    { position: [3, 3, 0], dimentions: [0.5, 0.5, 1], color: "blue" },
    { position: [1, 7, 0], dimentions: [0.5, 0.5, 1], color: "yellow" },
    { position: [9, 9, 0], dimentions: [0.5, 0.5, 1], color: "purple" },
  ],
};
const unidades = objetos.plano.ladosYDivisiones/2;

  for (let x = -unidades + 1; x <= unidades - 1; x++) {
    for (let y = -unidades + 1; y <= unidades - 1; y++) {
      objetos.plano.puntos = [...objetos.plano.puntos, { x: x, y: y }];
    }
  }

console.log(objetos.plano.puntos)


const Ejes = () => {
  const ejes = useRef()
  useEffect(() => {
    const xyzEjes = new AxesHelper(10)
    ejes.current.add(xyzEjes)
    
  },[])
  return <group ref={ejes} />
}

// Función para convertir grados a radianes
const degreesToRadians = (degrees) => degrees * (Math.PI / 180);
// Componente principal de la aplicación
function App() {
  // Devolver el Canvas de react-three/fiber, que contiene los controles de la cámara y el plano con la cuadrícula
  return (
    <>
      <Dropdown
        options={["Mover", "Custodiar", "Atacar"]}
        position={[123,123]}
        visible={true}
      />
      <Canvas>
        {/* Configura la cámara con posición y otras propiedades */}
        <Ejes />
        <PerspectiveCamera
          makeDefault
          position={[4, -8, 8]} //[x(rojo) y(Verde) z(azul)] y es arriba y abajo y z es en profundida.
          fov={50}
          rotation={[degreesToRadians(50), degreesToRadians(-3), 0]}
        />
        <MapConCuadricula ladosYDivisiones={objetos.plano.ladosYDivisiones} />
        {objetos.plano.puntos.map((element, index) => {
          return <Punto position={element} key={index} />;
        })}
        {objetos.cubos.map((element, index) => {
          return (
            <Cubo
              position={element.position}
              dimentions={element.dimentions}
              color={element.color}
              key={index}
            />
          );
        })}
      </Canvas>
    </>
  );
}

// Exportar el componente App como el componente por defecto del módulo
export default App;