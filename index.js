'use strict'

var application = require('./application');
var mongoose = require('mongoose');

mongoose.connect(
    'mongodb://127.0.0.1:27017/Parcial#1')
    .then(
        ()=> {
            console.log("conexion exitosa");
            application.listen(9898,function(){
                console.log("aplicacion iniciada");
            })
        },
        err =>{
            console.log(err);
        }
    );
