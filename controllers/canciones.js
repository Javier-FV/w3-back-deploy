const { response, request } = require('express');


const Cancion = require('../models/cancion');

const cancionesGet = async (req = request, res = response) => {
    const { limit = 10, numPage = 1 } = req.query;

    const skip = (Number(numPage) - 1) * Number(limit);

    const [total, canciones] = await Promise.all([
        Cancion.countDocuments(),
        Cancion.find().sort({ name: 1 }).skip(skip).limit(limit)
    ]);
    res.cookie('sky','blue');
    res.cookie('grass','green');
    res.json({
        total,
        canciones
    });


}

const cancionGet = async (req = request, res = response) => {

    //console.log("Entro a cancionGet")
    try {
        let cancionEncontrada = await Cancion.findById(req.params.id)
        res.json({
            cancionEncontrada
        });
    } catch (err) {
        res.json({
            errors: err.message
        })
    }
}


const cancionDeletebyId = async (req, res = response) => {
    
 
    console.log("Entro a eliminar por ID")
    const { id } = req.params;

    try {
        const cancion = await Cancion.findByIdAndDelete(id, req.body);

        res.json({
            cancion: cancion,
            status: "Canción eliminada"
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const cancionesDeleteAll = async (req, res = response) => {

    try {
        await Cancion.deleteMany({})
        res.json({
            status: "Canciones eliminadas"
        });
    } catch (err) {

        res.status(500).send(err.message);

    }
}

const cancionPost = async (req, res = response) => {

    const { name, autor, ...data } = req.body;

    try {
        console.clear()
        const cancionRecuperada = await Cancion.find({ name, autor })


        if (cancionRecuperada.length > 0) {
            res.json(
                "Existe una cancion en la DB con el mismo  autor y nombre"
            )
        } else {

            const cancion = new Cancion(req.body);
            await cancion.save();
            res.json({
                cancion
            });

        }

    } catch (err) {
        res.status(500).send(err.message);
    }
}


const cancionesPost = async (req, res = response) => {

    try {
        for (song of req.body) {
            let cancionGuardada = new Cancion(song);
            const cancionRecuperada = await Cancion.find({ name: cancionGuardada.name, autor: cancionGuardada.autor })

            if (cancionRecuperada.length === 0) {
                await cancionGuardada.save();
            }
        }//Aqui no hay respuesta porque el numero de respuestas da un error.
    } catch (err) {
        console.log("ERROR:", err.message)
    } finally {
        res.json({
            status: "Canciones guardadas",
        })
    }
}

const cancionPut = async (req, res = response) => {

    console.log("Entro a cancion PUT")
    const { id } = req.params;
    const { _id, ...data } = req.body;

    const cancion = await Cancion.findByIdAndUpdate(id, data);

    if (!cancion) {
        res.status(404).send("Usuario no encontrado para su actualizacion")
    } else {
        res.json({
            "status": "Usuario actualizado",
            "cancion": cancion.name
        })
    };


}


module.exports = {
    cancionesGet,
    cancionGet,
    cancionesDeleteAll,
    cancionDeletebyId,
    cancionPost,
    cancionesPost,
    cancionPut,

}