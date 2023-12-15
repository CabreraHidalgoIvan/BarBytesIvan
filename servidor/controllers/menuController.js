const Menu = require("../models/Menu");

exports.crearPlato = async (req, res) => {
    try {
        let menu;

        menu = new Menu(req.body);

        await menu.save();
        res.send();
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
        
    }
}

exports.obtenerPlatos = async (req, res) => {
    try {
        const menus = await Menu.find();
        res.json(menus)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarPlato = async (req, res) => {
    try {

        const {nombre_plato, descripcion, precio, ingredientes, opciones_personalizacion, imagen, categoria, puntuacion, stock, visible_en_carta, calorias} = req.body;
        let menu = await Menu.findById(req.params.id);

        if(!menu){
            res.status(404).json({msg: 'No existe el plato'})
        }

        menu.nombre_plato = nombre_plato;
        menu.descripcion = descripcion;
        menu.precio = precio;
        menu.ingredientes = ingredientes;
        menu.opciones_personalizacion = opciones_personalizacion;
        menu.imagen = imagen;
        menu.categoria = categoria;
        menu.puntuacion = puntuacion;
        menu.stock = stock;
        menu.visible_en_carta = visible_en_carta;
        menu.calorias = calorias;



        menu = await Menu.findOneAndUpdate({_id: req.params.id}, menu, {new: true} )
        res.json(menu);

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerPlato = async (req, res) => {
    try {

        let menu = await Menu.findById(req.params.id);

        if(!menu){
            res.status(404).json({msg: 'No existe el plato'})
        }

        res.json(menu);

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarPlato = async (req, res) => {
    try {

        let menu = await Menu.findById(req.params.id);

        if(!menu){
            res.status(404).json({msg: 'No existe el plato'})
        }

        await Menu.findOneAndDelete({_id: req.params.id})
        res.json({msg: 'plato eliminado con exito'});

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}