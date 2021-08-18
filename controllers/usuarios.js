const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {

    const { limit = 10, numPage = 1 } = req.query;

    const skip = (Number(numPage) - 1) * Number(limit);

    const [totalUsuarios, totalUsuariosSinActivar, totalUsuariosActivados,
        usuariosSinActivar, UsuariosActivados, usuarios] = await Promise.all([
            User.countDocuments({}),
            User.countDocuments({ active: true }),
            User.countDocuments({ active: false }),
            User.find({ active: true }).skip(skip).limit(limit),
            User.find({ active: false }).skip(skip).limit(limit),
            User.find().skip(skip).limit(limit)
        ]);

    res.json({
        totalUsuarios,
        totalUsuariosSinActivar,
        totalUsuariosActivados,
        usuariosSinActivar,
        UsuariosActivados,
        usuarios
    });
}

const usuariosGetById = async (req = request, res = response) => {

    console.log("Entro a GET USUARIO/:ID")

    const { id } = req.params;
    let usuarioEncontrado = await User.findById(id);
    res.json(usuarioEncontrado);
    
}

const usuarioDeleteById = async (req, res = response) => {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    res.json({"usuarioEliminado":user});
}

const usuarioDeleteAll = async (req, res = response) => {

    await User.deleteMany()
    res.json({"Estado":"Todos los usuarios han sido eliminados"});

}

const usuarioPost = async (req, res = response) => {

    try {
        const { name, email, password, tipoUsuario, ...data } = req.body;

        const user = new User({ name, email, password, tipoUsuario, ...data });

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();
        res.json({
            "status": "Usuario creado exitosamente",
            user
        });
    } catch (err) {
        res.json( {"errors": err.message} );
    }
}

const usuarioPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, email, ...data } = req.body;

    if(password){
        const salt = bcrypt.genSaltSync();
        data.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, data);

    res.json(user);
}




module.exports = {
    usuariosGet,
    usuariosGetById,
    usuarioDeleteById,
    usuarioDeleteAll,
    usuarioPost,
    usuarioPut

}