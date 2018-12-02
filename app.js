'use strict';

// Requires // Importacion de librerias
var express = require('express');
var moongose = require('mongoose');

//Inicializar variables
var app = express();

//Conexion a la BD
moongose.connection.openUri('mongodb://localhost:27017/hospitalDB', function (err, res) {
    if(err) throw err;

    console.log("ONLINE Base de datos activo");

});


//Escuchar peticiones y definir el puerto de escucha
app.listen(3000, function () {
    console.log("ONLINE Express server en el puerto 3000 ");
});


//Rutas
app.get('/', function (req, res, next) {

    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamnete'
    });

});

