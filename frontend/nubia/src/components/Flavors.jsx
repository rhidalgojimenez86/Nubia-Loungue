import { useState, useEffect } from "react";
import axios from "axios";

const Flavors = () => {
  const [flavors, setFlavors] = useState({
    citrus: [],
    premium: [],
    sweet: [],
  });
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [newFlavor, setNewFlavor] = useState({
    category: "sweet",
    name: "",
    description: "",
    price: "",
    status: "available",
  });

  // Obtener sabores desde el backend
  const fetchFlavors = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/flavors");
      setFlavors(data);
    } catch (error) {
      console.error("Error al obtener los sabores", error);
    }
  };

  // Agregar nuevo sabor
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

  // Manejar la selección de sabores
  const handleFlavorSelection = (flavorName) => {
    setSelectedFlavors((prevSelectedFlavors) =>
      prevSelectedFlavors.includes(flavorName)
        ? prevSelectedFlavors.filter((name) => name !== flavorName)
        : [...prevSelectedFlavors, flavorName]
    );
  };

  // Realizar pedido
  const sendOrder = () => {
    // Validación: no permitir más de 3 sabores
    if (selectedFlavors.length > 3) {
      alert("Error: sólo está permitido seleccionar un máximo de 3 sabores");
      return;
    }

    if (selectedFlavors.length > 0) {
      console.log("Pedido realizado con los siguientes sabores:", selectedFlavors);
      alert(`Pedido realizado con los siguientes sabores: ${selectedFlavors.join(", ")}`);
      
      // Limpiar sabores seleccionados después de realizar el pedido
      setSelectedFlavors([]);
    } else {
      alert("Por favor, selecciona al menos un sabor.");
    }
  };

  useEffect(() => {
    fetchFlavors();
  }, []);

  return (
    <div>
      <h1>Sabores</h1>

      <div>
        <h2>Cítricos</h2>
        <ul>
          {flavors.citrus.map((flavor) => (
            <li key={flavor.id}>
              <input
                type="checkbox"
                checked={selectedFlavors.includes(flavor.name)}
                onChange={() => handleFlavorSelection(flavor.name)}
              />
              <strong>{flavor.name}</strong> - {flavor.price}$
              <p>{flavor.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Dulces</h2>
        <ul>
          {flavors.sweet.map((flavor) => (
            <li key={flavor.id}>
              <input
                type="checkbox"
                checked={selectedFlavors.includes(flavor.name)}
                onChange={() => handleFlavorSelection(flavor.name)}
              />
              <strong>{flavor.name}</strong> - {flavor.price}$
              <p>{flavor.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Premium</h2>
        <ul>
          {flavors.premium.map((flavor) => (
            <li key={flavor.id}>
              <input
                type="checkbox"
                checked={selectedFlavors.includes(flavor.name)}
                onChange={() => handleFlavorSelection(flavor.name)}
              />
              <strong>{flavor.name}</strong> - {flavor.price}$
              <p>{flavor.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={sendOrder}>Realizar Pedido</button>

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
    </div>
  );
};

export default Flavors;


