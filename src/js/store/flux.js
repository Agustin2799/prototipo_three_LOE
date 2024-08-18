

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			posicionCamara: {
				x: 0,
				y: 0,
				z: 80
			},
			coordsClickeadas: {
				x: null,
				y: null
			},
			datosDelJuego: {
				mapa: {
					id: null,
					name: null,
					img: "img Inkranate",
					dimenciones: {
						largo: "...px",
						ancho: "...px"
					},
					territorios_terrestres: [],
					territorios_acuaticos: [],
					territorios_costeros: []
				}
			}
		},
		actions: {
			changeCoordsClickeadas: (x, y) => {
				const store = getStore()
				setStore({
					...store,
					coordsClickeadas: {
						x: parseFloat(x.toFixed(0)), y: parseFloat(y.toFixed(0))
				}})
			},
			agregarTerritorioTerrestre: (origen, conexiones) => {
				const store = getStore();
				const nuevoId = store.datosDelJuego.mapa.territorios_terrestres.length + 1;

				const newTerr = {
					id: nuevoId, // ID incremental
					tipo: "terrestre", // Suponiendo que es un territorio terrestre
					coordenadas: {
						x: origen.x,
						y: origen.y
					},
					conexiones: conexiones.map(conexion => ({
						x: conexion.x,
						y: conexion.y,
						distancia: parseFloat(Math.sqrt(
							Math.pow(conexion.x - origen.x, 2) +
							Math.pow(conexion.y - origen.y, 2)
						).toFixed(2))// Cálculo de distancia entre origen y la conexión
					}))
				};

				// Actualiza el store con el nuevo territorio
				setStore({
					...store,
					datosDelJuego: {
						...store.datosDelJuego,
						mapa: {
							...store.datosDelJuego.mapa,
							territorios_terrestres: [
								...store.datosDelJuego.mapa.territorios_terrestres,
								newTerr
							]
						}
					}
				});
				console.log(store.datosDelJuego.mapa.territorios_terrestres)
			},
			guardarDatosEnBackend: async () => {
				const store = getStore();
				try {
					const response = await fetch('http://localhost:3001/api/store', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(store.datosDelJuego),
					});
					const result = await response.json();
					console.log(result.message);
				} catch (error) {
					console.error('Error al guardar el store en el backend', error);
				}
			},
			cargarDatosDesdeBackend: async () => {
				const store = getStore();
				console.log('antes del fetch cargarDatos')
				try {
					const response = await fetch('http://localhost:3001/api/store');
					const data = await response.json();
					if (response.status == 200) {
						console.log(data)
						setStore({
							...store,
							datosDelJuego: data
					});
					} else {
						console.log(data)
					}
					//console.log('Datos del juego cargados desde el backend');
				} catch (error) {
					console.error('Error al cargar los datos del juego desde el backend', error);
				}
				console.log('despues del fetch cargarDatos')
			},
			imprimirDatosDelJuego: () => {
				const store = getStore()
				console.log(store.datosDelJuego)
			},
			moveCamera: (x, y) => { //En desuso
				const store = getStore()
				
				setStore({
					posicionCamara: {
						...store.posicionCamara, x: store.posicionCamara.x + x,
						y: store.posicionCamara.y + y
					}
				});
			},
			zoomCamara: (z) => { //En desuso
				const store = getStore()
				if (store.posicionCamara.z >= 80) {
					setStore({
						posicionCamara: {
							...store.posicionCamara,
							z: store.posicionCamara.z + z
						}
					});
				}
			},
			coordenadas: () => { //En desuso
				const store = getStore();
				const unidades = store.plano.ladosYDivisiones / 2;

				let coordenadas = [];
				for (let x = -unidades + 1; x <= unidades - 1; x++) {
					for (let y = -unidades + 1; y <= unidades - 1; y++) {
						coordenadas = [...coordenadas, { x: x, y: y }];
					}
				}
				setStore({ plano: { ...store.plano, puntos: coordenadas } });
				console.log('coordendas en uso')
			},
			
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
