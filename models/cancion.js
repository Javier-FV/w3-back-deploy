const { Schema, model } = require('mongoose');

const Cancion = Schema({

    name: {
        type: String,            //La variable name es obligatoria para crear una cancion.
        required: [true, 'El nombre de la cancion es obligatorio']
    },
    urlPista: String,
    urlImagen: String,
    calificacion: {
        type: Number
    },
    autor: String,
    letra: String,
    genre: String, },

 { timestamps: true } // Guarda la fecha en la cual la cancion fue creada de manera automatica. 
);

Cancion.methods.toJSON = function () {
    const {  _id, ...cancion} = this.toObject(); // active, tipoUsuario en dev se deben anadir
    cancion.id = _id;  //Se cambia el formato de la ID para que los atacantes no concluyan que la BD es Mongo
    return cancion;
}

module.exports = model('cancione', Cancion);