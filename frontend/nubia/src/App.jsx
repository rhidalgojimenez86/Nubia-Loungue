import FlavorList from "./components/FlavorList";
import CoalRequests from "./components/CoalRequests";
import Header from "./components/Header";
import MainSection from "./components/MainSection";
import Footer from "./components/Footer";
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
      <Header />
      <MainSection />
      <FlavorList />
      <CoalRequests />
      <Footer />

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