import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client"; // Importar cliente de Socket.IO
import "./App.css";
import CoalChangeRequest from "./assets/CoalChangeRequest.jsx";

// Configurar conexión con el servidor de Socket.IO
const socket = io("http://localhost:5000"); // Cambia la URL según tu servidor

function App() {
  const [flavors, setFlavors] = useState({
    citrus: [],
    premium: [],
    sweet: [],
  });
  const [newFlavor, setNewFlavor] = useState({
    category: "sweet",
    name: "",
    description: "",
    price: "",
    status: "available",
  });

  const [coalRequests, setCoalRequests] = useState([]); // Solicitudes de cambio de carbones
  const [isConnected, setIsConnected] = useState(false); // Estado de la conexión WebSocket

  // Función para obtener los sabores desde el backend
  const fetchFlavors = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/flavors");
      setFlavors(data);
    } catch (error) {
      console.error("Error al obtener los sabores", error);
    }
  };

  // Función para agregar un sabor
  const addFlavor = async () => {
    try {
      const { category, name, description, price, status } = newFlavor;
      await axios.post(`http://localhost:5000/api/flavors/${category}`, {
        name,
        description,
        price,
        status,
      });
      alert("Sabor agregado con éxito");
      fetchFlavors();
    } catch (error) {
      console.error("Error al agregar el sabor", error);
    }
  };

  // Escuchar solicitudes de cambio de carbones
  useEffect(() => {
    socket.on("coal_request", (data) => {
      setCoalRequests((prevRequests) => [...prevRequests, data]);
    });

    // Conexión y desconexión WebSocket
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Conectado al servidor WebSocket");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Desconectado del servidor WebSocket");
    });

    // Limpiar el evento al desmontar el componente
    return () => {
      socket.off("coal_request");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  // Enviar solicitud de cambio de carbones
  const sendCoalRequest = () => {
    const tableId = prompt("Ingrese el número de la mesa");
    if (tableId) {
      socket.emit("new_coal_request", { tableId });
      alert("Solicitud de cambio de carbones enviada.");
    }
  };

  useEffect(() => {
    fetchFlavors();
  }, []);

  return (
    <div>
      <h1>{isConnected ? "Conexión WebSocket exitosa" : "Conectando..."}</h1>

      {/* Mostrar los sabores de cada categoría */}
      <div>
        <h2>Citrus</h2>
        <ul>
          {flavors.citrus.map((flavor) => (
            <li key={flavor.id}>
              <strong>{flavor.name}</strong> - {flavor.price}$
              <p>{flavor.description}</p> {/* Muestra la descripción */}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Sweet</h2>
        <ul>
          {flavors.sweet.map((flavor) => (
            <li key={flavor.id}>
              <strong>{flavor.name}</strong> - {flavor.price}$
              <p>{flavor.description}</p> {/* Muestra la descripción */}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Premium</h2>
        <ul>
          {flavors.premium.map((flavor) => (
            <li key={flavor.id}>
              <strong>{flavor.name}</strong> - {flavor.price}$
              <p>{flavor.description}</p> {/* Muestra la descripción */}
            </li>
          ))}
        </ul>
      </div>

      {/* Formulario para agregar un nuevo sabor */}
      <h2>Agregar nuevo sabor</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={newFlavor.name}
        onChange={(e) => setNewFlavor({ ...newFlavor, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={newFlavor.description}
        onChange={(e) =>
          setNewFlavor({ ...newFlavor, description: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Precio"
        value={newFlavor.price}
        onChange={(e) => setNewFlavor({ ...newFlavor, price: e.target.value })}
      />
      <button onClick={addFlavor}>Agregar Sabor</button>

      {/* Botón para solicitar cambio de carbones */}
      <h2>Solicitar Cambio de Carbones</h2>
      <button onClick={sendCoalRequest}>Solicitar Cambio</button>

      {/* Mostrar solicitudes de cambio de carbones */}
      <h2>Solicitudes de Cambio de Carbones</h2>
      <ul>
        {coalRequests.map((request) => (
          <li key={request.tableId}>Mesa {request.tableId}</li>
        ))}
      </ul>

      {/* Componente existente */}
      <CoalChangeRequest />
    </div>
  );
}

export default App;
