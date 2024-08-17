import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

const AgregarTerritorio = ({ mostrar }) => {
  // Accede al contexto global y obtiene el store y las actions.
  const { store, actions } = useContext(Context);

  // Estado para almacenar el tipo de territorio seleccionado.
  const [tipoTerritorio, setTipoTerritorio] = useState(null);

  // Estado para almacenar las coordenadas del origen y las conexiones.
  const [origen, setOrigen] = useState({ x: "", y: "" });
  const [conexiones, setConexiones] = useState([]);

  // Maneja los cambios en los inputs del origen, actualizando su estado.
  const cambioDeOrigen = (e) => {
    const { name, value } = e.target;
    setOrigen((prev) => ({ ...prev, [name]: parseInt(value)}));
  };

  // Maneja los cambios en los inputs de las conexiones, actualizando su estado.
  const modificarConexion = (index, e) => {
    const { name, value } = e.target;
    const nuevasConexiones = [...conexiones];
    // Actualiza la conexión correspondiente con el valor nuevo.
    nuevasConexiones[index] = {
      ...nuevasConexiones[index],
      [name]: parseInt(value),
    };
    setConexiones(nuevasConexiones);
  };

  // Agrega una nueva conexión si hay menos de 5 conexiones existentes.
  const agregarConexion = () => {
    if (conexiones.length < 5) {
      setConexiones([...conexiones, { x: "", y: "" }]);
    }
  };

  // Elimina una conexión específica del estado.
  const eliminarConexion = (index) => {
    const nuevasConexiones = conexiones.filter((_, i) => i !== index);
    setConexiones(nuevasConexiones);
  };

  // Actualiza el estado del tipo de territorio cuando se selecciona uno.
  const modificarSeleccionado = (event) => {
    setTipoTerritorio(event.target.value);
  };

  const agregarTerritorio = () => {
    // console.log(tipoTerritorio)
    // console.log(origen)
    // console.log(conexiones);
    if (tipoTerritorio === 'terrestre') {
      console.log('en el if terrestre')
      actions.agregarTerritorioTerrestre(origen, conexiones)
    }

  }


  // Si mostrar es falso, no renderiza nada.
  if (!mostrar) {
    return null;
  }

  // Renderiza el formulario para agregar un territorio y sus conexiones.
  return (
    <div className="m-2 d-flex justify-content-center align-items-center row text-light">
      {/* Selección del tipo de territorio */}
      <select
        className="mt-1 bg-transparent border border-dark form-select form-select-sm color2"
        aria-label="Small select example"
        onChange={modificarSeleccionado}
      >
        <option className="bg-dark" value="">
          Tipo de territorio
        </option>
        <option className="bg-dark" value="terrestre">
          Terrestre
        </option>
        <option className="bg-dark" value="acuático">
          Acuático
        </option>
        <option className="bg-dark" value="costero">
          Costero
        </option>
      </select>

      <div>
        <p className="mt-2 mb-1 color2">Conexiones</p>
        <p className="color2 mb-1 text-center">Origen</p>

        {/* Input para las coordenadas del origen */}
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
                  value={origen.x}
                  onChange={cambioDeOrigen}
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
                  value={origen.y}
                  onChange={cambioDeOrigen}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Muestra las conexiones y sus inputs */}
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
                      value={conexion.x}
                      onChange={(e) => modificarConexion(index, e)}
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
                      value={conexion.y}
                      onChange={(e) => modificarConexion(index, e)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Botón para eliminar la conexión */}
            <div className="col-12 d-flex justify-content-center">
              <button
                className="btn w-75 btn-outline-secondary delete btn-sm mt-1 mb-1 p-0 d-flex justify-content-center align-items-center pb-1"
                onClick={() => eliminarConexion(index)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}

        {/* Botón para agregar una nueva conexión si hay menos de 5 */}
        {conexiones.length < 5 && (
          <div className="col-12 d-flex justify-content-center">
            <button
              className="btn w-75 btn-outline-secondary btn-sm add mt-1 p-0 d-flex justify-content-center align-items-center pb-1"
              onClick={agregarConexion}
            >
              Agregar Conexión
            </button>
          </div>
        )}
      </div>

      {/* Botones para agregar o eliminar el territorio */}
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
      >
        Eliminar último agregado
      </button>
    </div>
  );
};

export default AgregarTerritorio;
