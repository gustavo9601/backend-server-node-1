'use strict';

// Requires // Importacion de librerias
var express = require('express');
var moongose = require('mongoose');
var bodyParser = require('body-parser');


//Rutas
var appRoutes = require('./routes/app');  //Importando el routes principal
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');

//Inicializar variables
var app = express();
//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Conexion a la BD
moongose.connection.openUri('mongodb://localhost:27017/hospitalDB', function (err, res) {
    if (err) throw err;

    console.log("ONLINE Base de datos activo");

});


//Escuchar peticiones y definir el puerto de escucha
app.listen(3000, function () {
    console.log("ONLINE Express server en el puerto 3000 ");
});




app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes); // utulizara la raiz el appRoutes

