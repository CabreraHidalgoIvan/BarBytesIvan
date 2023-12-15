// Rutas para las categorías
const express = require('express');
const router = express.Router();

const categoriaController = require('../controllers/categoriaController');

// api/categories

router.get('/', categoriaController.obtenerCategorias);
router.get('/:id', categoriaController.obtenerCategoria);

router.post('/', categoriaController.crearCategoria);

router.put('/:id', categoriaController.actualizarCategoria);

router.delete('/:id', categoriaController.eliminarCategoria);

module.exports = router;
