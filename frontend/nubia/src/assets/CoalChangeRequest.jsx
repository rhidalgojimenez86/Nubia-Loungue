import { useState } from 'react';

const CoalChangeRequest = () => {
  const [customerId, setCustomerId] = useState('');
  const [coalId, setCoalId] = useState('');

  // Función para solicitar el cambio de carbones
  const requestCoalChange = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/coals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId, coalId }),  // Enviar los datos necesarios
      });

      const data = await response.json();
      if (response.ok) {
        // Notificar al cliente que el cambio ha sido solicitado correctamente
        alert(data.message);
      } else {
        // Si hubo un error, mostrarlo al cliente
        alert(data.message || data.error);
      }
    } catch (error) {
      console.error('Error al solicitar el cambio de carbones:', error);
    }
  };

  return (
    <div className="coal-change-request">
      <h2>Solicitar Cambio de Carbones</h2>
      {/* Formulario para ingresar el ID del cliente y el ID del carbón */}
      <div>
        <input
          type="text"
          placeholder="ID del Cliente"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <input
          type="text"
          placeholder="ID del Carbón"
          value={coalId}
          onChange={(e) => setCoalId(e.target.value)}
        />
        <button onClick={requestCoalChange}>Solicitar Cambio</button>
      </div>
    </div>
  );
};

export default CoalChangeRequest;
