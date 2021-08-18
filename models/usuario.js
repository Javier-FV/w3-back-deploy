const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Schema: El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'Schema: El mail es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Schema: El pass es obligatorio']
    },
    tipoUsuario: {
        type: String,
        required: true,
        enum: ["usuario", "administrador"],
        default: "usuario"
    },
    active: {
        type: Boolean,
        default: false
    },
    lista: {
        type: Schema.Types.ObjectId,
        ref: "lista"

    },
    lastLogin: Date,
    signupDate: {
        type: Date,
        default: Date.now()
    },
}, { timestamps: true });

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject(); // active, tipoUsuario en dev se deben anadir
    user.userId = _id;  //Se cambia el formato de la ID para que los atacantes no concluyan que la BD es Mongo
    return user;
}

module.exports = model('usuario', UserSchema);