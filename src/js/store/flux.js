const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			posicionCamara: {
				x: 0,
				y: 0,
				z: 80
			},
		},
		actions: {
			moveCamera: (x, y) => {
				const store = getStore()
				
				setStore({
					posicionCamara: {
						...store.posicionCamara, x: x,
						y: y
					}
				});
			},
			zoomCamara: (z) => {
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
			coordenadas: () => {
				const store = getStore();
				const unidades = store.plano.ladosYDivisiones / 2;

				let coordenadas = [];
				for (let x = -unidades + 1; x <= unidades - 1; x++) {
					for (let y = -unidades + 1; y <= unidades - 1; y++) {
						coordenadas = [...coordenadas, { x: x, y: y }];
					}
				}
				setStore({ plano: { ...store.plano, puntos: coordenadas } });
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
