import dotenv from 'dotenv';
dotenv.config();  // Cargar las variables de entorno antes de cualquier otra cosa

import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as socketIo } from 'socket.io';

import { createTables } from './src/database/initDB.js';

// Llamamos a la función para crear las tablas al arrancar el servidor
createTables();

import getPool from '../backend/src/database/getPool.js';  // Asegúrate de usar la extensión .js en la importación
import flavorsRoutes from './routes/flavors.js';
import ordersRoutes from './routes/orders.js';
import coalsRoutes from './routes/coals.js';

// Cargar las variables de entorno
dotenv.config();  

const app = express();
const server = http.createServer(app);  // Usamos el servidor HTTP para Socket.io
const io = new socketIo(server, {
  cors: {
    origin: ["http://localhost:5173"], // Aquí pones la URL de tu frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Registrar rutas
app.use('/api/flavors', flavorsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/coals', coalsRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

// Configurar Socket.io
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Recibir y manejar una nueva solicitud de carbón/cachimba
  socket.on('new-coal-request', async (data) => {
    const { tableId, requestType } = data;

    try {
      const pool = await getPool();

      // Verificar si la mesa está libre
      const [table] = await pool.query('SELECT * FROM tables WHERE tableNumber = ?', [tableId]);

      if (table && table.status === 'free') {
        // Si la mesa está libre, proceder con la solicitud y actualizar el estado de la mesa
        await pool.query('UPDATE tables SET status = "occupied" WHERE tableNumber = ?', [tableId]);

        // Emitir la solicitud a todos los clientes conectados (incluyendo al jefe)
        io.emit('coal_request', data);
        console.log(`Mesa ${tableId} ha pedido ${requestType}`);
      } else {
        console.log(`Mesa ${tableId} ya está ocupada`);
        // Aquí puedes emitir un mensaje de error si lo deseas
        socket.emit('error', `Mesa ${tableId} ya está ocupada`);
      }
    } catch (error) {
      console.error('Error al manejar la solicitud:', error);
    }
  });

  // Evento para marcar una mesa como libre
  socket.on('mark-table-free', async (tableId) => {
    try {
      const pool = await getPool();

      // Verificar si la mesa existe
      const [table] = await pool.query('SELECT * FROM tables WHERE tableNumber = ?', [tableId]);

      if (table && table.status === 'occupied') {
        // Si la mesa está ocupada, cambiar su estado a libre
        await pool.query('UPDATE tables SET status = "free" WHERE tableNumber = ?', [tableId]);

        // Emitir el evento de cambio de estado a todos los clientes conectados
        io.emit('table-status-changed', { tableId, status: 'free' });
        console.log(`Mesa ${tableId} ha sido marcada como libre`);
      } else {
        console.log(`Mesa ${tableId} ya está libre`);
        // Aquí también puedes emitir un mensaje si la mesa ya está libre
        socket.emit('error', `Mesa ${tableId} ya está libre`);
      }
    } catch (error) {
      console.error('Error al marcar la mesa como libre:', error);
    }
  });

  // Desconectar el cliente
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err);  // Registrar el error en la consola
// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err); // Registrar el error en la consola
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';
  res.status(status).json({ error: message });
});

// Arrancar el servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
