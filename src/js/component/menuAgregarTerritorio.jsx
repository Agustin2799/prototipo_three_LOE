import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

const MenuAgregarTerritorio = ({ mostrar }) => {
  const { store, actions } = useContext(Context);
  const [tipoTerritorio, setTipoTerritorio] = useState('terrestre');
  const [origen, setOrigen] = useState({ x: "", y: "" });
  const [vertices, setVertices] = useState([]);

  // useEffect(() => {
  //   console.log(mostrar)
  // },[mostrar])

  // Efecto para actualizar las coordenadas según coordsClickeadas
  useEffect(() => {
    const valuesCoords = store.coordsClickeadas
      ? store.coordsClickeadas
      : { x: 0, y: 0 };
    if (!vertices.length) {
      // Si no hay vertices, actualiza el origen
      setOrigen(valuesCoords);
    } else {
      // Si ya hay vertices, actualiza la última conexión
      const nuevasvertices = [...vertices];
      nuevasvertices[nuevasvertices.length - 1] = valuesCoords;
      setVertices(nuevasvertices);
    }
  }, [store.coordsClickeadas]); // Ejecuta este efecto cada vez que coordsClickeadas cambie

  const cambioDeOrigen = (e) => {
    const { name, value } = e.target;
    setOrigen((prev) => ({
      ...prev,
      [name]: value === "" ? value : parseInt(value),
    }));
  };

  const modificarVertice = (index, e) => {
    const { name, value } = e.target;
    const nuevasvertices = [...vertices];
    nuevasvertices[index] = {
      ...nuevasvertices[index],
      [name]: value === "" ? value : parseInt(value),
    };
    setVertices(nuevasvertices);
  };

  const agregarVertice = () => {
    setVertices([...vertices, { x: "", y: "" }]);
  };

  const eliminarVertice = (index) => {
    const nuevasvertices = vertices.filter((_, i) => i !== index);
    setVertices(nuevasvertices);
  };

    const modificarSeleccionado = (event) => {
        console.log('me cambiaron')
      console.log("target",event.target.value)
    setTipoTerritorio(event.target.value);
  };

    const agregarTerritorio = () => {
      console.log("tate tipoTerritorio",tipoTerritorio)
    actions.agregarTerritorio(origen, vertices, tipoTerritorio);
      // Limpia el estado de vertices después de agregar el territorio
      console.log(origen, vertices, tipoTerritorio)
    setVertices([]);
  };

  const eliminarUltimoTerritorio = () => {
    if (tipoTerritorio) {
     // actions.eliminarUltimoTerritorio(tipoTerritorio);
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
        value={tipoTerritorio} // Asegúrate de que el select refleje el estado actual
      >
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
        <p className="mt-2 mb-1 color2 w-100 p-0 ms-1">vertices</p>
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

        {vertices.map((conexion, index) => (
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
                      onChange={(e) => modificarVertice(index, e)}
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
                      onChange={(e) => modificarVertice(index, e)}
                      min="-Infinity"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12  d-flex justify-content-center w-row">
              <button
                className="btn col-12 btn-ancho-especifico btn-outline-secondary btn-sm add mt-3 p-0 d-flex justify-content-center align-items-center pb-1"
                onClick={() => eliminarVertice(index)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}

        <div className="col-12 d-flex justify-content-center row">
          <button
            className="btn ms-4 col-12 btn-outline-secondary btn-sm add mt-3 p-0 d-flex justify-content-center align-items-center pb-1"
            onClick={agregarVertice}
          >
            Agregar Vértice
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

export default MenuAgregarTerritorio;
