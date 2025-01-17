import dotenv from 'dotenv';  // Importa dotenv
import mysql from 'mysql2';    // Importa mysql2

dotenv.config();  // Carga las variables del archivo .env

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar con MySQL:', err.message);
  } else {
    console.log('Conexión exitosa a MySQL');
  }
});

export default connection;  // Exportación por defecto
