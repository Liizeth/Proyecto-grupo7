//console.log('hola mundo '); 

//const http = require ('http');
//
//const PORT = 3000
//
//const server = http.createServer((request, response)=>{
//    response.statusCode=200;
//    response.setHeader('Content-Type', 'text/plain');
//    response.end ('hola, mundo');
//})
//
//server.listen (PORT, () =>{
//    console.log (`servidor ejecutandose puerto : ${PORT}`);
//})
//


const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 3008;
const FILE_PATH = 'DataBase/trailerflix.json';

let bd;

// Cargar el archivo JSON al iniciar
fs.readFile(FILE_PATH, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }
    try {
        bd = JSON.parse(data);
        console.log('JSON cargado correctamente');
    } catch (parseErr) {
        console.error('Error al parsear el JSON:', parseErr);
    }
});

// Crear el servidor
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    // Ruta raíz
    if (path === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Trailerflix</h1>');
    }

    // Ruta /catalogo
    else if (path === '/catalogo' && req.method === 'GET') {
        if (!bd) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Datos no cargados' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(bd));
    }

    // Ruta no encontrada
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Ruta no encontrada');
    }
});

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
