

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			banderas: {
				menuAgregarUbicacion: false,
				menuAgregarMarcador: false,
				mostrarMarcadores: false,
				mostrarConexiones: false
			},
			posicionCamara: {
				x: 0,
				y: 0,
				z: 80
			},
			coordsClickeadas: {
				x: null,
				y: null
			},
			marcadores: [],
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
			eliminarUltimoMarcador: () => {
				const store = getStore()
				setStore({marcadores:store.marcadores.slice(0, -1)})
			},
			agregarMarcador: () => {
				const store = getStore()
				setStore({marcadores: [...store.marcadores, store.coordsClickeadas]})
			},
			changeBanderas: (bandera) => {
				const store = getStore();
				const { banderas } = store;

				console.log(bandera)
				switch (bandera) {
					
					case 'mostrar menu agregar ubicacion':
						console.log("en el switch")
						setStore({
							banderas: {
								...banderas,
								menuAgregarUbicacion: !banderas.menuAgregarUbicacion
							}
						});
						break;
					case 'mostrar conexiones':
						setStore({
							banderas: {
								...banderas,
								mostrarConexiones: !banderas.mostrarConexiones
							}
						});
						break;
					case 'mostrar marcadores':
						setStore({
							banderas: {
								...banderas,
								mostrarMarcadores: !banderas.mostrarMarcadores
							}
						});
						break;
					case 'mostrar menu agregar marcador':
						setStore({
							banderas: {
								...banderas,
								menuAgregarMarcador: !banderas.menuAgregarMarcador
							}
						});
						break;
					default:
						console.log('Bandera no reconocida');
						break;
				}
			},
			// Actualiza las coordenadas clickeadas en el estado global
			changeCoordsClickeadas: (x, y) => {
				const store = getStore(); // Obtiene el estado global actual

				// Redondea las coordenadas a números enteros y actualiza el estado global
				setStore({
					coordsClickeadas: {
						x: parseFloat(x.toFixed(0)), // Redondea la coordenada x
						y: parseFloat(y.toFixed(0))  // Redondea la coordenada y
					}
				});
			},

			// Agrega un nuevo territorio terrestre al mapa
			agregarTerritorio: (origen, conexiones, tipo) => {
				const store = getStore(); // Obtiene el estado global actual

				let territorioExistente;
				// Genera un nuevo ID incremental basado en la longitud de la lista de territorios terrestres
				let nuevoId;

				if (tipo === 'terrestre') {
					console.log('en el if terrestre')

					// Verifica si ya existe un territorio en las coordenadas de origen
					territorioExistente = store.datosDelJuego.mapa.territorios_terrestres.find(
						terr => terr.coordenadas.x === origen.x && terr.coordenadas.y === origen.y
					);
					nuevoId = () => store.datosDelJuego.mapa.territorios_terrestres.length + 1;
				} else if (tipo === 'acuatico') {
					console.log('en el if acuatico')

					// Verifica si ya existe un territorio en las coordenadas de origen
					territorioExistente = store.datosDelJuego.mapa.territorios_acuaticos.find(
						terr => terr.coordenadas.x === origen.x && terr.coordenadas.y === origen.y
					);
					nuevoId = () => store.datosDelJuego.mapa.territorios_acuaticos.length + 1;
				} else {
					console.log('en el if costero')
					// Verifica si ya existe un territorio en las coordenadas de origen
					territorioExistente = store.datosDelJuego.mapa.territorios_costeros.find(
						terr => terr.coordenadas.x === origen.x && terr.coordenadas.y === origen.y
					);
					nuevoId = () => store.datosDelJuego.mapa.territorios_costeros.length + 1;
				}


				if (territorioExistente) {
					// Si el territorio ya existe, imprime un mensaje y no realiza ninguna acción adicional
					console.log("El territorio ya existe en las coordenadas especificadas.");
					return; // Sale de la función sin hacer nada
				}


				// Crea un nuevo objeto de territorio generico
				const newTerr = {
					id: nuevoId(), // Asigna el ID incremental al nuevo territorio
					tipo: tipo, // Especifica que es un territorio terrestre
					coordenadas: {
						x: origen.x, // Coordenada x del origen
						y: origen.y  // Coordenada y del origen
					},
					conexiones: conexiones.map(conexion => ({
						x: conexion.x, // Coordenada x de la conexión
						y: conexion.y, // Coordenada y de la conexión
						distancia: parseFloat(Math.sqrt(
							Math.pow(conexion.x - origen.x, 2) + // Calcula la distancia entre el origen y la conexión en x
							Math.pow(conexion.y - origen.y, 2)   // Calcula la distancia entre el origen y la conexión en y
						).toFixed(2)) // Redondea la distancia a dos decimales
					}))
				};

				// Actualiza el store con el nuevo territorio agregado porque ya corroboramos que no existe
				if (tipo === 'terrestre') {
					console.log('en el if terrestre')

					setStore({
						datosDelJuego: {
							...store.datosDelJuego, // Mantiene el resto de los datos del juego sin cambios
							mapa: {
								...store.datosDelJuego.mapa, // Mantiene el resto del mapa sin cambios
								territorios_terrestres: [
									...store.datosDelJuego.mapa.territorios_terrestres, // Mantiene los territorios terrestres existentes
									newTerr // Agrega el nuevo territorio a la lista
								]
							}
						}
					});
				} else if (tipo === 'acuatico') {
					console.log('en el if acuatico')

					setStore({
						datosDelJuego: {
							...store.datosDelJuego, // Mantiene el resto de los datos del juego sin cambios
							mapa: {
								...store.datosDelJuego.mapa, // Mantiene el resto del mapa sin cambios
								territorios_acuaticos: [
									...store.datosDelJuego.mapa.territorios_acuaticos, // Mantiene los territorios terrestres existentes
									newTerr // Agrega el nuevo territorio a la lista
								]
							}
						}
					});
				} else {
					//Si no existe punto para esa conexion, crea un nuevo punto
					setStore({
						datosDelJuego: {
							...store.datosDelJuego, // Mantiene el resto de los datos del juego sin cambios
							mapa: {
								...store.datosDelJuego.mapa, // Mantiene el resto del mapa sin cambios
								territorios_costeros: [
									...store.datosDelJuego.mapa.territorios_costeros, // Mantiene los territorios terrestres existentes
									newTerr // Agrega el nuevo territorio a la lista
								]
							}
						}
					});
				}

				// Verifica para cada conexion, si es un punto que ya existe en el mapa, para actualizar sus conexiones e incluir la conexion con el nuevo punto.
				conexiones.forEach(coords => {
					let territorioConexionTerrestreExistente;
					let territorioConexionAcuaticoExistente;
					let territorioConexionCosteroExistente;

					//Si el nuevo territorio es de tipo terrestre, solo tedrá como posibles conexiones a un territorio terrestre o costero
					if (tipo === 'terrestre') {
						console.log(' forEach para cada conexión de un territorio terrestre');
						territorioConexionTerrestreExistente = store.datosDelJuego.mapa.territorios_terrestres.find(
							terr => terr.coordenadas.x === coords.x && terr.coordenadas.y === coords.y // Busca si ya existe un territorio terrestre en esas coordenadas
						);
						territorioConexionCosteroExistente = store.datosDelJuego.mapa.territorios_costeros.find(
							terr => terr.coordenadas.x === coords.x && terr.coordenadas.y === coords.y // Busca si ya existe un territorio costero en esas coordenadas
						);
						if (territorioConexionTerrestreExistente || territorioConexionCosteroExistente) {
							// Si ya existe, actualiza las conexiones de ese territorio
							const conexionesActualizadas = [
								...(territorioConexionTerrestreExistente ? territorioConexionTerrestreExistente : territorioConexionCosteroExistente).conexiones, // Mantiene las conexiones existentes
								{
									x: origen.x, // Agrega la conexión al nuevo territorio
									y: origen.y,
									distancia: parseFloat(Math.sqrt(
										Math.pow(origen.x - coords.x, 2) + // Calcula la distancia en x entre el origen y la conexión existente
										Math.pow(origen.y - coords.y, 2)   // Calcula la distancia en y entre el origen y la conexión existente
									).toFixed(2)) // Redondea la distancia a dos decimales
								}
							];
							//En el caso de que la se detecte una conexion con un territorio terrestre que ya existe
							if (territorioConexionTerrestreExistente) {
								console.log('El nuevo teritorio terrestre tiene una conexion con un territorio terrestre que ya existe, se actualizaron sus conexiones:', conexionesActualizadas)

								// Actualiza la lista de territorios con las nuevas conexiones
								const territoriosActualizados = store.datosDelJuego.mapa.territorios_terrestres.map(terr => {
									if (terr.coordenadas.x === coords.x && terr.coordenadas.y === coords.y) {
										return {
											...terr, // Mantiene el resto del territorio sin cambios
											conexiones: conexionesActualizadas // Actualiza las conexiones con la nueva conexión
										};
									}
									return terr; // Si no es el territorio correspondiente, lo deja sin cambios
								});

								// Guarda los territorios actualizados en el store
								setStore({
									datosDelJuego: {
										...store.datosDelJuego, // Mantiene el resto de los datos del juego sin cambios
										mapa: {
											...store.datosDelJuego.mapa, // Mantiene el resto del mapa sin cambios
											territorios_terrestres: territoriosActualizados // Actualiza la lista de territorios terrestres
										}
									}
								});
							} else if (territorioConexionCosteroExistente) {
								console.log('El nuevo teritorio terrestre tiene una conexion con un territorio costero que ya existe, se actualizaron sus conexiones:', conexionesActualizadas)

								// Actualiza la lista de territorios con las nuevas conexiones
								const territoriosActualizados = store.datosDelJuego.mapa.territorios_costeros.map(terr => {
									if (terr.coordenadas.x === coords.x && terr.coordenadas.y === coords.y) {
										return {
											...terr, // Mantiene el resto del territorio sin cambios
											conexiones: conexionesActualizadas // Actualiza las conexiones con la nueva conexión
										};
									}
									return terr; // Si no es el territorio correspondiente, lo deja sin cambios
								});

								// Guarda los territorios actualizados en el store
								setStore({
									datosDelJuego: {
										...store.datosDelJuego, // Mantiene el resto de los datos del juego sin cambios
										mapa: {
											...store.datosDelJuego.mapa, // Mantiene el resto del mapa sin cambios
											territorios_costeros: territoriosActualizados // Actualiza la lista de territorios terrestres
										}
									}
								});
							}


						} else {
							console.log("No existe un territorio para esa conexion, territorio terrestre creado en su lugar.")
							// Si no existe el territorio, crea uno nuevo y lo agrega
							setStore({
								datosDelJuego: {
									...store.datosDelJuego, // Mantiene el resto de los datos del juego sin cambios
									mapa: {
										...store.datosDelJuego.mapa, // Mantiene el resto del mapa sin cambios
										territorios_terrestres: [
											...store.datosDelJuego.mapa.territorios_terrestres, // Mantiene los territorios existentes
											{
												id: nuevoId(), // Asigna el ID incremental
												tipo: tipo, // Especifica que es un territorio terrestre
												coordenadas: {
													x: coords.x, // Coordenada x de la nueva conexión
													y: coords.y  // Coordenada y de la nueva conexión
												},
												conexiones: [{
													x: origen.x, // Conexión al nuevo territorio
													y: origen.y,
													distancia: parseFloat(Math.sqrt(
														Math.pow(origen.x - coords.x, 2) + // Calcula la distancia en x
														Math.pow(origen.y - coords.y, 2)   // Calcula la distancia en y
													).toFixed(2)) // Redondea la distancia a dos decimales
												}]
											}
										]
									}
								}
							});
						}
					} else if (tipo === 'acuatico') {
						console.log(' forEach para cada conexión de un territorio acuatico');

						territorioConexionAcuaticoExistente = store.datosDelJuego.mapa.territorios_acuaticos.find(
							terr => terr.coordenadas.x === coords.x && terr.coordenadas.y === coords.y // Busca si ya existe un territorio acuatico en esas coordenadas
						);

						territorioConexionCosteroExistente = store.datosDelJuego.mapa.territorios_costeros.find(
							terr => terr.coordenadas.x === coords.x && terr.coordenadas.y === coords.y // Busca si ya existe un territorio costero en esas coordenadas
						);

						if (territorioConexionCosteroExistente || territorioConexionAcuaticoExistente) {
							// Si ya existe, actualiza las conexiones de ese territorio
							const conexionesActualizadas = [
								...(territorioConexionCosteroExistente ? territorioConexionCosteroExistente : territorioConexionAcuaticoExistente).conexiones, // Mantiene las conexiones existentes
								{
									x: origen.x, // Agrega la conexión al nuevo territorio
									y: origen.y,
									distancia: parseFloat(Math.sqrt(
										Math.pow(origen.x - coords.x, 2) + // Calcula la distancia en x entre el origen y la conexión existente
										Math.pow(origen.y - coords.y, 2)   // Calcula la distancia en y entre el origen y la conexión existente
									).toFixed(2)) // Redondea la distancia a dos decimales
								}
							];

							if (territorioConexionAcuaticoExistente) {
								console.log('El nuevo teritorio acuatico tiene una conexion con un territorio acuatico que ya existe, se actualizaron sus conexiones:', conexionesActualizadas)
								// Actualiza la lista de territorios acuáticos con las nuevas conexiones
								const territoriosActualizados = store.datosDelJuego.mapa.territorios_acuaticos.map(terr => {
									if (terr.coordenadas.x === coords.x && terr.coordenadas.y === coords.y) {
										return {
											...terr, // Mantiene el resto del territorio sin cambios
											conexiones: conexionesActualizadas // Actualiza las conexiones con la nueva conexión
										};
									}
									return terr; // Si no es el territorio correspondiente, lo deja sin cambios
								});

								// Guarda los territorios actualizados en el store
								setStore({
									datosDelJuego: {
										...store.datosDelJuego, // Mantiene el resto de los datos del juego sin cambios
										mapa: {
											...store.datosDelJuego.mapa, // Mantiene el resto del mapa sin cambios
											territorios_acuaticos: territoriosActualizados // Actualiza la lista de territorios acuáticos
										}
									}
								});
							} else if (territorioConexionCosteroExistente) {
								console.log('El nuevo teritorio acuatico tiene una conexion con un territorio costero que ya existe, se actualizaron sus conexiones:', conexionesActualizadas)
								// Actualiza la lista de territorios acuáticos con las nuevas conexiones
								const territoriosActualizados = store.datosDelJuego.mapa.territorios_costeros.map(terr => {
									if (terr.coordenadas.x === coords.x && terr.coordenadas.y === coords.y) {
										return {
											...terr, // Mantiene el resto del territorio sin cambios
											conexiones: conexionesActualizadas // Actualiza las conexiones con la nueva conexión
										};
									}
									return terr; // Si no es el territorio correspondiente, lo deja sin cambios
								});

								// Guarda los territorios actualizados en el store
								setStore({
									datosDelJuego: {
										...store.datosDelJuego, // Mantiene el resto de los datos del juego sin cambios
										mapa: {
											...store.datosDelJuego.mapa, // Mantiene el resto del mapa sin cambios
											territorios_costeros: territoriosActualizados // Actualiza la lista de territorios acuáticos
										}
									}
								});
							}
						} else {
								console.log("No existe un territorio para esa conexion, territorio acuatico creado en su lugar.")
								// Si no existe el territorio, crea uno nuevo y lo agrega
								setStore({
									datosDelJuego: {
										...store.datosDelJuego, // Mantiene el resto de los datos del juego sin cambios
										mapa: {
											...store.datosDelJuego.mapa, // Mantiene el resto del mapa sin cambios
											territorios_acuaticos: [
												...store.datosDelJuego.mapa.territorios_acuaticos, // Mantiene los territorios existentes
												{
													id: nuevoId(), // Asigna el ID incremental
													tipo: tipo, // Especifica que es un territorio acuático
													coordenadas: {
														x: coords.x, // Coordenada x de la nueva conexión
														y: coords.y  // Coordenada y de la nueva conexión
													},
													conexiones: [{
														x: origen.x, // Conexión al nuevo territorio
														y: origen.y,
														distancia: parseFloat(Math.sqrt(
															Math.pow(origen.x - coords.x, 2) + // Calcula la distancia en x
															Math.pow(origen.y - coords.y, 2)   // Calcula la distancia en y
														).toFixed(2)) // Redondea la distancia a dos decimales
													}]
												}
											]
										}
									}
								});
							}
						
					} else {
						console.log(' forEach para cada conexión de un territorio costero');

						territorioConexionAcuaticoExistente = store.datosDelJuego.mapa.territorios_acuaticos.find(
							terr => terr.coordenadas.x === coords.x && terr.coordenadas.y === coords.y // Busca si ya existe un territorio en esas coordenadas
						);
						console.log(territorioConexionAcuaticoExistente) // al menos uno de estos dos console.log debe ser undefined
						territorioConexionTerrestreExistente = store.datosDelJuego.mapa.territorios_terrestres.find(
							terr => terr.coordenadas.x === coords.x && terr.coordenadas.y === coords.y // Busca si ya existe un territorio en esas coordenadas
						);
						console.log(territorioConexionTerrestreExistente) // al menos uno de estos dos console.log debe ser undefined
						if (territorioConexionTerrestreExistente || territorioConexionAcuaticoExistente) {
							// Si ya existe, actualiza las conexiones de ese territorio
							const conexionesActualizadas = [
								...(territorioConexionTerrestreExistente ? territorioConexionTerrestreExistente: territorioConexionAcuaticoExistente).conexiones, // Mantiene las conexiones existentes
								{
									x: origen.x, // Agrega la conexión al nuevo territorio
									y: origen.y,
									distancia: parseFloat(Math.sqrt(
										Math.pow(origen.x - coords.x, 2) + // Calcula la distancia en x entre el origen y la conexión existente
										Math.pow(origen.y - coords.y, 2)   // Calcula la distancia en y entre el origen y la conexión existente
									).toFixed(2)) // Redondea la distancia a dos decimales
								}
							];
							
							if (territorioConexionAcuaticoExistente) {
								console.log('El nuevo teritorio costero tiene una conexion con un territorio acuatico que ya existe, se actualizaron sus conexiones:', conexionesActualizadas)
								// Actualiza la lista de territorios acuáticos con las nuevas conexiones
								const territoriosActualizados = store.datosDelJuego.mapa.territorios_acuaticos.map(terr => {
									if (terr.coordenadas.x === coords.x && terr.coordenadas.y === coords.y) {
										return {
											...terr, // Mantiene el resto del territorio sin cambios
											conexiones: conexionesActualizadas // Actualiza las conexiones con la nueva conexión
										};
									}
									return terr; // Si no es el territorio correspondiente, lo deja sin cambios
								});

								// Guarda los territorios actualizados en el store
								setStore({
									datosDelJuego: {
										...store.datosDelJuego, // Mantiene el resto de los datos del juego sin cambios
										mapa: {
											...store.datosDelJuego.mapa, // Mantiene el resto del mapa sin cambios
											territorios_acuaticos: territoriosActualizados // Actualiza la lista de territorios acuáticos
										}
									}
								});
							} else if (territorioConexionTerrestreExistente) {
								console.log('El nuevo teritorio costero tiene una conexion con un territorio terrestre que ya existe, se actualizaron sus conexiones:', conexionesActualizadas)
								// Actualiza la lista de territorios acuáticos con las nuevas conexiones
								const territoriosActualizados = store.datosDelJuego.mapa.territorios_terrestres.map(terr => {
									if (terr.coordenadas.x === coords.x && terr.coordenadas.y === coords.y) {
										return {
											...terr, // Mantiene el resto del territorio sin cambios
											conexiones: conexionesActualizadas // Actualiza las conexiones con la nueva conexión
										};
									}
									return terr; // Si no es el territorio correspondiente, lo deja sin cambios
								});

								// Guarda los territorios actualizados en el store
								setStore({
									datosDelJuego: {
										...store.datosDelJuego, // Mantiene el resto de los datos del juego sin cambios
										mapa: {
											...store.datosDelJuego.mapa, // Mantiene el resto del mapa sin cambios
											territorios_terrestres: territoriosActualizados // Actualiza la lista de territorios acuáticos
										}
									}
								});
							} 
						}
					}



				});
			},

			// Elimina el último territorio agregado y actualiza las conexiones de los territorios restantes
			eliminarUltimoTerritorio: (tipoTerritorio) => {
				const store = getStore(); // Obtiene el estado global actual

				let nuevoMapa = { ...store.datosDelJuego.mapa }; // Copia el mapa actual

				let ultimoTerrAgregado = null;

				if (tipoTerritorio === 'terrestre') {
					// Elimina el último territorio terrestre de la lista
					ultimoTerrAgregado = store.datosDelJuego.mapa.territorios_terrestres[store.datosDelJuego.mapa.territorios_terrestres.length - 1];
					nuevoMapa.territorios_terrestres = nuevoMapa.territorios_terrestres.slice(0, -1);

					// Actualiza las conexiones de los territorios terrestres restantes
					nuevoMapa.territorios_terrestres = nuevoMapa.territorios_terrestres.map(terr => {
						return {
							...terr,
							conexiones: terr.conexiones.filter(conx =>
								conx.x !== ultimoTerrAgregado.coordenadas.x ||
								conx.y !== ultimoTerrAgregado.coordenadas.y
							)
						};
					});

					// Actualiza las conexiones de los territorios costeros
					nuevoMapa.territorios_costeros = nuevoMapa.territorios_costeros.map(terr => {
						return {
							...terr,
							conexiones: terr.conexiones.filter(conx =>
								conx.x !== ultimoTerrAgregado.coordenadas.x ||
								conx.y !== ultimoTerrAgregado.coordenadas.y
							)
						};
					});

				} else if (tipoTerritorio === 'acuatico') {
					// Elimina el último territorio acuático de la lista
					ultimoTerrAgregado = store.datosDelJuego.mapa.territorios_acuaticos[store.datosDelJuego.mapa.territorios_acuaticos.length - 1];
					nuevoMapa.territorios_acuaticos = nuevoMapa.territorios_acuaticos.slice(0, -1);

					// Actualiza las conexiones de los territorios acuáticos restantes
					nuevoMapa.territorios_acuaticos = nuevoMapa.territorios_acuaticos.map(terr => {
						return {
							...terr,
							conexiones: terr.conexiones.filter(conx =>
								conx.x !== ultimoTerrAgregado.coordenadas.x ||
								conx.y !== ultimoTerrAgregado.coordenadas.y
							)
						};
					});

					// Actualiza las conexiones de los territorios costeros
					nuevoMapa.territorios_costeros = nuevoMapa.territorios_costeros.map(terr => {
						return {
							...terr,
							conexiones: terr.conexiones.filter(conx =>
								conx.x !== ultimoTerrAgregado.coordenadas.x ||
								conx.y !== ultimoTerrAgregado.coordenadas.y
							)
						};
					});

				} else if (tipoTerritorio === 'costero') {
					// Elimina el último territorio costero de la lista
					ultimoTerrAgregado = store.datosDelJuego.mapa.territorios_costeros[store.datosDelJuego.mapa.territorios_costeros.length - 1];
					nuevoMapa.territorios_costeros = nuevoMapa.territorios_costeros.slice(0, -1);

					// Actualiza las conexiones de los territorios terrestres
					nuevoMapa.territorios_terrestres = nuevoMapa.territorios_terrestres.map(terr => {
						return {
							...terr,
							conexiones: terr.conexiones.filter(conx =>
								conx.x !== ultimoTerrAgregado.coordenadas.x ||
								conx.y !== ultimoTerrAgregado.coordenadas.y
							)
						};
					});

					// Actualiza las conexiones de los territorios acuáticos
					nuevoMapa.territorios_acuaticos = nuevoMapa.territorios_acuaticos.map(terr => {
						return {
							...terr,
							conexiones: terr.conexiones.filter(conx =>
								conx.x !== ultimoTerrAgregado.coordenadas.x ||
								conx.y !== ultimoTerrAgregado.coordenadas.y
							)
						};
					});
				}

				// Guarda el mapa actualizado en el store
				setStore({
					datosDelJuego: {
						...store.datosDelJuego,
						mapa: nuevoMapa
					}
				});
			},

			guardarDatosEnBackend: async () => {
				const store = getStore(); // Obtiene el estado actual del store.

				try {
					// Envía una solicitud POST al backend para guardar los datos del juego.
					const response = await fetch('http://localhost:3001/api/store', {
						method: 'POST', // Método de la solicitud: POST.
						headers: {
							'Content-Type': 'application/json', // El cuerpo de la solicitud está en formato JSON.
						},
						body: JSON.stringify(store.datosDelJuego), // Convierte los datos del juego a una cadena JSON y los incluye en el cuerpo de la solicitud.
					});

					const result = await response.json(); // Parsea la respuesta del backend como JSON.
					console.log(result.message); // Imprime el mensaje de la respuesta en la consola.
				} catch (error) {
					console.error('Error al guardar el store en el backend', error); // Maneja cualquier error que ocurra durante la solicitud y lo imprime en la consola.
				}
			},
			cargarDatosDesdeBackend: async () => {
				const store = getStore(); // Obtiene el estado actual del store.
				console.log('antes del fetch cargarDatos'); // Mensaje de depuración antes de realizar la solicitud.

				try {
					// Envía una solicitud GET al backend para cargar los datos del juego.
					const response = await fetch('http://localhost:3001/api/store');
					const data = await response.json(); // Parsea la respuesta del backend como JSON.

					if (response.status == 200) { // Si la respuesta tiene un status 200 (éxito).
						console.log(data); // Imprime los datos recibidos en la consola.

						// Actualiza el store con los datos recibidos desde el backend.
						setStore({
							...store, // Mantiene el resto del store sin cambios.
							datosDelJuego: data // Actualiza solo la parte `datosDelJuego` del store.
						});
					} else {
						console.log(data); // Si el status no es 200, imprime los datos recibidos (puede ser un mensaje de error).
					}
				} catch (error) {
					console.error('Error al cargar los datos del juego desde el backend', error); // Maneja cualquier error que ocurra durante la solicitud y lo imprime en la consola.
				}
				console.log('despues del fetch cargarDatos'); // Mensaje de depuración después de realizar la solicitud.
			},

			imprimirDatosDelJuego: () => {
				const store = getStore(); // Obtiene el estado actual del store.
				console.log(store.datosDelJuego); // Imprime los datos del juego almacenados en el store en la consola.
			}
		}
	};
};

export default getState;
