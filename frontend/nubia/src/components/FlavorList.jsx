import { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import FlavorCard from "./FlavorCard"; 

const FlavorList = () => {
  const [flavors, setFlavors] = useState({
    citrus: [],
    sweet: [],
    premium: [],
  });
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Obtener sabores desde el backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/flavors")
      .then((response) => {
        const data = response.data;
        console.log("Datos recibidos desde la API:", data);

        // Asegúrate de que data tenga las categorías
        if (data && data.citrus && data.sweet && data.premium) {
          setFlavors({
            citrus: data.citrus,
            sweet: data.sweet,
            premium: data.premium,
          });
        } else {
          console.error("La respuesta de la API no contiene las categorías esperadas:", data);
        }
      })
      .catch((error) => {
        console.error("Error cargando sabores:", error);
      });
  }, []);

  // Manejar la selección de sabores
  const handleFlavorSelection = (flavorName) => {
    if (selectedFlavors.includes(flavorName)) {
      setSelectedFlavors((prev) => prev.filter((name) => name !== flavorName));
    } else if (selectedFlavors.length < 3) {
      setSelectedFlavors((prev) => [...prev, flavorName]);
    } else {
      alert("Puedes seleccionar un máximo de 3 sabores.");
    }
  };

  // Realizar pedido
  const sendOrder = () => {
    if (selectedFlavors.length > 0) {
      setShowModal(true);
    } else {
      alert("Por favor, selecciona al menos un sabor.");
    }
  };

  // Confirmar el pedido
  const handleConfirmOrder = () => {
    alert(`Genial, en seguida tendrás tu shisha en la mesa`);
    setShowModal(false);
    setSelectedFlavors([]); // Limpiar la selección después de la confirmación
  };

  // Cancelar el pedido
  const handleCancelOrder = () => {
    setShowModal(false); // Solo cierra el modal, sin limpiar selección
  };

  return (
    <div className="page-container">
      <h2 className="text-xl font-bold text-center mb-6">Sabores (Máximo 3 a elegir)</h2>

      {["citrus", "sweet", "premium"].map((categoria) => (
        <div key={categoria} className="mt-6">
          <h3 className="text-lg font-semibold">{categoria.toUpperCase()}</h3>
          <div className="space-y-4">
            {flavors[categoria].length > 0 ? (
              flavors[categoria].map((flavor) => (
                <FlavorCard 
                  key={flavor.id} 
                  flavor={flavor} 
                  isSelected={selectedFlavors.includes(flavor.name)}
                  onSelect={() => handleFlavorSelection(flavor.name)} 
                />
              ))
            ) : (
              <p>No hay sabores disponibles en esta categoría.</p>
            )}
          </div>
        </div>
      ))}

      {/* Botón directamente en FlavorList */}
      <button
        onClick={sendOrder}
        className="mt-4 w-full bg-black text-white py-3 rounded-lg font-semibold active:bg-gray-700 transition-all duration-300"
      >
        Realizar pedido
      </button>

      {/* Modal de confirmación */}
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

export default FlavorList;
