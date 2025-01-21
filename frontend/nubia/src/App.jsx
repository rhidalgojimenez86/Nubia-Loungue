import Flavors from "./components/Flavors";
import CoalRequests from "./components/CoalRequests";
import { useState, useEffect } from "react";
import axios from "axios";

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
  const [qrCodes, setQrCodes] = useState([]); // Estado para almacenar los QR de las mesas
  const [isAdmin, setIsAdmin] = useState(false); // Estado para identificar si el usuario es admin

  // Simulación de rol (Admin o cliente)
  useEffect(() => {
    // Aquí deberías reemplazar esto con lógica real para verificar si el usuario es admin
    const userRole = localStorage.getItem("userRole") || "client"; // Ejemplo: "admin" o "client"
    setIsAdmin(userRole === "admin");
  }, []);

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
  const [qrCodes, setQrCodes] = useState([]);
  const fetchQRCodes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/tables/qr");
      setQrCodes(data);
    } catch (error) {
      console.error("Error al obtener los códigos QR", error);
    }
  };

  useEffect(() => {
    fetchQRCodes();
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
              {flavor.name} - {flavor.price}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Sweet</h2>
        <ul>
          {flavors.sweet.map((flavor) => (
            <li key={flavor.id}>
              {flavor.name} - {flavor.price}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Premium</h2>
        <ul>
          {flavors.premium.map((flavor) => (
            <li key={flavor.id}>
              {flavor.name} - {flavor.price}
            </li>
          ))}
        </ul>
      </div>

      {/* Formulario para agregar un nuevo sabor (visible solo para admin) */}
      {isAdmin && (
        <>
          <h2>Agregar nuevo sabor</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={newFlavor.name}
            onChange={(e) =>
              setNewFlavor({ ...newFlavor, name: e.target.value })
            }
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
            onChange={(e) =>
              setNewFlavor({ ...newFlavor, price: e.target.value })
            }
          />
          <button onClick={addFlavor}>Agregar Sabor</button>
        </>
      )}

      {/* Botón para solicitar cambio de carbones */}
      <h2>Solicitar Cambio de Carbones</h2>
      <button onClick={sendCoalRequest}>Solicitar Cambio</button>

      {/* Mostrar solicitudes de cambio de carbones */}
      <h2>Solicitudes de Cambio de Carbones</h2>
      <ul>
        {coalRequests.map((request) => (
          <li key={request.tableId}>
            Mesa {request.tableId} solicitó cambio de carbones
            {/* Botón para que el camarero confirme la solicitud */}
            <button onClick={() => confirmCoalRequest(request.tableId)}>
              Confirmar
            </button>
          </li>
        ))}
      </ul>

      {/* Mostrar códigos QR generados */}
      <Flavors />
      <CoalRequests />
      
      <h2>Códigos QR de las Mesas</h2>
      <ul>
  {qrCodes.map((qr) => (
    <li key={qr.tableNumber}>
      Mesa {qr.tableNumber}
      <br />
      <img src={qr.qrCode} alt={`QR Mesa ${qr.tableNumber}`} />
    </li>
  ))}
</ul>
    </div>
  );
}

export default App;
