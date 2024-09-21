'use strict'
var express = require('express');
var peliculasController=require('../controllers/peliculas');
var autenticacionControllers = require('../controllers/autenticacion');
var token = require('../helpers/autenticacion');
 
      
var routes = express.Router();

routes.post('/api/Peliculas',
    token.validarToken,
    peliculasController.crearpeliculas
);

routes.put('/api/peliculas/:_id',
    token.validarToken,
    peliculasController.editarPeliculas
);

routes.post('/api/usuario', 
    autenticacionControllers.registrarUsuario
);

routes.post('/api/login', 
     autenticacionControllers.iniciarSesion 
    
);
routes.get('/api/consulta',
    token.validarToken,
    peliculasController.consultarPelicula
)

routes.get('/api/parametros',
    token.validarToken,
    peliculasController.consultarParametros
)

module.exports = routes;
