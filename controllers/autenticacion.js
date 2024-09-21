'use strict'

var Usuario = require("../models/usuarios");
var token = require("../helpers/autenticacion");
var bcryptjs = require("bcryptjs");
var usser = require("../models/usuarios");
var user = false;


function registrarUsuario(req, resp){
    var parametros = req.body;
    var salt = bcryptjs.genSaltSync(10);

    var password = bcryptjs.hashSync(parametros.password, salt);

    var nuevoUsuario = new Usuario();
    nuevoUsuario.nombre= parametros.nombre;
    nuevoUsuario.email= parametros.email;
    nuevoUsuario.apellidos= parametros.apellidos;
    nuevoUsuario.password= password;

    nuevoUsuario.save().then(
        (usuarioGuardado)=>{
            resp.status(200.).send({message: usuarioGuardado});
        },
        err =>{resp.status(500).send({message:"No se puedo crear el usuario"});
        }

    );

}

function iniciarSesion(req, resp){
    var parametros = req.body;

    var emailIngresado = parametros.email;
    var passwordIngresado = parmetros.password;

    Usuario.findone({email: emailIngresado}).then(
        (usuarioEncontrado) => {
            if(usuarioEncontrado == null){
                resp.status(403).send({
                    message: "No existe usuario"
                });
            }
            else{
                if(bcrypt.compareSync(passwordIngresado,usuarioEncontrado.password)){
                    resp.status(200).send({
                        message: "Login exitoso",
                        token:
                        token.generarTokenUsuario(usuarioEncontrado)
                    });
                }
                else{
                    resp.status(403).send({
                        message: "Credenciales incorrectas"
                    });
                }
            }
        },
        err =>{
            resp.status(500).send({
                message: " No se pudo validar usuario"
            });
        }
    );
}

module.exports = {
    iniciarSesion, registrarUsuario
};