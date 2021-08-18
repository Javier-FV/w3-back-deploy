const Cancion= require('../models/cancion'); //Toca ordenar el middleware de postcancion 


const cancionExists = async (name = '', autor='') => {

    const cancion = await Cancion.find({ name,autor})
    if(cancion){
        throw new Error(`La cancion ${cancion.name} del autor ${cancion.autor}  ya existe en la plataforma`);
    }
}


module.exports = {
    cancionExists,
}