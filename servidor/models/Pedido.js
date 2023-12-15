const mongoose = require('mongoose');

const PedidoSchema = mongoose.Schema({
    hora_pedido:{
        type: Date,
        default: Date.now
    },
    estado_pedido:{
        type: String,
        
    },
    id_cliente:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    lista_platos_ordenados:{
        type: [mongoose.Types.ObjectId],
        required: true
    },
    mesa:{
        type: Number,
        required: true
    },
    precioTotal:{
        type: mongoose.Types.Decimal128,
        required: true
    },
    comentarios:{
        type: String
    }
})

module.exports = mongoose.model("Pedidos", PedidoSchema);