import express from "express";
const router = express.Router();

// Solicitar cambio de carbones
router.post("/", (req, res) => {
  const { tableId } = req.body;

  if (!tableId) {
    return res.status(400).json({ error: "El número de mesa es obligatorio" });
  }

  const message = `Marchando un cambio de carbones para la mesa ${tableId}. ¡En nada prendemos de nuevo la Hookah!`;

  // Emitir el evento de WebSocket al cliente
  req.app.get("io").emit("coal_request", { tableId, message });

  res.json({ message });
});

export default router;
