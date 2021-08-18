const User = require('../models/usuario');
const bcrypt = require('bcryptjs');

const { generatorJWT } = require('../helpers/generator-jwt');

const login = async (req, res) => {

    const { email, password } = req.body;
    const strError = 'User / password incorrecto/ Usuario sin Activar';

    try {
        const user = await User.findOne({ email, active: true }); //Solo se puede logear las personas activas y con correo valido

        if (!user) {
            return res.status(400).json({
                errors: {
                    msg: strError
                }
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword) {
            return res.status(400).json({
                errors: {
                    msg: strError
                }
            })
        }
        console.log(user.id);
        const token = await generatorJWT(user.id)

        if (!token) {
            return res.json({
                errors: {
                    msg: strError
                }
            })

        }
        return res.json({
            "msg": 'Ok Post Login',
            "usuario": user,
            "token": token
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            errors: {
                msg: 'Error en el servidor, hable con el administrador'
            }
        })
    }
}

module.exports = {
    login
}