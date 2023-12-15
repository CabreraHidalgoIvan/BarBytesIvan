const mongoose = require('mongoose');

const CarritoSchema = mongoose.Schema({
  items: [
    {
      platoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Plato',
      },
      cantidad: {
        type: Number,
        required: true,
        min: 1,
      },
      precio: {
        type: Number,
        required: true,
      },
      // Temporal hasta que habilitemos los usuarios (usuario genérico)
      sessionId: {
        type: String,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Carrito', CarritoSchema);
