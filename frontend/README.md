# Manual de Usuario Plataforma MMViz - FrontEnd

## Índice

- [Introducción](#introducción).
- [Requisitos Previos](#requisitos-previos).
- [Instalación y Configuración](#instalación-y-configuración).
- [Manejo del Sistema](#manejo-del-sistema).
- [Cambios al Sistema](#cambios-al-sistema).
- [Configuraciones Avanzadas](#configuraciones-avanzadas).

## Introducción

Este proyecto se encuentra basado en la utilización de contenedores en Docker para el levantamiento de cada servicio.

MMViz, es una plataforma online enfocada en generar visualizaciones inspiradas en MMLA (Multimodal Learning Analytics), en donde el propósito es analizar, por medio de las métricas y visualizaciones, la interaccion y colaboracion que existe entre los miembros que componen un grupo y/o el experimento, por lo que, el enfoque principal que mantiene la plataforma, es generar visualizaciones de métricas y parámetros de un experimento, de manera que el usuario pueda ver de forma más clara, cada interaccion de los sujetos con respecto a visualizaciones inspiradas en MMLA.

El manual de usuario presente abarcara los requisitos necesarios por parte del usuario para comprender el manejo del sistema, para luego, continuar brevemente en cómo se instalan y configuran ciertos aspectos de la plataforma, como manejar el sistema dentro de cada vista, como realizar cambios de cada funcionalidad de estas vistas y finalizando con las configuraciones avanzadas en ciertos archivos, en caso de ser necesarios por parte del usuario.

A continuación, se revisarán los conocimientos y requisitos previos que deben de ser considerados a la hora de manejar el control y uso de la plataforma MMViz.

## Requisitos Previos

Para manejar el sistema e implementar nuevas características sobre el área del "FrontEnd", se debe tener un conocimiento regular sobre los siguientes lenguajes de programación:

- JavaScript
- ReactJS
- NodeJS
- D3.JS

Tener cierto conocimiento sobre JavaScript y ReactJS ayudará al usuario a comprender e idear nuevas formas de mejorar la plataforma, como también entender cada aspecto que este sistema posee. Por otro lado, NodeJS es requerido para levantar todo este apartado de diseño del sitio web y de las librerias correspondientes, por lo que además de comprender brevemente su funcionamiento, se debe de tener instalado una versión de este, sobre el sistema que se utilizara. A continuación, se facilitarán todas las versiones de “NodeJS” disponibles, pero, cabe destacar que la versión de NodeJS que el sistema utiliza actualmente es la versión "v12.9.0". [(NodeJS Releases)](https://nodejs.org/es/download/releases/)

Tambien se cuenta con la libreria D3.JS para la generación de gráficos generales y personalizados, por lo cual se recomienda, para la generación de nuevas visualizaciones, leer la documentación presente en D3.JS, como tambien, informacion acerca de el uso de ReactJS junto con D3.JS, ya que pueden existir algunas dificultades en ese sentido.

Por ultimo, se pueden analizar los archivos "package.json" y "package-lock.json" que se encuentran en la carpeta "frontend", estos archivos contienen informacion relevante de las versiones de las librerias utilizadas en el sistema, por lo que cualquier cambio entre versiones tendra que ser realizado desde estos archivos.

## Instalación y Configuración

Una vez Instalado NodeJS en nuestro sistema, se puede proseguir de 2 formas, la primera es simplemente instalar todas las dependencias que tiene registrado el sistema y continuar con el levantamiento de la aplicación, donde este caso solamente es realizado si solo se debe levantar el sistema de forma predeterminada en docker, pero, si se desea levantar el sistema de forma local o con otro tipo de configuración, se recomienda modificar 2 archivos, 1 es el archivo ya mencionado, "package.json" y "Socket.js".

### Configuración

#### Scripts

Primero que nada, abriremos el archivo "package.json", donde buscaremos y modificaremos la siguiente línea de código

#### `"start": "PORT=80 react-scripts start",`

En caso de requerir utilizar la plataforma de forma predeterminada no modificaremos nada, pero si queremos levantar la plataforma de manera local, esta configuración debe quedar de la siguiente manera:

#### `"start": "set PORT=80 && react-scripts start",`

Eso bastará para configurar el puerto y ejecutar el script de forma correcta de forma local, debido a que el sistema está pensado para ser levantado como un servicio de Docker. Cabe destacar, que el puerto ("PORT") puede ser el que elija el usuario, pero preferentemente, necesitara ser el puerto 80.

#### Socket

Debido a que el sistema necesita de datos y métricas para poder generar visualizaciones, es necesario estar conectado a un servicio el cual brinde estas nesecidades, y esto se hace mediante "socket.io", por lo que, en el archivo "Socket.js" se pueden ver las distintas rutas de las métricas a consumir, y para cambiar la ruta de consumo de alguna métrica, es necesario modificar la variable que tiene como nombre la métrica y solo cambiar la ruta especificada.

Por ejemplo, si la ruta de la métrica que quiero modificas es del habla, se tiene que cambiar la nueva dirección en la variable que tienen como nombre "ENDPOIN_HABLA" y asi con las otras métricas.

## Manejo del Sistema

Una vez configurados los pasos anteriores, se instalarán las dependencias de la plataforma, instanciadas en el archivo de configuración "package-lock.json" y "package.json". Para comenzar vamos a utilizar el siguiente comando:

#### `npm install`

Este comando permitirá instalar todas las librerías que son necesarias para el funcionamiento de las dependencias presentes en el sistema. Una vez instaladas estas dependencias, se procederá a levantar el sistema con el siguiente comando:

#### `npm start`

Este comando actuara dependiendo de la configuración que se le asigno en el "package.json", tanto por cómo funciona el script, como en el puerto al cual apunta el sistema.

A continuación, se revisara el funcionamiento y detalle de cada una de las vistas presentes. Cabe recalcar, que todas las vistas presentes poseen los detalles del experimento en cuadros, los cuales entregan una informacion general de cada una de las métricas, como también, una linea de tiempo que permite reproducir el experimento.

### Multimétrica

<p align="center">
<img src="https://i.imgur.com/cFHObJV.png" width="800">
</p>
La vista multimétrica contiene los detalles del experimento, junto con un gráfico de redes por cada grupo presente en el experimento, este combina cada una de las métricas (habla, postura y expresiones) en un solo gráfico de red. Precisamente, se puede ver: las intervenciones del habla entre sujetos, la cantidad de postura abierta y cerrada por sujeto, la dirección de la mirada de cada sujeto y la expresión de cada sujeto.

### Habla

<p align="center">
<img src="https://i.imgur.com/ZMGBGHS.png" width="800">
</p>
La vista del habla contiene los detalles del experimento, junto con un gráfico de redes por cada grupo presente en el experimento, el cual se ve representado de la siguiente manera: el tamaño de los nodos representan el número de intervenciones del sujeto correspondiente , el tamaño de las aristas representan la simetria entre sujetos y la dirección representa desde y hacia quién existe la simetria.

### Postura

<p align="center">
<img src="https://i.imgur.com/6wMl5Fq.png" width="800">
</p>
La vista de postura contiene los detalles del experimento, junto con un grafico de redes por cada grupo presente en el experimento, el cual se ve representado de la siguiente manera: la torta en los nodos representa el porcentaje de postura abierta (amarillo) y postura cerrada (verde) en el sujeto correspondiente, el arco entre nodos representa la simetria entre los sujetos, siguiendo los mismos colores y la flecha de cada sujeto indica la dirección de su mirada.

### Expresión

<p align="center">
<img src="https://i.imgur.com/EIKOEeZ.png" width="800">
</p>
La vista de expresiones contiene los detalles del experimento, junto con un grafico de redes por cada grupo presente en el experimento, el cual se ve representado de la siguiente manera: las expresiones y sus respectivos colores estan representadas en los nodos de cada sujeto y los arcos entre nodos representa la simetria entre los sujetos, siguiendo los mismos colores de cada expresión.

### Detalle multimétrica

<p align="center">
<img src="https://i.imgur.com/iMprBr7.png" width="800">
</p>
La vista de detalle multimétrica presenta los graficos de red de cada una de las métricas en el grupo seleccionado, lo que le brindaria al usuario un mayor detalle del grupo en cada una de las métricas.

### Detalle habla

<p align="center">
<img src="https://i.imgur.com/7oDSoZQ.png" width="800">
</p>
La vista de detalle del habla presenta 3 gráficos diferentes con respecto a la misma métrica, la definición de cada uno de estos esta presente en el icono de información dentro del gráfico. Esto le permite al usuario tener un control mas amplio de que es lo que esta haciendo el grupo con respecto al habla.

### Detalle postura

<p align="center">
<img src="https://i.imgur.com/jAQ3RYY.png" width="800">
</p>
La vista de detalle de postura posee un solo gráfico, el cual representa la cantidad total en el grupo de posturas abiertas y cerradas en porcentajes, si se busca añadir mas gráficos, es necesario modificar el archivo presente en "src\Components\Views\Postura.js"

### Detalle expresión

<p align="center">
<img src="https://i.imgur.com/6pECZoj.png" width="800">
</p>
La vista de detalle de expresión presenta 3 gráficos diferentes que representan diferentes caracteristicas presentes en la métrica de la expresión, la definición de cada gráfico esta presente dentro de cada uno de los mismos.

## Cambios al Sistema

A continuación, se indagará sobre los componentes del sistema, por cada vista presentada con anterioridad. Primero se localizarán los archivos relacionados de cada componente y de forma general, ciertas funcionalidades que presenta cada archivo o configuraciones que estos presenten de manera breve.

### Multimétrica y detalle multimétrica

Estas vistas estan presentes dentro del mismo archivo el cual se encuentra en la siguiente ruta: "src\Components\Views\Multimetrica.js". Dentro de este se encuentra una estructura similar a las de las otras vistas, en la cual se presentan los gráficos que fueron utilizados desde la carpeta "src\Components\Graphs", por lo que cualquier gráfico a añadir tiene que estar presente en esta carpeta, y ser importado del mismo. También es en este archivo donde se hace el enlace con el sistema de gestión, por lo que si se desea cambiar la ruta, sera necesario hacerlo desde éste.

### Habla y detalle del habla

La vista del habla y detalle del habla estan presentres dentro del mismo archivo el cual se encuentra en la siguiente ruta: "src\Components\Views\Habla.js". Dentro de este, al igual que todas las otras vistas, se encuentran los gráficos especificos de la métrica, por lo que cualquier cambio debe ser hecho desde la ruta "src\Components\Graphs".

### Postura y detalle de postura

La vista de la postura y detalle de la postura estan presentes dentro del mismo archivo el cual se encuentra en la siguiente ruta: "src\Components\Views\Postura.js". Dentro de esta se encuentra la misma estructura que las demas vistas, donde si se desea añadir mas gráficos, se tendra que hacer en la carpeta de la ruta: "src\Components\Graphs" e importarlos desde el mismo.

### Expresión y detalle de expresión

La vista de la expresión y detalle de la expresión estan presentes dentro del mismo archivo el cual se encuentra en la siguiente ruta: "src\Components\Views\Expresion.js". Dentro de esta se encuentra la misma estructura que las demas vistas, donde si se desea añadir mas gráficos, se tendra que hacer en la carpeta de la ruta: "src\Components\Graphs" e importarlos desde el mismo.

### Redux

En la carpeta redux presente en la ruta: "src\redux", se pueden encontrar dos archivos: "metricasDucks.js" y "store.js". En donde, el primero contiene todas las acciones y reducers presentes en el sistema, por lo que si se quiere modificar o agregar un reducer, se debe hacer desde la siguiente ruta: "src\redux\metricasDucks.js". De la misma forma, el segundo archivo contiene la tienda la cual almacenara todos los reducers instanciados en el archivo anterior, por lo cual, si se elminia o agrega otro reducer se debe hacer desde la siguiente ruta: "src\redux\store.js".
Cabe recalcar que, cada métrica posee un reducer en el cual se almacena toda la información correspondiente, como también, los parámetros del experimento provenientes desde el sistema de gestión.

### Boxes

La carpeta "BoxesComponents" presente en la ruta: "src\Components\BoxesComponents" posee los distintos archivos de cada cuadro de métrica presente en las vistas del: habla, postura, expresiones e información del experimento. Estas poseen la lógica que permite calcular algunos parámetros y mostrarlos en el cuadro correspondiente, por lo que si se desea agregar nuevos cuadros, o modificar los existentes, tienen que hacerse desde esta carpeta.

### Gráficos

Todos los gráficos desarrollados estan presentes en la carpeta de la ruta: "src\Components\Graphs". Es aqui donde si se desea modificar algun gráfico o agregar uno nuevo, se debe hacer.

## Configuraciones Avanzadas

A continuación, se considerarán algunos archivos de configuración de la plataforma MMViz.

### Layout

Este componente corresponde a la barra de navegación de la plataforma, la cual esta presente en la ruta: "src\Components\Layouts".

### Rutas

La carpeta presente en la ruta: "src\Components\Routes" posee un archivo el cual agrega todas las rutas presentes por cada métrica, por lo que si se desea agregar nuevas rutas o modificar las existentes, se debe hacer en la ruta: "src\Components\Routes\AppRouter.js"

### App.js

Finalmente el componente que instancia principalmente los componentes globales para los demás archivos viene desde la carpeta raíz, este componente instancia el componente que enruta las distintas vistas del sistema, permite el uso de redux de manera provisional y persistente, y llama al enrutador "AppRouter".
