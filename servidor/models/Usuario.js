const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        unique: true
    },
    psw:{
        type: String,
        required: true
    },
    rol:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model("Usuarios", UsuarioSchema);