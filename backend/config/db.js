import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config(); // Carga las variables del archivo .env

let pool;

export const getPool = async () => {
  if (!pool) {
    try {
      pool = await mysql.createPool({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        timezone: 'Z',
      });
      console.log('Pool de conexiones creado y conectado a MySQL');
    } catch (err) {
      console.error('Error al conectar con MySQL:', err.message);
    }
  }
  return pool;
};
