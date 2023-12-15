const Categoria = require('../models/Categoria');

// Metodos GET
exports.obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    return res.status(201).json(categorias);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};

exports.obtenerCategoria = async (req, res) => {
  try {
    let categoria = await Categoria.findById(req.params.id);

    if (!categoria) {
      return res.status(404).json({ msg: 'No existe la categoría' });
    }

    return res.status(201).json(categoria);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};

// Metodos POST
exports.crearCategoria = async (req, res) => {
  try {
    let categoria;

    // Crea la nueva categoría
    categoria = new Categoria(req.body);

    // Guarda la categoría
    await categoria.save();

    return res.status(201).json(categoria);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};

// Metodos PUT
exports.actualizarCategoria = async (req, res) => {
  try {
    const { nombre, descripcion, img } = req.body;
    let categoria = await Categoria.findById(req.params.id);

    if (!categoria) {
      return res.status(404).json({ msg: 'No existe la categoría' });
    }

    categoria.nombre = nombre;
    categoria.descripcion = descripcion;
    categoria.img = img;

    categoria = await Categoria.findOneAndUpdate(
      { _id: req.params.id },
      categoria,
      { new: true }
    );

    return res.status(201).json(categoria);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};

// Metodos DELETE
exports.eliminarCategoria = async (req, res) => {
  try {
    let categoria = await Categoria.findById(req.params.id);

    if (!categoria) {
      return res.status(404).json({ msg: 'No existe la categoría' });
    }

    await Categoria.findOneAndDelete({ _id: req.params.id });

    return res.status(201).json({ msg: 'Categoría eliminada' });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};
