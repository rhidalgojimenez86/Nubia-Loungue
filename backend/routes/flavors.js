const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Obtener todos los sabores de las tres categorías
router.get('/', (req, res) => {
  const queryCitrus = 'SELECT * FROM citrus_flavors';
  const queryPremium = 'SELECT * FROM premium_flavors';
  const querySweet = 'SELECT * FROM sweet_flavors';

  connection.query(queryCitrus, (err, citrusResults) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los sabores cítricos' });
    }

    connection.query(queryPremium, (err, premiumResults) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener los sabores premium' });
      }

      connection.query(querySweet, (err, sweetResults) => {
        if (err) {
          return res.status(500).json({ error: 'Error al obtener los sabores dulces' });
        }

        // Combinar los resultados de las tres categorías
        const allFlavors = {
          citrus: citrusResults,
          premium: premiumResults,
          sweet: sweetResults
        };

        res.json(allFlavors);
      });
    });
  });
});

// Agregar un nuevo sabor en una categoría
router.post('/:category', (req, res) => {
  const { category } = req.params;
  const { name, description, price, status } = req.body;

  // Determinar la tabla en función de la categoría
  let table;
  if (category === 'citrus') {
    table = 'citrus_flavors';
  } else if (category === 'premium') {
    table = 'premium_flavors';
  } else if (category === 'sweet') {
    table = 'sweet_flavors';
  } else {
    return res.status(400).json({ error: 'Categoría no válida' });
  }

  const query = `INSERT INTO ${table} (name, description, price, status) VALUES (?, ?, ?, ?)`;

  connection.query(query, [name, description, price, status], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al agregar el sabor' });
    }
    res.status(201).json({ message: 'Sabor agregado con éxito', id: results.insertId });
  });
});

// Actualizar un sabor en una categoría
router.put('/:category/:id', (req, res) => {
  const { category, id } = req.params;
  const { name, description, price, status } = req.body;

  // Determinar la tabla en función de la categoría
  let table;
  if (category === 'citrus') {
    table = 'citrus_flavors';
  } else if (category === 'premium') {
    table = 'premium_flavors';
  } else if (category === 'sweet') {
    table = 'sweet_flavors';
  } else {
    return res.status(400).json({ error: 'Categoría no válida' });
  }

  const query = `UPDATE ${table} SET name = ?, description = ?, price = ?, status = ? WHERE id = ?`;

  connection.query(query, [name, description, price, status, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el sabor' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Sabor no encontrado' });
    }
    res.json({ message: 'Sabor actualizado con éxito' });
  });
});

module.exports = router;
