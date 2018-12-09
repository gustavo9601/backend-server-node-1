'use strict';

// Requires // Importacion de librerias
var moongose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');


//Inicializar variables
var app = express();

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});


// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Rutas
var appRoutes = require('./routes/app');  //Importando el routes principal
var usuarioRoutes = require('./routes/usuario');
var hospitalRoutes = require('./routes/hospital');
var medicoRoutes = require('./routes/medico');
var loginRoutes = require('./routes/login');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');



//Conexion a la BD
moongose.connection.openUri('mongodb://localhost:27017/hospitalDB', function (err, res) {
    if (err) throw err;

    console.log("ONLINE Base de datos activo");

});


// Server index config
var serveIndex = require('serve-index');
app.use(express.static(__dirname + '/'))
app.use('/upload', serveIndex(__dirname + '/uploads'));



// Rutas
app.use('/busqueda', busquedaRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/medico', medicoRoutes);
app.use('/login', loginRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);
app.use('/', appRoutes); // utulizara la raiz el appRoutes


//Escuchar peticiones y definir el puerto de escucha
app.listen(3000, function () {
    console.log("ONLINE Express server en el puerto 3000 ");
});

