//Es necesario que se logeen como administrador para que estas rutas tengan efecto
const { Router } = require('express');
const { check } = require('express-validator');
const { validateData, validateJWT, hasTipoUsuario } = require('../middlewares');
const { emailExists, userIdExists } = require('../helpers/req-validators');

const { usuariosGet,
    usuariosGetById,
    usuarioDeleteById,
    usuarioDeleteAll,
    usuarioPost,
    usuarioPut,
} = require('../controllers/usuarios');

const router = Router();

router.get('/usuarios', [
    validateJWT,
    hasTipoUsuario('administrador')
], usuariosGet);

router.get('/usuario/:id', [
    validateJWT,
    hasTipoUsuario('administrador'),
    check('id', 'Id no valido').isMongoId(),
    check('id').custom(userIdExists),
    validateData]
    , usuariosGetById);

router.delete('/usuario/:id', [
    validateJWT,
    hasTipoUsuario('administrador'),
    check('id', 'Id no valido').isMongoId(),
    check('id').custom(userIdExists),
    validateData]
    , usuarioDeleteById);

router.delete('/usuarios', [
    validateJWT,
    hasTipoUsuario('administrador')
],
    usuarioDeleteAll);


router.post('/usuario', [
    validateJWT,
    hasTipoUsuario('administrador'),
    check('name', 'El nombre es requerido').notEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'El password debe tener minimo 6 caracteres').isLength({ min: 6 }),
    check('email').custom(emailExists),
    validateData
], usuarioPost);

router.post('/newUser', [
    check('name', 'El nombre es requerido').notEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'El password debe tener minimo 6 caracteres').isLength({ min: 6 }),
    validateData
], usuarioPost);

//Ruta creada para crear administradores
router.post('/admin', [
    check('name', 'El nombre es requerido').notEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'El password debe tener minimo 6 caracteres').isLength({ min: 6 }),
    check('email').custom(emailExists),
    validateData
], usuarioPost);

router.put('/usuarios/:id', [
    validateJWT,
    hasTipoUsuario('administrador'),
    check('id', 'Id no valido').isMongoId(),
    check('id').custom(userIdExists),
    validateData
],
    usuarioPut);


module.exports = router;