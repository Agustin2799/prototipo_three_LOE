import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

const AgregarTerritorio = ({ mostrar }) => {
  const { store, actions } = useContext(Context);
  const [tipoTerritorio, setTipoTerritorio] = useState(null);

  const tipoSeleccionado = (event) => {
    setTipoTerritorio(event.target.value);
  };

  // useEffect para observar los cambios en tipoTerritorio
  useEffect(() => {
    if (tipoTerritorio !== null) {
      console.log(tipoTerritorio);
    }
  }, [tipoTerritorio]);

  if (!mostrar) {
    return null;
  }

  return (
    <div className="m-2 d-flex justify-content-center align-items-center row text-light">
      <select
        className="mt-1 bg-transparent border border-dark form-select form-select-sm xy"
        aria-label="Small select example"
        onChange={tipoSeleccionado}
      >
        <option className="bg-dark" value="">
          Tipo de territorio
        </option>
        <option className="bg-dark" value="terrestre">
          Terrestre
        </option>
        <option className="bg-dark" value="acuatico">
          Acuático
        </option>
        <option className="bg-dark" value="costero">
          Costero
        </option>
      </select>
      <button type="button" className="btn btn-outline-secondary btn-sm">
        Secondary
      </button>
    </div>
  );
};

export default AgregarTerritorio;
