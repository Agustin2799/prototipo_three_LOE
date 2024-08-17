import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import AgregarTerritorio from "./agregarTerritorio.jsx";

const Menu = () => {
  const { store } = useContext(Context);
  const [mostrarAgregarTerritorio, setMostrarAgregarTerritorio] =
    useState(false);
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
          onChange={() => {
            setMostrarAgregarTerritorio(!mostrarAgregarTerritorio);
          }}
        />
        <p className="col-12 m-0 color1">Agregar territorio:</p>
      </div>
      <AgregarTerritorio mostrar={mostrarAgregarTerritorio} />
    </div>
  );
};

export default Menu;
