import { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

const Flavors = () => {
  const [flavors, setFlavors] = useState({
    citrus: [],
    premium: [],
    sweet: [],
  });
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Obtener sabores desde el backend
  const fetchFlavors = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/flavors");
      setFlavors(data);
    } catch (error) {
      console.error("Error al obtener los sabores", error);
    }
  };

  // Obtener sabores al cargar el componente
  useEffect(() => {
    fetchFlavors();
  }, []);

  // Manejar la selección de sabores
  const handleFlavorSelection = (flavorName) => {
    // Limitar la selección a un máximo de 3 sabores
    if (selectedFlavors.includes(flavorName)) {
      // Si ya está seleccionado, lo desmarcamos
      setSelectedFlavors((prevSelectedFlavors) =>
        prevSelectedFlavors.filter((name) => name !== flavorName)
      );
    } else {
      // Si no está seleccionado, verificamos que no exceda 3 sabores
      if (selectedFlavors.length < 3) {
        setSelectedFlavors((prevSelectedFlavors) => [
          ...prevSelectedFlavors,
          flavorName,
        ]);
      } else {
        alert("Puedes seleccionar un máximo de 3 sabores.");
      }
    }
  };

  // Realizar pedido
  const sendOrder = () => {
    if (selectedFlavors.length > 0) {
      setShowModal(true); // Mostrar el modal de confirmación
    } else {
      alert("Por favor, selecciona al menos un sabor.");
    }
  };

  // Confirmar el pedido
  const handleConfirmOrder = () => {
    alert(`Genial, en seguida tendrás tu shisha en la mesa`);
    setShowModal(false); // Cerrar el modal
    setSelectedFlavors([]); // Limpiar los sabores seleccionados
  };

  // Cancelar el pedido
  const handleCancelOrder = () => {
    setShowModal(false); // Cerrar el modal sin hacer cambios
  };

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

      {/* Modal de confirmación de pedido */}
      <Dialog open={showModal} onClose={handleCancelOrder}>
        <DialogTitle>Pedido Realizado</DialogTitle>
        <DialogContent>
          <p>Pedido realizado con los siguientes sabores: {selectedFlavors.join(", ")}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelOrder} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmOrder} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Flavors;
