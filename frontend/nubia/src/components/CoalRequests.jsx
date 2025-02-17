import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const CoalRequests = () => {
  const [coalRequests, setCoalRequests] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on("coal_request", (data) => {
      alert(data.message);
      setCoalRequests((prevRequests) => [...prevRequests, data]);
    });

    socket.on("coal_error", (data) => {
      alert(data.message); // ✅ Muestra error si la mesa ya está ocupada
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

  const sendCoalRequest = async () => {
    const tableId = prompt("Ingrese el número de la mesa");
    if (!tableId) return;
  
    try {
      const response = await fetch("http://localhost:5000/api/coals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tableId }),
      });
  
      const data = await response.json();
      alert(data.message); // ✅ Mostrar mensaje del backend
    } catch (error) {
      console.error("Error al solicitar cambio de carbones:", error);
      alert("Error de conexión con el servidor");
    }
  };
  
 const confirmCoalRequest = (tableId) => {
    socket.emit("mark-table-free", tableId);
    alert(`Mesa ${tableId} marcada como libre.`);
  };

  return (
    <div className="page-container">
      <h2 className="text-center text-xl font-bold">Solicitar Cambio de Carbones</h2>
      <button 
        onClick={sendCoalRequest}
        className="mt-4 px-4 py-2 bg-black text-white rounded"
      >
        Solicitar Cambio
      </button>

      {isConnected ? <p>Conectado al servidor WebSocket</p> : <p>Desconectado del servidor WebSocket</p>}

    
    </div>
  );
};

export default CoalRequests;
