import express from 'express';

const router = express.Router();

// Enviar un pedido
router.post('/', (req, res) => {
  const { flavors } = req.body;

  // Verificar si no hay sabores seleccionados
  if (!flavors || flavors.length === 0) {
    return res.status(400).json({ error: 'Error: selecciona al menos un sabor' });
  }

  // Verificar si el número de sabores excede el límite
  if (flavors.length > 3) {
    return res.status(400).json({ error: 'Error: sólo está permitido seleccionar un máximo de 3 sabores' });
  }

  // Guardar el pedido en la base de datos (esto podría ser un paso adicional, como interactuar con la base de datos)
  res.json({ message: 'Pedido recibido', flavors });
});

export default router;  // Exportación por defecto

