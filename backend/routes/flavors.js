const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Obtener todos los sabores
router.get('/', (req, res) => {
  const query = 'SELECT * FROM flavors';
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los sabores' });
    }
    res.json(results);
  });
});

module.exports = router;