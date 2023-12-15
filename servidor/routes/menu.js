const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController')

router.post('/', menuController.crearPlato);
router.get('/', menuController.obtenerPlatos);
router.put('/:id', menuController.actualizarPlato);
router.get('/:id', menuController.obtenerPlato);
router.delete('/:id', menuController.eliminarPlato);



module.exports = router;