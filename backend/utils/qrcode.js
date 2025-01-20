import QRCode from 'qrcode';

export async function generateTableQRCodes() {
  try {
    const pool = await getPool();
    const [tables] = await pool.query(`SELECT id, tableNumber FROM tables`);

    for (const table of tables) {
      const qrContent = `http://example.com/table/${table.tableNumber}`;
      const qrCode = await QRCode.toDataURL(qrContent);
      console.log(`QR para mesa ${table.tableNumber}:`, qrCode);
    }
  } catch (error) {
    console.error("Error al generar los códigos QR", error);
  }
}
