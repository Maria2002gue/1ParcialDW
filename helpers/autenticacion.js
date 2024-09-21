'use strict'

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "kghgasdyRARWas!.";


function generarTokenUsuario(usuario){
    var payload = {
        sub: usuario._id,
        name: usuario.nombre,
        email: usuario.email,
        iat: moment.unix(),
        exp: moment().add(10, 'minutes').unix()
    }
    return jwt.encode(payload, secret);
}

function validarToken(req, resp, nextStep){
    try{
        var tokenEnviadoPorUsuario = req.headers.authorization;

        var tokenLimpio = tokenEnviadoPorUsuario.replace('Bearer','');

        var payload = jwt.decode(tokenLimpio, secret);
        req.headers.UserId = payload.sub;
        //Backend para recordar el usuario que se logueo
        nexStep();
    }
    catch(ex){
        resp.status(403).send(
            {message: "Token no valido"}
        );
    }
}

module.exports = {
    generarTokenUsuario, validarToken
}