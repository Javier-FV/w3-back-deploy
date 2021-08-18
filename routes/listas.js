const { Router } = require('express');
const { check } = require('express-validator');
const { validateData, validateJWT, hasTipoUsuario } = require('../middlewares');
const { emailExists, userIdExists } = require('../helpers/req-validators');



const {
    listaGet,
    listasGet,
    listaDeleteById,
    listasDeleteAll,
    listaPost,
    listaPut,
} = require('../controllers/listas')

const router = Router();

router.get('/listas', [
    validateJWT,
    hasTipoUsuario('administrador', 'usuario')]
    ,listasGet);
router.get('/lista/:id', listaGet);
router.post('/lista', listaPost);
router.put('/lista/:id', listaPut);
router.delete('/lista/:id', listaDeleteById);
router.delete('/listas', listasDeleteAll);


module.exports = router;