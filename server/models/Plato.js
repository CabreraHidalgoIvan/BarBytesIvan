const mongoose = require('mongoose');

const PlatoSchema = mongoose.Schema({
  categoriaId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Categoria',
    },
  ],
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
    trim: true,
  },
  img: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Plato', PlatoSchema);
