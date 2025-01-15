const express = require('express');
const router = express.Router();

// Solicitar cambio de carbones
router.post('/', (req, res) => {
  const { customerId, coalId } = req.body;  // Suponemos que recibimos estos datos

  // Enviar la notificación de solicitud de cambio de carbones
  res.json({
    message: `Marchando un cambio de carbones ${customerId}. ¡En nada prendemos de nuevo la Hoocka!`,
  });
});

module.exports = router;
