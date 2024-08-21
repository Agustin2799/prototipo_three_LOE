import React, { useState, useEffect } from "react"; // Importamos React y los hooks useState y useEffect desde la biblioteca React.
import getState from "./flux.js"; // Importamos la función getState desde el archivo flux.js.

// Creamos un contexto con un valor inicial de null. Este contexto permitirá compartir el estado global en toda la aplicación.
export const Context = React.createContext(null);

// Esta función se utiliza para inyectar el contexto global en cualquier componente que lo necesite.
// Específicamente, se inyecta en el componente layout.js.
const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		// Usamos useState para definir el estado inicial. Este estado incluye el store (almacén de datos global) y las acciones (funciones que pueden modificar el store).
		const [state, setState] = useState(
			getState({
				// Pasamos tres funciones a getState: getStore, getActions, y setStore.
				// getStore retorna la parte del estado correspondiente al store.
				getStore: () => state.store,
				// getActions retorna la parte del estado correspondiente a las acciones.
				getActions: () => state.actions,
				// setStore permite actualizar el store. Al llamarla, se mezcla el store actual con las actualizaciones que se proporcionen.
				setStore: updatedStore =>
					setState({
						// Actualizamos el store fusionando el store existente con el updatedStore.
						store: Object.assign(state.store, updatedStore),
						// Las acciones permanecen inalteradas en esta actualización.
						actions: { ...state.actions }
					})
			})
		);

		// useEffect se usa para ejecutar código cuando el componente se monta por primera vez (similar a componentDidMount en componentes de clase).
		useEffect(() => {
			/**
			 * Aquí es donde inicializamos cualquier dato necesario al cargar la aplicación.
			 * Este código solo se ejecuta una vez durante el ciclo de vida de la aplicación.
			 * Es un buen lugar para hacer solicitudes AJAX o llamadas a APIs.
			 * En lugar de usar setState directamente, se usan las acciones definidas en el store.
			 */
			state.actions.cargarDatosDesdeBackend(); // Llamamos a una acción para cargar datos desde el backend cuando el componente se monta.
		}, []); // Pasamos un array vacío como segunda dependencia, asegurando que este efecto solo se ejecute una vez.

		// Retornamos el Context.Provider, que envuelve el componente pasado y lo provee con el estado global.
		// Ahora, cualquier componente dentro de este provider podrá acceder al estado y a las acciones mediante el contexto.
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} /> {/* Renderizamos el componente que fue pasado como argumento, inyectándole el contexto global. */}
			</Context.Provider>
		);
	};
	return StoreWrapper; // Devolvemos el componente StoreWrapper, que ahora inyecta el contexto global.
};

export default injectContext; // Exportamos la función injectContext para que pueda ser usada en otras partes de la aplicación.
