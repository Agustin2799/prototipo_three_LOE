import React, { useRef, useEffect, useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, MapControls } from "@react-three/drei";
import { Raycaster, Vector2 } from "three";
import MapConCuadricula from "./component/mapConCuadricula.jsx";
import Ejes from "./component/ejes.jsx";
import { Context } from "./store/appContext.js";
import Menu from "./component/menu.jsx";
import DibujaPunto from "./component/dibujaPunto.jsx";
import DibujarConexiones from "./component/dibujaLineas.jsx";
import DibujaTerritorio from "./component/dibujaTerritorio.jsx";

/* Sobre Raycaster

Raycaster es una clase en Three.js, que representa un tipo de rayo, que se utiliza para lanzar.

rayos en la escena 3D.Se usa para detectar qué objetos 3D están intersectando con el rayo, lo cual es útil para tareas como seleccionar objetos, realizar colisiones, o interactuar con la escena.

Si se quisiera lanzar rayos desde otro punto de la escena, se puodría aplicar Ray().

Inicialmente, el rayo no está definido hasta que se le configure con un origen y una dirección.

CONFIGURACIÓN DEL RAYO: se configura usando la función setFromCamera, que toma un vector de coordenadas normalizadas (de -1 a 1) y la cámara desde la cual se lanza el rayo.

ITERSECCIÓN DE OBJETOS:
Una vez que el rayo está configurado, puedes usar el Raycaster para detectar qué objetos intersecta el rayo.

const intersects = raycaster.intersectObjects(objects);

- objects: Un array de objetos 3D que quieres comprobar si son intersectados por el rayo.

 - intersects: Un array de objetos de intersección, que contiene detalles sobre los objetos que el rayo ha intersectado. */
const raycaster = new Raycaster();
/* Sobre Vector2

Vector2 es una clase que representa un vector (una dirección) o un punto en un espacio bidimensional. Es útil para manipular coordenadas en 2D, como las coordenadas del ratón en una superficie de visualización.

Inicialmente, el vector tendrá las coordenadas (0, 0), x e y.

Diferencia Entre Punto y Vector
 Punto:
 Un punto en un espacio 2D puede ser representado por Vector2 simplemente usando sus coordenadas (x, y). Por ejemplo, new Vector2(2, 3) representa el punto (2, 3).

 Dirección:
 Un vector puede representar una dirección y magnitud. La dirección es indicada por sus componentes, y la magnitud puede ser calculada usando el método length().

 ¿Cómo Funciona el Cálculo de Direcciones?
 El cálculo de direcciones y posiciones a partir de vectores a menudo involucra la diferencia entre dos puntos. Por ejemplo:

const pointA = new Vector2(0, 0);
 const pointB = new Vector2(1, 1);
 const direction = pointB.clone().sub(pointA);
 direction ahora es (1, 1), representando la dirección de A a B

direction es el vector que va de pointA a pointB. La operación sub() realiza la resta de coordenadas. */
const coordenadasMouse = new Vector2();

