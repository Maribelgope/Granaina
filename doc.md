# Documentación

## Backend

### Estructura del backend

El backend es una API la cual recive las peticiones del frontend, revisa que el usuario tiene los permisos suficientes para hacer la petición, hace las peticiones necesarias a la base de datos y envia el resultado al frontend.

Para hacer este proceso el backend:

- Se inicia en el archivo index.js
- Crea las rutas necesarias a traves de los archivos de la carpeta routes.
- Cada archivo de la carpeta routes llama a la correspondiente función del controlador añadiendo el middleware de autenticación cuando es necesario.
- El middleware se ejecuta antes de ejecutar el c
- Cada función del controlador comprueba los permisos del usuario, hace las peticiones a la base de datos y envia el resultado.

Las carpetas del backend se componen de:

#### Controller

Contiene los archivos que controlan las acciones del servidor.
Los archivos del controller son:

- payment.controller.js: controlas los pagos de la tienda del lado del cliente.
- product.controller.js: controla las peticiones relacionadas con los productos que no estan relacionadas con las peticiones del panel de la tienda
- search.controller.js: controla las peticiones relacionadas con la búsqueda de productos.
- storeAccount.controller.js: controla las peticiones relacionadas con la configuración de la tienda.
- storeProducts.controller.js: controla las peticiones relacionadas con los productos del panel de la tienda.
- storePurchases.controller.js: controla los pagos de la tienda del lado del vendedor.
- user.controller.js: controla las peticiones relacionadas con la configuración de los compradores
- 
#### Middleware

Contiene los archivos de los middleware los cuales son partes de código que se ejecutan antes de ejecutan antes que el resto del código de la página web.
Se compone de:
- auth.js: es el archivo que gestiona la autenticación con json web token, genera una variable llamada user la cual contiene el id del usuario.
- 
#### Model

Contiene los archivos de los modelos los cuales definen la estructura de la base de datos en mongoose
Los archivos son:
- product.model.js: definen la estructura de la tabla de productos
user.model.js: define la estructura de la tabla de usuarios

#### Routes

Contiene los archivos de las rutas del backend las cuales son:

- payment.js: controla los pagos de la tienda del lado del comprador.
- product.js: controla la visualización de los productos
- search.js: controla la búsqueda de los productos
- storeAccount.js: controla la configuración de la tienda
- storeProducts.js: controla los productos de la tienda
- storePurchases.js: controla los pagos de la tienda del lado del vendedor.
- user.js: controla la configuración de los usuarios

#### Serivces

Contiene el archivo jwt.js el cual controla los json web tokens los cuales se usan para gestionar la autenticación del usuario en la página web.

#### node_modules

Es la carpeta que contiene las dependencias del proyecto, para crearla hay que instalar las dependencias de NodeJS con npm install.

#### .env

Es el archivo el cual contiene las variables de entorno, para crearlo hay que duplicar el archivo .env.example, renombrarlo como .env y modificar las variables de entorno para poder conectarse a la base de datos.

#### index.js

Es el archivo inicial del backend, es el primer archivo de Javascript que se ejecuta cuando se ejecuta el backend.

### Funcionamiento de la aplicación

La aplicación usa un stack MERN (**M**ongoDB, **E**xpressJS, **R**eact, **N**odeJS) el cual funciona de la siguiente forma:
- El frontend llega el usuario a traves de un servidor de [Vite](https://vitejs.dev/)
- Las páginas se procesan en el cliente
- Cuando el frontend quiere acceder a alguna parte del backend hace una petición a un servidor secundario el cual aloja el servidor de ExpressJS con NodeJS
- El baquend comprueba que la petición es válida usando el JWT que el frontend ha enviado al backend.
- El servidor hace las peticiones necesarias a la base de datos de MongoDB

### Base de datos:

Acualmente la base de datos se compone de tres tablas:
- La tabla de productos la cual contiene todos los productos de la tienda.
- La tabla se usuarios la cual contiene a los clientes y a los compradores.
- La tabla de compras la cual contendra las compras que se hayan hecho en la tienda en linea.

Las tablas de la base de datos estan definidas en el archivo backend/model.

La aplicación usa la API de mongoose para conectarse a la base de datos, esta es una API la cual simplifica las peticiones a la base de datos.

## Frontend

## Recursos en linea:

- Para aprender como funciona MERN: [Net Ninja MERN Stack Crash Course Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE)
- Para aprender como funciona react router: [Net Ninja React Router](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iVKmtNuCeIswnQ97in2GGf)
- Para aprender como funciona JWT: [Fireship Session vs Tokens Authentication in 100 seconds](https://www.youtube.com/watch?v=UBUNrFtufWo), [Net Ninja NodeJS Auth Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp)