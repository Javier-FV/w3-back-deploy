const { Router } = require('express');
const { check } = require('express-validator');
const { validateData, validateJWT, hasTipoUsuario } = require('../middlewares');
const { emailExists, userIdExists } = require('../helpers/req-validators');



const { cancionesGet,
        cancionGet,
        cancionDeletebyId,
        cancionesDeleteAll,
        cancionPost,
        cancionesPost,
        cancionPut,
    } = require('../controllers/canciones')

const router = Router();

router.get('/canciones',cancionesGet );
router.get('/cancion/:id',cancionGet);

router.delete ('/cancion/:id',[
    validateJWT],
cancionDeletebyId);
router.delete ('/canciones',cancionesDeleteAll);
router.post('/cancion', cancionPost);
router.post('/canciones', cancionesPost);
router.put('/cancion/:id', cancionPut);


module.exports = router;
        