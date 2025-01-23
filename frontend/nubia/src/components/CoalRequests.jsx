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

  const sendCoalRequest = () => {
    const tableId = prompt("Ingrese el número de la mesa");
    if (tableId) {
      socket.emit("new-coal-request", { tableId, requestType: "Carbón" });
      alert(`Solicitud de cambio de carbones enviada para la mesa ${tableId}.`);
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
      
      {isConnected ? <p>Conectado al servidor WebSocket</p> : <p>Desconectado del servidor WebSocket</p>}

 
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

