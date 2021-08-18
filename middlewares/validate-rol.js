
const hasTipoUsuario = (...tipoUsuarios) => {

    return (req, res, next) => {

        if(!req.user){
            return res.status(500).json({
                msg: 'Se requiere validar token antes de validar rol'
            })
        }
        
        if(!tipoUsuarios.includes(req.user.tipoUsuario)){
            return res.status(401).json({
                msg: `El rol de ${req.user.tipoUsuario} no en cuentra entre los rols permitidos para esta operacion`
            })
        }

        next();
    }
}

module.exports = {
    hasTipoUsuario 
}