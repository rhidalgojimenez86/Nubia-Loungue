const express = require('express');
const router = express.Router();
const getPool = require('../getPool');

router.get('/admin-auth/:qrCode', async (req, res) => {
  const { qrCode } = req.params;
  try {
    const pool = await getPool();
    const [result] = await pool.query('SELECT * FROM admin_qr WHERE qr_code = ?', [qrCode]);

    if (result.length > 0) {
      return res.json({ status: 'success', role: 'admin' });
    } else {
      return res.json({ status: 'failed', message: 'QR no válido para admin' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
