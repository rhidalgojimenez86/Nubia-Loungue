import express from 'express';
import { generateTableQRCodes } from '../controllers/tablesController.js';

const router = express.Router();

// Endpoint para generar los códigos QR
router.get('/generate-qr', async (req, res) => {
  try {
    await generateTableQRCodes();
    res.status(200).send('Códigos QR generados correctamente');
  } catch (error) {
    res.status(500).send('Error al generar los códigos QR');
  }
});

export default router;
