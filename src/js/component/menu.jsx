import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import MenuAgregarUbicacion from "./menuAgregarUbicacion.jsx";
import MenuAgregarMarcador from "./menuAgregarMarcador.jsx";
import MenuAgregarTerritorio from "./menuAgregarTerritorio.jsx";

const Menu = () => {
  const { store, actions } = useContext(Context);
  
  //cambiamos la bandera del store para mostrar agregar territorio
  const mostrarMenuAgregarUbicacion = () => {
    actions.changeBanderas("mostrar menu agregar ubicacion");
  };
  
  //Cambiamos la bandera de menuAgregarTerritorio
  const mostrarMenuAgregarTerritorio = () => {
    actions.changeBanderas("mostrar menu agregar territorio")
  }
  
  //cambiamos la bandera del store para mostrar las conexiones
   const mostrarConexiones = () => {
     actions.changeBanderas("mostrar conexiones");
   };
  //Guardamos los cambios localmente
  const guardarCambios = () => {
    actions.guardarDatosDelJuegoEnBackend();
    actions.guardarMarcadoresEnBackend();

  }
  //Imprime los datos del juego en la consola.
  const imprimirDatos = () => {
    actions.imprimirDatosDelJuego();
  }
  const mostrarMenuAgregarMarcadores = () => {
    actions.changeBanderas("mostrar menu agregar marcador");
  };
  const mostrarMarcadores = () => {
    actions.changeBanderas("mostrar marcadores");
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
          onChange={mostrarMenuAgregarUbicacion}
        />
        <p className="col-12 m-0 color1">Agregar ubicación</p>
      </div>
      <MenuAgregarUbicacion mostrar={store.banderas.menuAgregarUbicacion} />
      <div className="form-check form-switch ms-2">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          onChange={mostrarConexiones}
        />
        <p className="col-12 m-0 color1">Mostrar Ubicaciones y Conexiones</p>
      </div>
      <div className="form-check form-switch ms-2">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          onChange={mostrarMenuAgregarMarcadores}
        />
        <p className="col-12 m-0 color1">Agregar marcadores</p>
      </div>
      <MenuAgregarMarcador mostrar={store.banderas.menuAgregarMarcador} />
      <div className="form-check form-switch ms-2">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          onChange={mostrarMarcadores}
        />
        <p className="col-12 m-0 color1">Mostrar marcadores</p>
      </div>
      <div className="form-check form-switch ms-2">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          onChange={mostrarMenuAgregarTerritorio}
        />
        <p className="col-12 m-0 color1">Agregar Territorio</p>
      </div>
      <MenuAgregarTerritorio mostrar={store.banderas.menuAgregarTerritorio}/>
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
