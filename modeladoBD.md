## Propiedades de un mapa

id -> Identificador único de cada mapa.

name -> Nombre del mapa.

img -> imagen artística creada en inkranate.

dimenciones -> objeto con propiedades 'largo' y 'ancho' que indican las dimeciones del mapa en px.

## territorios_terrestres
    array que contiene un objeto con las siguientes propiedades:

## id:
    identificado único en funcion al tipo de territorio (acuático, terrestre, costero), nunca se deberá repetir el id en el conjunto de un mismo tipo de tereritorio.

## tipo:
    indica el estatus del territorio en sí, podría ser inhabitado, pueblo, ciudad, capital, etc.

## coordenadas:
    objeto que tiene propiedades x e y con el punto de referencia principal de dicho territorio.

## area:
    un espacio geometríco que representa el territorio asignado a cada coordendada, es decir el tamaño y forma del territorio.

## gobernado_por:
    un array que contiene a todos los jugadores que tienen incluido en su reino ese territorio

## en_conflicto:
    un bool que determina si en el territorio hay alguna guerra activa.

## conecciones:
    un array de objetos que representan los puntos en el mapa con los cuales el territorio tiene conección, cada objeto tiene las propiedades distancia, x e y.

## población
    numero que indica la cantidad de habitantes que están contribuyendo a la economía del territorio específico y que pueden ser llamados a filas para convertirse en militares, si se llaman mucha población a fila, se aumenta el gasto militar y la economía de ese territorio se desacelera debido a la baja mano de obra.  esta propiedad no la tienen los territorios acuáticos.

## unidades:
     un objeto que tiene como propiedades las unidades de combate que están asignadas al territorio para su defensa. cada una consume recursos en cada. esta propiedad no la tienen los territorios acuáticos.

## unidades_de_mapa:
    es un objeto que contiene en primera instancia las propiedades" generales, carrteas y mercantes. Cada uno es un array que contendrá la información de cada una de esas unidades de mapa que se encuentren en esa ubicación.

## edificios:
    es un objeto que tiene en primera instancia las propiedades correspondientes a los edificios que se podrán construír, cada una de esas propiedades es un array que contendrá la información de cada uno de esos edificios.

## terreno:
    representa las características geograficas de ese territorio, podría ser, árido, bosque, pradera, montañoso, pantano, polar, selvático y desértico. cada uno de estos influirá en la velociodad de movimiento y en los puntos de ataque y defensa de cada unidad de mapa, también en la economía.

## de_noche:
    un bool que indica si en ese territorio es de día o de noche.
    infulirá en la visibilidad de las unidades talvez.

## clima:
    similar a la propiedad de terreno, pero es más dinámico, describe las condiciones climáticas que tiene en ese momento el mapa, podrá ser lluvioso, nieve, viento o tormenta de arena, niebla.

## recursos_naturales:
    indicará cuales recursos naturales de mapa hay para extraer en ese territorio y en qué cantidades queda disponible, podría ser en orden de frecuencia, frutales, praderas, ciervos, búfalos, plata, oro, madera, lino, canteras, cardúmenes, ballenas, hierro, etc.

## territorios_acuaticos:
    Cuenta con las mismas propiedades que un territorio_terrestre excepto edificios, ya que no tiene sentido construir sobre el agua y en lugar de terreno, tiene la propiedad tipo_de_aguas:

## tipo_de_aguas:
    representa las características del territorio acuático, por ejemplo, podría ser, aguas profundas, aguas poco profundas, rio, laguna, aguas agitadas, aguas calmas. todo esto influirá en el tipo de recurso que puede paraecer ahí, por ejemplo, no podrá apararecer una ballena en un rio, o en aguas poco profundas. y también en la velocidad de movimiento de las unidades de mapa acuaticas, como pesqueros, navíos ligeros, pesados y cargueros.
    esta propiedad no la tienen los territorios terrestres ni costeros.






