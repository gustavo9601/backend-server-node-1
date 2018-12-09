
// Requires // Importacion de librerias
var express = require('express');

//Inicializar variables
var app = express();


app.get('/', function (req, res, next) {

    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamnete'
    });

});

module.exports = app;