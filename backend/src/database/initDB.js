import bcrypt from 'bcryptjs';  // Asegúrate de importar bcrypt correctamente
import getPool from "./getPool.js"; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas

export async function createTables() {
  console.log("Iniciando la creación de tablas..."); // Esto te dirá si esta función se está ejecutando

  // Accede a las variables de entorno usando process.env
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_FIRST_NAME = process.env.ADMIN_FIRST_NAME;
  const ADMIN_LAST_NAME = process.env.ADMIN_LAST_NAME;

import {
  MYSQL_DATABASE,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_FIRST_NAME,
  ADMIN_LAST_NAME,
} from "../../env.js";

async function createDB() {
  try {
    const pool = await getPool();
    await pool.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`);
    console.log("Base de datos creada o ya existente");
  } catch (error) {
    throw new Error("Error al crear la base de datos", { cause: error });
  }
}

async function createTables() {
  try {
    // Accede a las variables de entorno usando process.env
    const MYSQL_DATABASE = process.env.MYSQL_DATABASE;

    // Verificar que la variable de entorno esté cargada correctamente
    console.log("MYSQL_DATABASE:", MYSQL_DATABASE);

    const pool = await getPool();
    
    // Usar la base de datos definida en la variable de entorno
    await pool.query(`USE ${MYSQL_DATABASE}`);

    // Eliminar tablas existentes si las hay
    await pool.query(`DROP TABLE IF EXISTS sweet_flavors, citrus_flavors, premium_flavors, users, tables`);

    // Crear tabla de mesas
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tables (
        id INT PRIMARY KEY AUTO_INCREMENT,
        tableNumber INT UNIQUE NOT NULL,
        status ENUM('occupied', 'free') DEFAULT 'free', 
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Tabla de mesas creada');

    // Crear tabla de usuarios
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(100) UNIQUE NOT NULL,
        firstName VARCHAR(50),
        lastName VARCHAR(50),
        password VARCHAR(100) NOT NULL,
        role ENUM('admin', 'normal') DEFAULT 'normal',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Tabla de usuarios creada');

    // Crear tabla de sabores dulces
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sweet_flavors (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        status ENUM('available', 'not_available') DEFAULT 'available',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Crear tabla de sabores cítricos
    await pool.query(`
      CREATE TABLE IF NOT EXISTS citrus_flavors (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        status ENUM('available', 'not_available') DEFAULT 'available',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Crear tabla de sabores premium
    await pool.query(`
      CREATE TABLE IF NOT EXISTS premium_flavors (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        status ENUM('available', 'not_available') DEFAULT 'available',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("Tablas creadas correctamente");

    // Insertar un usuario administrador con placeholders
    const hashedPass = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await pool.query(`
      INSERT INTO users (email, firstName, lastName, password, role)
      VALUES (?, ?, ?, ?, ?)
    `, [ADMIN_EMAIL, ADMIN_FIRST_NAME, ADMIN_LAST_NAME, hashedPass, 'admin']);

    console.log("Usuario administrador insertado");
  } catch (error) {
    throw new Error("Error al crear las tablas", { cause: error });
  }
}

async function initDB() {
  try {
    await createDB();
    await createTables();
    console.log("Base de datos inicializada correctamente");
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error.message);
  }
}

initDB();
