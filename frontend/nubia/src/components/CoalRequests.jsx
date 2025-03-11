import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const CoalRequests = () => {
  const [coalRequests, setCoalRequests] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [notification, setNotification] = useState(""); // 🔹 Estado para mostrar mensajes
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableId, setTableId] = useState(""); // 🔹 Estado para el input del modal

  useEffect(() => {
    socket.on("coal_request", (data) => {
      showNotification(data.message);
      setCoalRequests((prevRequests) => [...prevRequests, data]);
    });

    socket.on("coal_error", (data) => {
      showNotification(data.message); // ✅ Muestra error si la mesa ya está ocupada
    });

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Conectado al servidor WebSocket");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Desconectado del servidor WebSocket");
    });

    return () => {
      socket.off("coal_request");
      socket.off("coal_error");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  // 🔹 Función para mostrar una notificación por 3 segundos
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  // 🔹 Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 🔹 Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTableId(""); // Limpiar input al cerrar
  };

  // 🔹 Función para enviar la solicitud
  const sendCoalRequest = async () => {
    if (!tableId) {
      showNotification("Por favor, ingrese un número de mesa válido.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/coals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tableId }),
      });

      const data = await response.json();
      showNotification(data.message); // ✅ Mostrar mensaje del backend
      closeModal(); // 🔹 Cerrar el modal después de enviar
    } catch (error) {
      console.error("Error al solicitar cambio de carbones:", error);
      showNotification("Error de conexión con el servidor");
    }
  };

  const confirmCoalRequest = (tableId) => {
    socket.emit("mark-table-free", tableId);
    showNotification(`Mesa ${tableId} marcada como libre.`);
  };

  return (
    <div className="flex flex-col items-center p-4 mt-8">
      <h2 className="text-center text-xl font-bold mb-8">Solicitar Cambio de Carbones</h2>
      <button 
        onClick={openModal}
        className="px-6 py-3 bg-black text-white rounded-md text-lg"
      >
        Solicitar Cambio
      </button>

      {/* 🔹 Notificación flotante */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-md transition-opacity duration-300">
          {notification}
        </div>
      )}

      {/* 🔹 Modal para ingresar el número de mesa */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-80 text-center">
            <h3 className="text-lg font-bold mb-4">Ingrese el número de mesa</h3>
            <input 
              type="text" 
              className="w-full p-2 border rounded mb-4 text-center"
              value={tableId}
              onChange={(e) => setTableId(e.target.value)}
              placeholder="Ej: 12"
            />
            <div className="flex justify-center gap-4">
              <button 
                onClick={sendCoalRequest} 
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Enviar
              </button>
              <button 
                onClick={closeModal} 
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

     
    </div>
  );
};

export default CoalRequests;
