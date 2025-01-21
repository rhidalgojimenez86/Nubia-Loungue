import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import getPool from '../src/database/getPool.js';

// Función para obtener el directorio del archivo actual
const getCurrentDir = () => {
  const url = import.meta.url;
  return path.dirname(new URL(url).pathname);
};

// Función para generar el QR del Admin y guardarlo como un archivo PNG
export async function generateAdminQRCode() {
  const qrContent = "http://localhost:5000/admin";  // URL o ruta para acceder al Admin
  const filePath = path.join(getCurrentDir(), "../qrcodes/admin", "admin_qr.png");

  try {
    // Asegúrate de que la carpeta qrcodes/admin exista
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Genera el QR y guárdalo como archivo PNG
    await QRCode.toFile(filePath, qrContent);
    console.log("QR del Admin generado correctamente en", filePath);
  } catch (error) {
    console.error("Error al generar el QR del Admin", error);
  }
}

export async function generateTableQRCodes() {
  try {
    const pool = await getPool();
    const [tables] = await pool.query(`SELECT id, tableNumber FROM tables`);

    // Crear la carpeta "qrcodes" si no existe
    const qrFolderPath = path.resolve('./qrcodes');
    if (!fs.existsSync(qrFolderPath)) {
      fs.mkdirSync(qrFolderPath);
    }

    for (const table of tables) {
      const qrContent = `http://localhost:3000/order?table=${table.tableNumber}`;
      const qrFilePath = path.join(qrFolderPath, `table_${table.tableNumber}.png`);

      // Generar el código QR y guardarlo como imagen
      await QRCode.toFile(qrFilePath, qrContent);
      console.log(`Código QR generado para la mesa ${table.tableNumber}: ${qrFilePath}`);
    }

    console.log('Todos los códigos QR se han generado correctamente.');
  } catch (error) {
    console.error('Error al generar los códigos QR:', error);
  }
}

// Llamar a la función para generar los códigos QR de las mesas
generateTableQRCodes();

// Llamar a la función para generar el QR del Admin
generateAdminQRCode();
