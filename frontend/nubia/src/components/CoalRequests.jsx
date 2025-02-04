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
      <div className="page-container">
        <h2 className="text-center text-xl font-bold">Solicitar Cambio de Carbones</h2>
        <button 
          onClick={sendCoalRequest}
          className="mt-4 px-4 py-2 bg-black text-white rounded"
        >
          Solicitar Cambio
        </button>
  
        {isConnected ? <p>Conectado al servidor WebSocket</p> : <p>Desconectado del servidor WebSocket</p>}
  
        <ul className="w-full px-4">
          {coalRequests.slice(0, 2).map((request) => (
            <li key={request.tableId} className="w-full flex justify-between bg-gray-200 p-2 my-2 rounded">
              <span>Mesa {request.tableId} solicitó cambio de carbones</span>
              <button 
                onClick={() => confirmCoalRequest(request.tableId)}
                className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
              >
                Confirmar
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

export default CoalRequests;
