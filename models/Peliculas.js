'use strict'

var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var PeliculasSchema = Schema({
    Titulo: String,
    Director: String,
    AñoLanzamiento: Number,
    Productora: String,
    Precio: Number
});

module.exports = 
   mongoose.model('peliculas',
    PeliculasSchema);