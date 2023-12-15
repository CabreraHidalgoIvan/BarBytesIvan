const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema({
    nombre_plato:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        
    },
    precio:{
        type: mongoose.Types.Decimal128,
        required: true
    },
    ingredientes:{
        type: [String],
    },
    opciones_personalizacion:{
        type: [String],
    },
    imagen:{
        type: String,
        required: true
    },
    categoria:{
        type: String
    },
    puntuacion:{
        type: mongoose.Types.Decimal128,
        min: 0, 
        max: 5
    },
    stock:{
        type: Number
    },
    visible_en_carta:{
        type: Boolean,
    },
    calorias:{
        type: Number
    }
})

module.exports = mongoose.model("Menu", MenuSchema);