/* Sobre obtenerCoordenadasDelMapa()
la función obtenerCoordenadasDelMapa tiene como objetivo calcular las coordenadas en el espacio 3D de un punto en un mapa cuando el usuario interactúa con la pantalla mediante un evento, como un clic. */
const obtenerCoordenadasDelMapa = (event, camera, map) => {
  /* Sobre event.target
   event.target te da una referencia directa al elemento HTML en el que se originó el evento (como un clic, un movimiento del ratón, etc. */
  const canvas = event.target;
  /* Sobre getBoundingClientRect
  getBoundingClientRect() es un método del objeto Element en el DOM (Document Object Model). Este método devuelve un objeto DOMRect que proporciona información sobre el tamaño y la posición de un elemento en relación con la ventana de visualización (viewport). */
  const rect = canvas.getBoundingClientRect();

  /* Sobre las Coordenadas Normarizadas

  Las coordenadas normalizadas son una técnica común en gráficos 3D para mapear las coordenadas de un sistema de coordenadas de pantalla (2D) a un rango estándar que pueda ser utilizado en cálculos de intersección y otras operaciones en el espacio 3D. A continuación, te explico en detalle cómo se realizan estos cálculos y su propósito.

   ¿Qué Son las Coordenadas Normalizadas? 

  Las coordenadas normalizadas suelen estar en un rango de [−1,1] para ambos ejes x e y. Este rango es útil porque:

  Uniformidad: Permite que los cálculos y las interacciones sean consistentes independientemente del tamaño del canvas o de la ventana del navegador.

  Compatibilidad con la Cámara: En Three.js, las coordenadas normalizadas permiten al Raycaster determinar la dirección del rayo a partir de la posición del ratón en relación con la cámara.

  Calcula las coordenadas del ratón en relación con el canvas. */
  coordenadasMouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  coordenadasMouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  /* Sobre runRaycaster()

Verificación de Referencias:
  Primero, el código verifica si camera y map están definidos y no son nulos. Si alguna de estas referencias no está disponible, el código muestra un mensaje de error en la consola y no realiza más acciones.

Configuración del Raycaster:
  Si las referencias son válidas, se configura el raycaster utilizando la cámara y las coordenadas del mouse (coordenadasMouse). Esto permite determinar qué objetos en la escena están siendo apuntados por el raycast generado a partir de la posición del mouse.

Obtención de Objetos del Grupo:
  Obtiene la lista de objetos hijos del grupo asociado a map.current. Estos objetos son los que el raycaster tratará de intersecar.

Intersección de Objetos:
  Si hay objetos en el grupo, el raycaster se usa para determinar qué objetos intersecta con el rayo generado desde la cámara a través de las coordenadas del mouse.

  Si se encuentran intersecciones, se toma la primera intersección (intersects[0]) y se retorna la posición del punto de intersección (firstIntersect.point).

Manejo de Casos Sin Objetos:
  Si no hay objetos en el grupo, se muestra un mensaje en la consola indicando que no hay objetos disponibles para realizar la intersección.

Manejo de Referencias No Válidas:
  Si las referencias a la cámara o al mapa no están disponibles, se muestra un mensaje de error en la consola.  

*/
  const runRaycaster = () => {
    if (camera && map) {
      // console.log("Posición de la cámara:", camera.position);
      // console.log("Objetos en map.current:", map.current.getGroup().children);
      raycaster.setFromCamera(coordenadasMouse, camera);

      // Verifica que map.current.children contenga los objetos esperados
      // console.log("Objetos en map.current:", map.current.getGroup().children);

      // Prueba con intersectObjects usando los objetos del grupo
      const objects = map.getGroup().children;
      if (objects.length > 0) {
        const intersects = raycaster.intersectObjects(objects);
        // console.log("Intersecciones encontradas:", intersects);
        if (intersects.length > 0) {
          const firstIntersect = intersects[0];
          // console.log("Posición del mapa clickeada:", firstIntersect.point);
          //console.log(firstIntersect.point);
          return firstIntersect.point;
        }
      } else {
        console.log("No hay objetos en el grupo para intersecar.");
      }
    } else {
      console.error("No se pudo acceder a la referencia del mapa o la cámara.");
    }
  };

  return runRaycaster();
};

