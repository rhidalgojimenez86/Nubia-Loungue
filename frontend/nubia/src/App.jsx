import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import CoalChangeRequest from "./assets/CoalChangeRequest.jsx";

function App() {
  const [flavors, setFlavors] = useState({
    citrus: [],
    premium: [],
    sweet: [],
  });
  const [newFlavor, setNewFlavor] = useState({
    category: "sweet", // Categoría por defecto
    name: "",
    description: "",
    price: "",
    status: "available",
  });

  // Función para obtener los sabores desde el backend
  const fetchFlavors = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/flavors"); // Usamos destructuración directamente
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
      fetchFlavors(); // Refresca los sabores
    } catch (error) {
      console.error("Error al agregar el sabor", error);
    }
  };

  // Cargar los sabores cuando el componente se monte
  useEffect(() => {
    fetchFlavors();
  }, []);

  return (
    <div>
      <h1>Flavors</h1>

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

      {/* Componente para solicitar cambio de carbones */}
      <CoalChangeRequest />
    </div>
  );
}

export default App;
