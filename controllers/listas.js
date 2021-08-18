const { response, request } = require('express');


const Lista = require('../models/lista');

const listasGet = async (req = request, res = response) => {


    const { limit = 10, numPage = 1 } = req.query;

    const skip = (Number(numPage) - 1) * Number(limit);

    const [total, listas] = await Promise.all([
        Lista.countDocuments(),
        Lista.find().sort({ name: 1 }).skip(skip).limit(limit)
    ]);

    res.json({
        total,
        listas
    });
}


const listaGet = async (req = request, res = response) => {

    try {
        const { id } = req.params;
        let listaEncontrada = await Lista.findById(id)
        res.json({
            listaEncontrada
        });
    } catch (err) {
        res.json({
            errors: err.message
        })
    }
}


const listaPost = async (req, res = response) => {

    try {
        const lista = new Lista(req.body);
        await lista.save();
        res.json({
            lista
        });

    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

const listaDeleteById = async (req, res = response) => {

    const { id } = req.params;

    try {
        const lista = await Lista.findByIdAndDelete(id)
        res.json({
            "ListaEliminada": lista});
    } catch (err) {
        res.json({
            "errors": err.message
        })
    }
}

const listasDeleteAll = async  (req, res = response) =>{

    try{
    await Lista.deleteMany({})
        res.json({
                status: "Listas eliminadas"
        });}catch(err){

            res.status(500).send(err.message);

        }
}

const listaPut = async (req, res = response) => {

    console.log("Entro a lista PUT")
    const { id } = req.params;
    const { _id, ...data } = req.body;

    const lista = await Lista.findByIdAndUpdate(id, data);

    if (!lista) {
        res.status(404).send("Lista no encontrada para su actualizacion")
    } else {
        res.json({
            "status": "Lista actualizada",
            "lista": lista.name
        })
    };


}




module.exports = {
    listasGet,
    listaGet,
    listaDeleteById, 
    listasDeleteAll,
    listaPost,
    listaPut,
}