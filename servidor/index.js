const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");

//Creamos el servidor
const app = express();

//Conectamos a la BD
conectarDB()

app.use(cors());

app.use(express.json());

app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/pedidos', require('./routes/pedido'));

app.listen(4000, () => {
    console.log("Server is running on port: ", 4000);
    
})