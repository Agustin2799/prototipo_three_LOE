import React, { useRef, useEffect, useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { AxesHelper, Raycaster, Vector2 } from "three";
import MapConCuadricula from "./component/mapConCuadricula.jsx";
import { Context } from "./store/appContext.js";

const raycaster = new Raycaster();
const mouse = new Vector2();

const Ejes = () => {
  const ejes = useRef();
  useEffect(() => {
    const xyzEjes = new AxesHelper(300);
    ejes.current.add(xyzEjes);
    console.log("Posición inicial de ejes:", ejes.current.position);
  }, []);
  return <group ref={ejes} />;
};

const degreesToRadians = (degrees) => degrees * (Math.PI / 180);

const onMouseClick = (event, camera, map) => {
  // Obtén las dimensiones del canvas
  const canvas = event.target;
  const rect = canvas.getBoundingClientRect();

  // Calcula las coordenadas del ratón en relación con el canvas
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;g

  if (camera && map && map.current) {
    console.log("Posición de la cámara:", camera.position);
    console.log("Objetos en map.current:", map.current.getGroup().children);
    raycaster.setFromCamera(mouse, camera);

    // Verifica que map.current.children contenga los objetos esperados
    console.log("Objetos en map.current:", map.current.getGroup().children);

    // Prueba con intersectObjects usando los objetos del grupo
    const objects = map.current.getGroup().children;
    if (objects.length > 0) {
      const intersects = raycaster.intersectObjects(objects);
      console.log("Intersecciones encontradas:", intersects);
      if (intersects.length > 0) {
        const firstIntersect = intersects[0];
        console.log("Posición del objeto:", firstIntersect.point);
        console.log("Objeto intersectado:", firstIntersect.object.position);
      }
    } else {
      console.log("No hay objetos en el grupo para intersecar.");
    }
  } else {
    console.error("No se pudo acceder a la referencia del mapa o la cámara.");
  }
};

function App() {
  const  planeRef  = useRef();
  const { store } = useContext(Context);
  const cameraRef = useRef();

  useEffect(() => {
    const handleClick = (event) =>
      onMouseClick(event, cameraRef.current, planeRef);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const posicionCamara = [
    store.posicionCamara.x,
    store.posicionCamara.y,
    store.posicionCamara.z,
  ];

  return (
    <>
      <div id="menu">
        <p>Hola soy un p</p>
      </div>
      <div id="canvasContainer">
        <Canvas>
          <ambientLight intensity={1} />
          <MapConCuadricula ref={planeRef} />
          <Ejes />
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={posicionCamara}
            fov={50}
            rotation={[
              degreesToRadians(0),
              degreesToRadians(0),
              degreesToRadians(0),
            ]}
          />
        </Canvas>
      </div>
    </>
  );
}

export default App;
