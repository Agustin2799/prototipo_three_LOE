import React, { useEffect, useContext, useRef } from "react";
import { Context } from "../store/appContext";

// Componente que muestra un menú para agregar un marcador en un mapa.
const MenuAgregarMarcador = ({ mostrar }) => {
  // Extrae el estado y las acciones del contexto global.
  const { store, actions } = useContext(Context);

  // Ref para almacenar las coordenadas clickeadas anteriormente.
  const refClickeadasAnteriores = useRef(store.coordsClickeadas);

  // Efecto que se ejecuta cuando el componente se monta o cuando cambian las coordenadas clickeadas o el estado de 'mostrar'.
  useEffect(() => {
    if (mostrar) {
      console.log(store.marcadores);
    }
  }, [store.coordsClickeadas, mostrar]);

  // Función que verifica si las coordenadas clickeadas actuales son diferentes de las anteriores y si la referencia no es null.
  const sonDiferentesYrefNoNull = () => {
    // Verifica si la referencia anterior no es null.
    const refNoNull = refClickeadasAnteriores.current.x ? true : false;
    // Compara las coordenadas actuales con las anteriores.
    const x = refClickeadasAnteriores.current.x !== store.coordsClickeadas.x;
    const y = refClickeadasAnteriores.current.y !== store.coordsClickeadas.y;

    // Retorna verdadero si las coordenadas son diferentes y la referencia no es null.
    return (x || y) && refNoNull;
  };

  // Función que llama a la acción para eliminar el último marcador.
  const eliminarUltimoMarcador = () => {
    actions.eliminarUltimoMarcador();
  };

  /*Efecto que se ejecuta cuando cambian las coordenadas clickeadas o el estado de 'mostrar'.
    Verifica si 'mostrar' es verdadero y si las coordenadas clickeadas son diferentes de las anteriores y la referencia no es null.
    Si ambas condiciones son verdaderas, llama a la acción para agregar un nuevo marcador.
    Luego, actualiza la referencia con las coordenadas clickeadas actuales para futuras comparaciones.
    Si no se cumplen las condiciones, simplemente actualiza la referencia con las coordenadas clickeadas actuales.
    Esto asegura que la referencia se mantenga actualizada incluso si no se agrega un marcador.
    La lista de dependencias incluye `store.coordsClickeadas` y `mostrar`. El efecto se vuelve a ejecutar si cualquiera de estos cambia.
   */
  useEffect(() => {
    if (mostrar && sonDiferentesYrefNoNull()) {
      actions.agregarMarcador();
      refClickeadasAnteriores.current = store.coordsClickeadas;
    } else {
      refClickeadasAnteriores.current = store.coordsClickeadas;
    }
  }, [store.coordsClickeadas, mostrar]);

  // Si 'mostrar' es falso, no se renderiza nada.
  if (!mostrar) {
    return null;
  }

  return (
    <div className="m-2 d-flex justify-content-center align-items-center row text-light">
      <div className="col-12 d-flex justify-content-center row">
        <button
          className="btn col-12 btn-outline-secondary btn-sm delete mt-1 p-0 d-flex justify-content-center align-items-center pb-1"
          onClick={eliminarUltimoMarcador} // Asocia la función para eliminar el último marcador al evento de clic.
        >
          Eliminar último marcador agregado
        </button>
      </div>
    </div>
  );
};

export default MenuAgregarMarcador;
