const Carrito = require('../models/Carrito');
const Plato = require('../models/Plato');

// Metodos GET

exports.obtenerCarrito = async (req, res) => {
  try {
    const sessionId = req.headers['sessionId']; // Esto asume que el cliente envía un header con el sessionId
    let carrito = await Carrito.findOne({ sessionId }).populate(
      'items.platoId'
    );
    return res.status(200).json(carrito);

    // PARA IMPLEMENTAR MÁS ADELANTE
    // Aquí asumimos que hay un carrito por usuario y usamos el ID de usuario para buscar
    // let carrito = await Carrito.findOne({ usuarioId: req.usuario.id }).populate(
    //   'items.platoId'
    // );
    // res.json(carrito);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};

// Metodos POST

exports.agregarPlatoAlCarrito = async (req, res) => {
  try {
    const sessionId = req.headers['sessionId'];
    const { platoId, cantidad } = req.body;
    let carrito = await Carrito.findOne({ usuarioId: req.usuario.id });

    // Si no existe el carrito, lo creamos
    if (!carrito) {
      carrito = new Carrito({ usuarioId: sessionId });
      //   carrito = new Carrito({ usuarioId: req.usuario.id });
    }

    // Buscamos el plato en el carrito
    const existePlato = carrito.items.find(
      (item) => item.platoId.toString() === platoId
    );

    // Si existe, actualizamos la cantidad
    if (existePlato) {
      existePlato.cantidad = cantidad;
    } else {
      // Si no existe, lo agregamos al carrito
      carrito.items.push({ platoId, cantidad });
    }

    // Calculamos el total
    carrito.total = carrito.items.reduce(
      (acc, item) => (acc += item.platoId.precio * item.cantidad),
      0
    );

    // Guardamos el carrito
    await carrito.save();

    // Devolvemos el carrito
    return res.status(200).json(carrito);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};

// Metodos PUT

exports.actualizarPlatosDelCarrito = async (req, res) => {
  try {
    const { cantidad } = req.body;
    let carrito = await Carrito.findOne({ usuarioId: req.usuario.id });

    // Si no existe el carrito, devolvemos un error
    if (!carrito) {
      return res.status(404).json({ msg: 'No existe el carrito' });
    }

    // Buscamos el plato en el carrito
    const existePlato = carrito.items.find(
      (item) => item.platoId.toString() === req.params.id
    );

    // Si no existe el plato, devolvemos un error
    if (!existePlato) {
      return res.status(404).json({ msg: 'No existe el plato en el carrito' });
    }

    // Actualizamos la cantidad
    existePlato.cantidad = cantidad;

    // Calculamos el total
    carrito.total = carrito.items.reduce(
      (acc, item) => (acc += item.platoId.precio * item.cantidad),
      0
    );

    // Guardamos el carrito
    await carrito.save();

    // Devolvemos el carrito
    return res.status(200).json(carrito);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};

// Metodos DELETE

exports.eliminarPlatoDelCarrito = async (req, res) => {
  try {
    let carrito = await Carrito.findOne({ usuarioId: req.usuario.id });

    // Si no existe el carrito, devolvemos un error
    if (!carrito) {
      return res.status(404).json({ msg: 'No existe el carrito' });
    }

    // Buscamos el plato en el carrito
    const existePlato = carrito.items.find(
      (item) => item.platoId.toString() === req.params.id
    );

    // Si no existe el plato, devolvemos un error
    if (!existePlato) {
      return res.status(404).json({ msg: 'No existe el plato en el carrito' });
    }

    // Eliminamos el plato del carrito
    carrito.items = carrito.items.filter(
      (item) => item.platoId.toString() !== req.params.id
    );

    // Calculamos el total
    carrito.total = carrito.items.reduce(
      (acc, item) => (acc += item.platoId.precio * item.cantidad),
      0
    );

    // Guardamos el carrito
    await carrito.save();

    // Devolvemos el carrito
    return res.status(200).json(carrito);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};
