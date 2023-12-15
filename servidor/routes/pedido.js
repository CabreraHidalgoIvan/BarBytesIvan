const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController')

router.post('/', pedidoController.crearPedido);
router.get('/', pedidoController.obtenerPedidos);
// router.put('/:id', pedidoController.actualizarPedido);
router.post('/:id', function(req, res){
    pedidoController.actualizarPedido
  });
router.get('/:id', pedidoController.obtenerPedido);
router.delete('/:id', pedidoController.eliminarPedido);



module.exports = router;