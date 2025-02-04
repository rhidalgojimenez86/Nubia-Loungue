import MainSection from "../components/MainSection";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [qrCodes, setQrCodes] = useState([]);

  useEffect(() => {
    const fetchQRCodes = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/tables/qr");
        setQrCodes(data);
      } catch (error) {
        console.error("Error al obtener los códigos QR", error);
      }
    };

    fetchQRCodes();
  }, []);

  return (
    <div >
      <MainSection />
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

export default Home;
