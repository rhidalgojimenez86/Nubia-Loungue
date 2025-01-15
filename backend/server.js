const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//Importar rutas
const flavorsRoutes = require('./routes/flavors');
const ordersRoutes = require('./routes/orders');
const coalsRoutes = require('./routes/coals');

//Registrar rutas
app.use('/api/flavors', flavorsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/coals', coalsRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

//Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err); //Registrar el error en la consola
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';
  res.status(status).json({ error: message });
});

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});