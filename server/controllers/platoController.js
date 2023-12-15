const Plato = require('../models/Plato');
const Categoria = require('../models/Categoria');

// Metodos GET
exports.obtenerPlatos = async (req, res) => {
  try {
    const { sort, limit, categoriaNombre, search } = req.query;

    let query = Plato.find();

    if (search) {
      query = query.where('nombre').regex(new RegExp(search, 'i'));
    }

    if (categoriaNombre) {
      const categoria = await Categoria.findOne({ nombre: categoriaNombre });
      if (categoria) {
        query = query.where('categoriaId').equals(categoria._id);
      } else {
        return res.status(404).json({ msg: 'Categoría no encontrada' });
      }
    }

    query = query.populate({
      path: 'categoriaId',
      select: 'nombre',
    });

    if (sort) {
      // Asumiendo que quieres ordenar por 'nombre'
      const sortOrder = sort === 'asc' ? 'nombre' : '-nombre';
      query = query.sort(sortOrder);
    }
    if (limit) {
      query = query.limit(Number(limit));
    }

    const platos = await query;

    if (!platos || platos.length === 0) {
      return res.status(404).json({ msg: 'No existen platos' });
    }
    return res.status(200).json(platos);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};

exports.obtenerPlato = async (req, res) => {
  try {
    let plato = await Plato.findById(req.params.id);

    if (!plato) {
      return res.status(404).json({ msg: 'No existe el plato' });
    }

    return res.status(201).json(plato);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};

// Metodos POST

exports.crearPlato = async (req, res) => {
  try {
    let plato;

    // Crea la nueva categoría
    plato = new Plato(req.body);

    // Guarda la categoría
    await plato.save();

    return res.status(201).json(plato);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};

// Metodos PUT

exports.actualizarPlato = async (req, res) => {
  try {
    const { nombre, descripcion, precio, img } = req.body;
    let plato = await Plato.findById(req.params.id);

    if (!plato) {
      return res.status(404).json({ msg: 'No existe el plato' });
    }

    plato.nombre = nombre;
    plato.descripcion = descripcion;
    plato.precio = precio;
    plato.img = img;
    plato.categoriaId = req.body.categoriaId;

    // Guarda la categoría
    await plato.save();

    return res.status(201).json(plato);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};

// Metodos DELETE

exports.eliminarPlato = async (req, res) => {
  try {
    let plato = await Plato.findById(req.params.id);

    if (!plato) {
      return res.status(404).json({ msg: 'No existe el plato' });
    }

    await Plato.findOneAndDelete({ _id: req.params.id });

    return res.status(201).json({ msg: 'Plato eliminado correctamente' });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};
