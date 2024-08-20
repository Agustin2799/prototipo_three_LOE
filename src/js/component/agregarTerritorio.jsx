import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

const AgregarTerritorio = ({ mostrar }) => {
  const { store, actions } = useContext(Context);
  const [tipoTerritorio, setTipoTerritorio] = useState(null);
  const [origen, setOrigen] = useState({ x: "", y: "" });
  const [conexiones, setConexiones] = useState([]);

  // Efecto para actualizar las coordenadas según coordsClickeadas
  useEffect(() => {
    const valuesCoords = store.coordsClickeadas
      ? store.coordsClickeadas
      : { x: 0, y: 0 };
    if (!conexiones.length) {
      // Si no hay conexiones, actualiza el origen
      setOrigen(valuesCoords);
    } else {
      // Si ya hay conexiones, actualiza la última conexión
      const nuevasConexiones = [...conexiones];
      nuevasConexiones[nuevasConexiones.length - 1] = valuesCoords;
      setConexiones(nuevasConexiones);
    }
  }, [store.coordsClickeadas]); // Ejecuta este efecto cada vez que coordsClickeadas cambie

  const cambioDeOrigen = (e) => {
    const { name, value } = e.target;
    setOrigen((prev) => ({
      ...prev,
      [name]: value === "" ? value : parseInt(value),
    }));
  };

  const modificarConexion = (index, e) => {
    const { name, value } = e.target;
    const nuevasConexiones = [...conexiones];
    nuevasConexiones[index] = {
      ...nuevasConexiones[index],
      [name]: value === "" ? value : parseInt(value),
    };
    setConexiones(nuevasConexiones);
  };

  const agregarConexion = () => {
    
      setConexiones([...conexiones, { x: "", y: "" }]);
    
  };

  const eliminarConexion = (index) => {
    const nuevasConexiones = conexiones.filter((_, i) => i !== index);
    setConexiones(nuevasConexiones);
  };

  const modificarSeleccionado = (event) => {
    setTipoTerritorio(event.target.value);
  };

  const agregarTerritorio = () => {
    if (tipoTerritorio !== "costero") {
      console.log("en el if terrestre");
      actions.agregarTerritorio(origen, conexiones, tipoTerritorio);
      // Limpia el estado de conexiones después de agregar el territorio
      setConexiones([]);
    }
  };

  const eliminarUltimoTerritorio = () => {
    if (tipoTerritorio) {
      actions.eliminarUltimoTerritorio(tipoTerritorio);
    }
  };

  if (!mostrar) {
    return null;
  }

  return (
    <div className="m-2 d-flex justify-content-center align-items-center row text-light">
      <select
        className="mt-1 bg-transparent border border-dark form-select form-select-sm color2 shadow-none"
        aria-label="Small select example"
        onChange={modificarSeleccionado}
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

      <div className="container-fluid">
        <p className="mt-2 mb-1 color2 w-100 p-0 ms-1">Conexiones</p>
        <p className="color2 mb-1 text-center">Origen</p>

        <div className="input-group input-group-sm mb-3 justify-content-evenly mt-1">
          <div className="row w-100">
            <div className="col-6">
              <div className="input-group">
                <span
                  className="input-group-text color3 bg-transparent border border-dark h-100"
                  id="inputGroup-sizing-sm"
                >
                  X
                </span>
                <input
                  type="number"
                  className="form-control bg-transparent border border-dark text-light shadow-none mb-1"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  name="x"
                  value={origen.x || 0}
                  onChange={cambioDeOrigen}
                  min="-Infinity"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="input-group">
                <span
                  className="input-group-text color3 bg-transparent border border-dark h-100"
                  id="inputGroup-sizing-sm"
                >
                  Y
                </span>
                <input
                  type="number"
                  className="form-control bg-transparent border border-dark text-light shadow-none mb-1"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  name="y"
                  value={origen.y || 0}
                  onChange={cambioDeOrigen}
                  min="-Infinity"
                />
              </div>
            </div>
          </div>
        </div>

        {conexiones.map((conexion, index) => (
          <div key={index}>
            <p className="color2 mb-1 text-center">Conexión {index + 1}</p>

            <div className="input-group input-group-sm mb-0 justify-content-evenly">
              <div className="row w-100">
                <div className="col-6">
                  <div className="input-group">
                    <span
                      className="input-group-text color3 bg-transparent border border-dark h-100"
                      id="inputGroup-sizing-sm"
                    >
                      X
                    </span>
                    <input
                      type="number"
                      className="form-control bg-transparent border border-dark text-light shadow-none mb-1"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      name="x"
                      value={conexion.x || 0}
                      onChange={(e) => modificarConexion(index, e)}
                      min="-Infinity"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group">
                    <span
                      className="input-group-text color3 bg-transparent border border-dark h-100"
                      id="inputGroup-sizing-sm"
                    >
                      Y
                    </span>
                    <input
                      type="number"
                      className="form-control bg-transparent border border-dark text-light shadow-none mb-1"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      name="y"
                      value={conexion.y || 0}
                      onChange={(e) => modificarConexion(index, e)}
                      min="-Infinity"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12  d-flex justify-content-center w-row">
              <button
                className="btn col-12 btn-ancho-especifico btn-outline-secondary btn-sm add mt-3 p-0 d-flex justify-content-center align-items-center pb-1"
                onClick={() => eliminarConexion(index)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}

          <div className="col-12 d-flex justify-content-center row">
            <button
              className="btn ms-4 col-12 btn-outline-secondary btn-sm add mt-3 p-0 d-flex justify-content-center align-items-center pb-1"
              onClick={agregarConexion}
            >
              Agregar Conexión
            </button>
          </div>
      </div>

      <button
        type="button"
        className="btn btn-outline-secondary btn-sm add mt-3 p-0 d-flex justify-content-center align-items-center pb-1"
        onClick={agregarTerritorio}
      >
        Agregar territorio {tipoTerritorio}
      </button>
      <button
        type="button"
        className="btn btn-outline-secondary delete btn-sm mt-2 p-0 d-flex justify-content-center align-items-center pb-1"
        onClick={eliminarUltimoTerritorio}
      >
        Eliminar último agregado - {tipoTerritorio}
      </button>
    </div>
  );
};

export default AgregarTerritorio;
