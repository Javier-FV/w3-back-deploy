////////////REQ-VALIDATORS DE USUARIOS/////////////
const User = require('../models/usuario');


const emailExists = async (email = '') => {
    const user = await User.findOne({ email });
    if(user){
        throw new Error(`El correo ${email} ya existe en la plataforma`);
    }
}


const userIdExists = async (id = '') => {
    const user = await User.findById(id);
    if(!user){
        throw new Error(`El id: ${id} no existe`);
    }
}

module.exports = {
    emailExists,
    userIdExists
}