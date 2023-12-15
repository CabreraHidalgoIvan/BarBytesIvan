const express = require('express');
const router = express.Router();

const platoController = require('../controllers/platoController');

// api/platos

router.get('/', platoController.obtenerPlatos);
router.get('/:id', platoController.obtenerPlato);

router.post('/', platoController.crearPlato);

router.put('/:id', platoController.actualizarPlato);

router.delete('/:id', platoController.eliminarPlato);

module.exports = router;
