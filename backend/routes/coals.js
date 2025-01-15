const express = require('express');
const router = express.Router();

// Solicitar cambio de carbones
router.post('/', (req, res) => {
  res.json({ message: 'Cambio de carbones solicitado.' });
});

module.exports = router;
