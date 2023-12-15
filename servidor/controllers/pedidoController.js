const Pedido = require("../models/Pedido");

exports.crearPedido = async (req, res) => {
    try {
        let pedido;

        pedido = new Pedido(req.body);

        await pedido.save();
        res.send();
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
        
    }
}

exports.obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find();
        res.json(pedidos)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarPedidos = async (req, res) => {
    try {

        const {hora_pedido, estado_pedido, id_cliente, lista_platos_ordenados, mesa, precioTotal, comentarios} = req.body;
        let pedido = await Pedido.findById(req.params.id);

        if(!pedido){
            res.status(404).json({msg: 'No existe el pedido'})
        }

        pedido.hora_pedido = hora_pedido;
        pedido.estado_pedido = estado_pedido;
        pedido.id_cliente = id_cliente;
        pedido.lista_platos_ordenados = lista_platos_ordenados;
        pedido.mesa = mesa;
        pedido.precioTotal = precioTotal;
        pedido.comentarios = comentarios;


        pedido = await Pedido.findOneAndUpdate({_id: req.params.id}, pedido, {new: true} )
        res.json(pedido);

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerPedido = async (req, res) => {
    try {

        let pedido = await Pedido.findById(req.params.id);

        if(!pedido){
            res.status(404).json({msg: 'No existe el pedido'})
        }

        res.json(pedido);

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarPedido = async (req, res) => {
    try {

        let pedido = await Pedido.findById(req.params.id);

        if(!pedido){
            res.status(404).json({msg: 'No existe el pedido'})
        }

        await Pedido.findOneAndDelete({_id: req.params.id})
        res.json({msg: 'pedido eliminado con exito'});

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}