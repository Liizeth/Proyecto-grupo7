# TP2 - Backend - Ingenias+ - Grupo 7

Este proyecto es el **Trabajo Práctico 2** del curso de Backend de **Ingenias+**, en el que se construye una API REST para gestionar una base de datos de productos de un supermercado.  
La API permite realizar operaciones básicas con productos utilizando los métodos HTTP: **GET**, **POST**, **PUT** y **DELETE**.

## 🚀 Tecnologías usadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)

## 📦 Instalación
- Asegurate de tener **Node.js** instalado. Si no lo tenés, podés descargarlo desde [nodejs.org](nodejs.org).
-Instalá las dependencias necesarias:
```
  npm install <dependecia a usar>

  //ejemplo npm install express
```


## 📁 Estructura del proyecto
```
.
├── src/
│ ├── funciones.js # Funciones de validación y utilidad
│ └── mongodb.js # Conexión y desconexión a MongoDB
├── .env # Variables de entorno
├── server.js # Archivo principal del servidor
├── package.json
```

## 📡 Métodos HTTP

### GET 🔍
    Pedís información al servidor.
    Ejemplo: dame todos los productos o uno en particular.

### POST ✉️➕
    Enviás datos nuevos al servidor.
    Ejemplo: agregás un producto nuevo a la base de datos.

### PUT 📝🔄
    Actualizás un recurso existente.
    Ejemplo: cambiás el precio o nombre de un producto.

### DELETE ❌🗑️
    Eliminás un recurso.
    Ejemplo: borrás un producto de la base de datos.

## 👩‍💻 Autor
 [Lizeth](https://github.com/Liizeth/) 🦋<br> 
 [Lesly](https://github.com/ltoctoar) 🐾

