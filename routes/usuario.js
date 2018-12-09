// Requires // Importacion de librerias
var express = require('express');
var moongose = require('mongoose');
var bcrypt = require('bcryptjs');


var mdAutenticacion = require('../middlewares/autenticacion');


//Inicializar variables
var app = express();

var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;


//Modelo
var Usuario = require('../models/usuario');


/*==================================*/
/*OBTENER TODOS LOS USUARIOS*/
/*==================================*/
app.get('/', function (req, res, next) {

    /*
    * Retornara todos los usuarios, y las columnas especificadas
    * */
    Usuario.find({}, 'nombre email img role').exec(
        function (err, usuarios) {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando usuarios',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                usuarios: usuarios
            });
        });
});







// ==========================================
// Actualizar usuario
// ==========================================
app.put('/:id',mdAutenticacion.verificaToken, function (req, res) {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, function (err, usuario) {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (
            !usuario
        ) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: {message: 'No existe un usuario con ese ID'}
            });
        }


        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save(function (err, usuarioGuardado) {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = ':)';

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });

        });

    });

});


/*============================*/
/*CREAR UN NUEVO USUARIO*/
/*============================*/

app.post('/', mdAutenticacion.verificaToken , function (req, res) {
    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuariotoken: req.usuario
        });


    });


});


// ============================================
//   Borrar un usuario por el id
// ============================================
app.delete('/:id', mdAutenticacion.verificaToken,  function (req, res) {

    var id = req.params.id;

    Usuario.findByIdAndRemove(id, function (err, usuarioBorrado) {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar usuario',
                errors: err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con ese id',
                errors: {message: 'No existe un usuario con ese id'}
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

});


module.exports = app;