import Flavors from "./components/Flavors";
import CoalRequests from "./components/CoalRequests";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
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
      <Flavors />
      <CoalRequests />
      
      <h2>Códigos QR de las Mesas</h2>
      <ul>
        {qrCodes.map((qr, index) => (
          <li key={index}>
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
