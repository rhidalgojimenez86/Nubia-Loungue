import dotenv from 'dotenv';
dotenv.config();  // Cargar las variables de entorno antes de cualquier otra cosa

import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as socketIo } from 'socket.io';

import { createTables } from './src/database/initDB.js';
import getPool from '../backend/src/database/getPool.js';  // Asegúrate de usar la extensión .js en la importación
import flavorsRoutes from './routes/flavors.js';
import ordersRoutes from './routes/orders.js';
import coalsRoutes from './routes/coals.js';
import tablesRoutes from '../backend/routes/tables.js'; //Nueva ruta para las mesas

// Llamamos a la función para crear las tablas al arrancar el servidor
createTables();

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

app.set('io', io);

// Middleware
app.use(cors());
app.use(express.json());

// Registrar rutas
app.use('/api/flavors', flavorsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/coals', coalsRoutes);
app.use('/api/tables', tablesRoutes); // Registrar rutas de mesas

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

// Configurar Socket.io
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('new-coal-request', async (data) => {
    const { tableId, requestType } = data;

    try {
      const pool = await getPool();
      const [table] = await pool.query('SELECT * FROM tables WHERE tableNumber = ?', [tableId]);

      if (table && table.status === 'free') {
        await pool.query('UPDATE tables SET status = "occupied" WHERE tableNumber = ?', [tableId]);
        io.emit('coal_request', data);
        console.log(`Mesa ${tableId} ha pedido ${requestType}`);
      } else {
        console.log(`Mesa ${tableId} ya está ocupada`);
        socket.emit('coal_error',{message: `Mesa ${tableId} ya está ocupada`});
      }
    } catch (error) {
      console.error('Error al manejar la solicitud:', error);
    }
  });

  socket.on('mark-table-free', async (tableId) => {
    try {
      const pool = await getPool();
      const [rows] = await pool.query('SELECT * FROM tables WHERE tableNumber = ?', [tableId]);
  
      if (rows.length > 0 && rows[0].status === 'occupied') {
        await pool.query('UPDATE tables SET status = "free" WHERE tableNumber = ?', [tableId]);
        io.emit('table-status-changed', { tableId, status: 'free' });
        console.log(`Mesa ${tableId} ha sido marcada como libre`);
      } else {
        console.log(`Mesa ${tableId} ya está libre`);
        socket.emit('error', { message: `Mesa ${tableId} ya está libre` });
      }
    } catch (error) {
      console.error('Error al marcar la mesa como libre:', error);
    }
  });
  

 socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';
  res.status(status).json({ error: message });
});

// Arrancar el servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});