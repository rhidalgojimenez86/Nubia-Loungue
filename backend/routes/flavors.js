import express from 'express';

import { getPool } from '../config/db.js';

const router = express.Router();

const getTableByCategory = (category) => {
  switch (category) {
    case 'citrus': return 'citrus_flavors';
    case 'premium': return 'premium_flavors';
    case 'sweet': return 'sweet_flavors';
    default: return null;
  }
};

// Obtener todos los sabores
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const [citrusResults, premiumResults, sweetResults] = await Promise.all([
      pool.query('SELECT * FROM citrus_flavors'),
      pool.query('SELECT * FROM premium_flavors'),
      pool.query('SELECT * FROM sweet_flavors'),
    ]);

    res.json({
      citrus: citrusResults[0],
      premium: premiumResults[0],
      sweet: sweetResults[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los sabores', details: err.message });
  }
});

// Agregar un sabor
router.post('/:category', async (req, res) => {
  const { category } = req.params;
  const { name, description, price, status } = req.body;

  const table = getTableByCategory(category);
  if (!table) {
    return res.status(400).json({ error: 'Categoría no válida' });
  }

  try {
    const pool = await getPool();
    const [result] = await pool.query(
      `INSERT INTO ${table} (name, description, price, status) VALUES (?, ?, ?, ?)`,
      [name, description, price, status],
    );
    res.status(201).json({ message: 'Sabor agregado con éxito', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al agregar el sabor', details: err.message });
  }
});

// Actualizar un sabor
router.put('/:category/:id', async (req, res) => {
  const { category, id } = req.params;
  const { name, description, price, status } = req.body;

  const table = getTableByCategory(category);
  if (!table) {
    return res.status(400).json({ error: 'Categoría no válida' });
  }

  try {
    const pool = await getPool();
    const [result] = await pool.query(
      `UPDATE ${table} SET name = ?, description = ?, price = ?, status = ? WHERE id = ?`,
      [name, description, price, status, id],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Sabor no encontrado' });
    }
    res.json({ message: 'Sabor actualizado con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar el sabor', details: err.message });
  }
});

// Eliminar un sabor
router.delete('/:category/:id', async (req, res) => {
  const { category, id } = req.params;

  const table = getTableByCategory(category);
  if (!table) {
    return res.status(400).json({ error: 'Categoría no válida' });
  }

  try {
    const pool = await getPool();
    const [result] = await pool.query(`DELETE FROM ${table} WHERE id = ?`, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Sabor no encontrado' });
    }

    res.json({ message: 'Sabor eliminado con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar el sabor', details: err.message });
  }
});

export default router;  // Exportación por defecto

