import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const CoalRequests = () => {
  const [coalRequests, setCoalRequests] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on("coal_request", (data) => {
      setCoalRequests((prevRequests) => [...prevRequests, data]);
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
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  // Monitorear los cambios de conexión y registrar en la consola
  useEffect(() => {
    if (isConnected) {
      console.log("El cliente está conectado al servidor WebSocket.");
    } else {
      console.log("El cliente está desconectado del servidor WebSocket.");
    }
  }, [isConnected]);

  const sendCoalRequest = () => {
    const tableId = prompt("Ingrese el número de la mesa");
    const requestType = prompt("Ingrese el tipo de solicitud (Carbón/Sisha)");
    if (tableId && requestType) {
      socket.emit("new-coal-request", { tableId, requestType });
      alert("Solicitud de cambio de carbones enviada.");
    }
  };

  const confirmCoalRequest = (tableId) => {
    socket.emit("mark-table-free", tableId);
    alert(`Mesa ${tableId} marcada como libre.`);
  };

  return (
    <div>
      <h2>Solicitar Cambio de Carbones</h2>
      <button onClick={sendCoalRequest}>Solicitar Cambio</button>

      <h2>Solicitudes de Cambio de Carbones</h2>
      <ul>
        {coalRequests.slice(0, 2).map((request) => (
          <li key={request.tableId}>
            Mesa {request.tableId} solicitó cambio de carbones
            <button onClick={() => confirmCoalRequest(request.tableId)}>
              Confirmar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoalRequests;