function App() {
  /* Sobre el hook useRef
   Las referencias en React (useRef) permiten acceder directamente a un elemento o componente DOM,
   o bien a una instancia de un componente de React, fuera del flujo normal de renderizado.
   Esto es útil cuando necesitas interactuar con el DOM o con instancias de componentes de manera directa,
   sin necesidad de pasar a través del flujo habitual de props y estado.
   */
  // Referencia al componente MapConCuadricula
  const planeRef = useRef();
  // Acceso al contexto de la aplicación
  const { store, actions } = useContext(Context);
  // Referencia a la cámara PerspectiveCamera
  const cameraRef = useRef();
  //Referencia al canvas para los eventos
  const canvasContainer = useRef();

  

  // Tiempo mínimo en milisegundos para que un evento sea considerado un clic (ajustar según necesidad).
  const TIEMPO_MAXIMO_CLIC = 200;
  const tiempoPresionadoRef = useRef(0);
  const esClic = useRef(true);

  /* Sobre este useEffect

    Este useEffect se encarga de gestionar los eventos de clic y de arrastre en el canvas del mapa 3D. 

    - `mousedown`: Registra el momento en que el usuario presiona el botón del ratón, estableciendo un temporizador para determinar si el evento se considera un clic o un arrastre.
    - `mouseup`: Registra el momento en que el usuario suelta el botón del ratón. Compara el tiempo transcurrido desde el `mousedown` para decidir si se trata de un clic o un arrastre. Si el tiempo supera un umbral definido (TIEMPO_MAXIMO_CLIC), se considera un arrastre y no se actualizarán las coordenadas.
    - `click`: Se ejecuta cuando se detecta un clic en el canvas. Calcula las coordenadas del clic en el mapa 3D y, si es un clic (y no un arrastre), actualiza el estado global con estas coordenadas mediante `actions.changeCoordsClickeadas`.

    Además, el `useEffect` asegura que todos los manejadores de eventos se eliminen correctamente cuando el componente se desmonte para evitar fugas de memoria.

    Nota: Los manejadores de eventos se añaden al canvas del mapa y se eliminan en la función de limpieza del `useEffect`.

*/
  useEffect(() => {
    const click = (event) => {
      const coords = obtenerCoordenadasDelMapa(
        event,
        cameraRef.current,
        planeRef.current
      );
      if (coords && esClic.current) {
        actions.changeCoordsClickeadas(coords.x, coords.y);
      }
    };

    const mouseDown = () => {
      tiempoPresionadoRef.current = Date.now();
      esClic.current = true;
    };

    const mouseUp = () => {
      const tiempoPresionado = Date.now() - tiempoPresionadoRef.current;
      if (tiempoPresionado > TIEMPO_MAXIMO_CLIC) {
        esClic.current = false;
      }
    };

    const canvas = canvasContainer.current;

    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mouseup", mouseUp);
    canvas.addEventListener("click", click);

    return () => {
      canvas.removeEventListener("mousedown", mouseDown);
      canvas.removeEventListener("mouseup", mouseUp);
      canvas.removeEventListener("click", click);
    };
  }, []);

  /* Sobre las coordenadas de la cámara
   Se obtienen las coordenadas actuales de la cámara desde el estado global.
   Estas coordenadas se usan para posicionar la cámara en el componente Canvas.
   */
  const posicionCamara = [
    store.posicionCamara.x,
    store.posicionCamara.y,
    store.posicionCamara.z,
  ];

  return (
    <>
      <div id="menu">
        <Menu />
      </div>
      <div id="canvasContainer" ref={canvasContainer}>
        <Canvas style={{ background: "black" }}>
          {/* Luz ambiental para la escena */}
          <ambientLight intensity={1} />
          {/* Componente con la cuadrícula del mapa */}
          <MapConCuadricula ref={planeRef} />
          {/* Componente para mostrar los ejes */}
          <Ejes />
          {/* Dibuja las ubicaciones en el mapa */}
          <DibujaPunto
            coordenadas={store.datosDelJuego.mapa}
            mostrar={store.banderas.mostrarConexiones}
            tipo={"ubicaciones"}
          />
          {/* Dibuja las ubicaciones en el mapa */}
          <DibujaPunto
            coordenadas={store.marcadores}
            mostrar={store.banderas.mostrarMarcadores}
            tipo={"marcadores"}
          />
          {/* Dibuja las conecciones de los puntos */}
          <DibujarConexiones
            mapa={store.datosDelJuego.mapa}
            mostrar={store.banderas.mostrarConexiones}
          />
          {/* Dibuaja los territorios */}
          <DibujaTerritorio />
          {/* Configuración de la cámara con posición, campo de visión y rotación */}
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={posicionCamara}
            fov={50}
            rotation={[0, 0, 0]}
          />
          <MapControls
            enableDamping
            dampingFactor={0.3}
            zoomSpeed={1.8}
            minDistance={10}
            maxDistance={500}
            enableRotate={false} // Desactiva la rotación si solo quieres paneo y zoom
            enableZoom={true} // Asegúrate de que el zoom solo responda al scroll
            screenSpacePanning={true} // Paneo en el espacio de la pantalla, permite que el movimiento en Y funcione
            target={[0, 0, 0]} // Configura el punto de interés
          />
        </Canvas>
      </div>
    </>
  );
}

export default App;
