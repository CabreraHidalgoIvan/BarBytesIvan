const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// stripe
const bodyparser = require('body-parser');

const app = express();

// Conectar a la base de datos
conectarDB();

app.use(cors());

// Habilitar express.json
app.use(express.json({ extended: true }));

// Imágenes para las categorías
app.use('/assets', express.static('public/assets'));

// Rutas de las categorías
app.use('/api/categories', require('./routes/categories'));

// Rutas de los platos
app.use('/api/platos', require('./routes/platos'));

app.use('api/carrito', require('./routes/carritos'));

// Rutas de los usuarios
app.use('/api/usuarios', require('./routes/usuarios'));

// Stripe routes
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require('stripe')(
  'sk_test_51OKb8xIFKAgZXg8bmnGHalFchnhU1xyNqLqViLesa631rKmR8yDsawK91IpvSgIrBFx1Qa1fH5mtH7PyArTGeXVf00WQTckjq9'
);

app.post('/checkout', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.items.map((items) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: items.name,
            images: [items.img],
          },
          unit_amount: items.price * 100,
        },
        quantity: items.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:4000/success.html',
      cancel_url: 'http://localhost:4000/cancel.html',
    });

    res.status(200).json(session);
  } catch (error) {
    console.log(error);
  }
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
