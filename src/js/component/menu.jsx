import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import AgregarTerritorio from "./agregarTerritorio.jsx";

const Menu = () => {
  const { store, actions } = useContext(Context);
  
  //cambiamos la bandera del store para mostrar agregar territorio
  const showTerritorios = () => {
    actions.changeBanderas('agregar territorios')
  }
  //cambiamos la bander del store para mostrar los puntos
 const showPuntos = () => {
   actions.changeBanderas("mostrar puntos");
 };
  //cambiamos la bandera del store para mostrar las conexiones
   const showConexiones = () => {
     actions.changeBanderas("mostrar conexiones");
   };
  //Guardamos los cambios localmente
  const guardarCambios = () => {
    actions.guardarDatosEnBackend();
  }
  //Imprime los datos del juego en la consola.
  const imprimirDatos = () => {
    actions.imprimirDatosDelJuego();
  }
  
  return (
    <div>
      <div className="m-2 d-flex justify-content-center align-items-center row text-light">
        <p className="col-12 m-0 color1">Coordenadas Seleccionadas:</p>
        <p className="col-12 m-0">
          <span className="ms-3 color3">X:</span> {store.coordsClickeadas.x}
          <span className="ms-3 color3">Y:</span> {store.coordsClickeadas.y}
        </p>
      </div>
      <div className="form-check form-switch ms-2">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          onChange={showTerritorios}
        />
        <p className="col-12 m-0 color1">Agregar territorio:</p>
      </div>
      <AgregarTerritorio mostrar={store.banderas.agregarTerritorio} />
      <div className="form-check form-switch ms-2">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          onChange={showPuntos}
        />
        <p className="col-12 m-0 color1">Mostrar puntos</p>
      </div>
      <div className="form-check form-switch ms-2">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          onChange={showConexiones}
        />
        <p className="col-12 m-0 color1">Mostrar conexiones</p>
      </div>
      <div className="col-12 d-flex flex-column align-items-center justify-content-center">
        <button
          type="button"
          className="btn btnMenu btn-outline-secondary btn-sm add mt-3 p-0 text-center pb-1"
          onClick={guardarCambios}
        >
          Guardar cambios
        </button>
        <button
          type="button"
          className="btn btnMenu btn-outline-secondary btn-sm add mt-3 p-0 text-center pb-1"
          onClick={imprimirDatos}
        >
          Imprimir datos del juego
        </button>
      </div>
    </div>
  );
};

export default Menu;
