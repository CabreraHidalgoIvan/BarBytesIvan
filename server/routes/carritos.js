const express = require('express');
const router = express.Router();

const carritoController = require('../controllers/carritoController');

// api/carritos

router.get('/', carritoController.obtenerCarrito);

router.post('/', carritoController.agregarPlatoAlCarrito);

router.put('/:id', carritoController.actualizarPlatosDelCarrito);

router.delete('/:id', carritoController.eliminarPlatoDelCarrito);

module.exports = router;
