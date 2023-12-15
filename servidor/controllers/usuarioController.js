const Usuario = require("../models/usuario");

exports.crearUsuario = async (req, res) => {
    try {
        let usuario;

        usuario = new Usuario(req.body);

        await usuario.save();
        res.send();
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
        
    }
}

exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarUsuario = async (req, res) => {
    try {

        const {nombre, psw, rol, email} = req.body;
        let usuario = await Usuario.findById(req.params.id);

        if(!usuario){
            res.status(404).json({msg: 'No existe el usuario'})
        }

        usuario.nombre = nombre;
        usuario.psw = psw;
        usuario.rol = rol;
        usuario.email = email;

        usuario = await Usuario.findOneAndUpdate({_id: req.params.id}, usuario, {new: true} )
        res.json(usuario);

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerUsuario = async (req, res) => {
    try {

        let usuario = await Producto.findById(req.params.id);

        if(!usuario){
            res.status(404).json({msg: 'No existe el producto'})
        }

        res.json(usuario);

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarUsuario = async (req, res) => {
    try {

        let usuario = await Usuario.findById(req.params.id);

        if(!usuario){
            res.status(404).json({msg: 'No existe el usuario'})
        }

        await Usuario.findOneAndDelete({_id: req.params.id})
        res.json({msg: 'usuario eliminado con exito'});

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}