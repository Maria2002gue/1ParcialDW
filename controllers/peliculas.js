'use strict'

var peliculas = require('../models/Peliculas');

function crearpeliculas(req, resp){

    var peliculasRecibida = req.body;

    var nuevaPelicula = new Peliculas();
    nuevaPelicula.titulo = peliculaRecibida.titulo; 
    nuevaPelicula.director = peliculaRecibida.director; 
    nuevaPelicula.añoLanzamiento = peliculaRecibida.añoLanzamiento;
    nuevaPelicula.productora = peliculaRecibida.productora;
    nuevaPelicula.precio = peliculaRecibida.precio; 

    nuevaPelicula.save().then(
        (peliculasGuardadas) =>{
            resp.status(200).send({peliculaCreada: peliculasGuardadas});
        },
        err =>{
            resp.status(500).send({message: "No se pudo crear la pelicula, intente nuevamente"

            }); 
        }
    );
}




function editarPeliculas(req, resp){

    var idPAeditar=req.params._id;
    var datosRecibido = req.body;

    var PeliculaEditar = new Pelicula();
    peliculaEditar._id = idPeliculaAeditar;
    peliculaEditar.titulo = datosRecibidos.titulo;
    peliculaEditar.director = datosRecibidos.director;
    peliculaEditar.añoLanzamiento = datosRecibidos.añoLanzamiento;
    peliculaEditar.productora = datosRecibidos.productora;
    peliculaEditar.precio = datosRecibidos.precio;

    Pelicula.findByIdAndUpdate(idPeliculaAeditar,PeliculaEditar,{
        new: true}).then((peliculaEditado) => {
            resp.status(200).send({peliculaEditado: peliculaEditado});
        },
       
        err =>{
            resp.status(500).send({message: "No se pudo crear intente nuevamente"

            }); 
        }
    );
}
function consultarPelicula(req, resp){
    peliculas.findOne({titulo: req.body.titulo}).then(
        (peliculaEncontrada)=>{
            if(peliculaEncontrada == null){
                resp.status(403).send({message: 'Pelicula no encontrada'});
            }
            else{
                resp.status(200).send({message: 'Pelicula encontrada', pelicula: peliculaEncontrada});
            }
        },
        (err)=>{
            resp.status(500).send({message: 'Error al buscar la pelicula'});
        }
    )
}

function consultarParametros(req, resp){
    peliculas.find({lanzamiento: {$gt: req.body.lanzamiento}} && {precio: {$lte: req.body.precio}}).then(
        (peliculaEncontrada)=>{
            if(peliculaEncontrada == null){
                resp.status(403).send({message: 'Pelicula no encontrada'});
            }
            else{
                resp.status(200).send({message: 'Pelicula encontrada', pelicula: peliculaEncontrada});
            }
        },
        (err)=>{
            resp.status(500).send({message: 'Error al buscar la pelicula'});
        }
    )
}

module.exports = {
    crearpeliculas, 
    editarPeliculas,
   consultarPelicula,
 consultarParametros
}
