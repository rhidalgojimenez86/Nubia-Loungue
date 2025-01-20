import QRCode from 'qrcode';
import getPool from '../../backend/src/database/getPool.js';

export async function generateTableQRCodes() {
  try {
    const pool = getPool();
    const [tables] = await pool.query(`SELECT id, tableNumber FROM tables`);

    for (const table of tables) {
      // Contenido único para cada mesa
      const qrContent = `http://example.com/table/${table.tableNumber}`;
      
      // Generar el código QR en formato Data URL
      const qrCode = await QRCode.toDataURL(qrContent);

      // Opcional: Imprimir o guardar los QR generados
      console.log(`QR para mesa ${table.tableNumber}:`, qrCode);
    }
  } catch (error) {
    console.error("Error al generar los códigos QR:", error);
  }
}
