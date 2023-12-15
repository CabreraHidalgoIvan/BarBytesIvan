const Usuario = require('../models/Usuario');

// Metodos GET
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    return res.status(200).json(usuarios);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};

exports.obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};

// Metodos POST
exports.crearUsuario = async (req, res) => {
  try {
    console.log(req.body);
    const usuario = new Usuario(req.body);
    await usuario.save();
    return res.status(201).json(usuario);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};

// Metodos PUT
exports.actualizarUsuario = async (req, res) => {
  try {
    const { nombre, password, role, email } = req.body;
    let usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    console.log(body);
    usuario.nombre = nombre;
    usuario.password = password;
    usuario.role = role;
    usuario.email = email;

    await usuario.save();
    return res.status(201).json(usuario);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};

// Metodos DELETE
exports.eliminarUsuario = async (req, res) => {
  try {
    let usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    await Usuario.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json({ msg: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};
