import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FlavorSelection from "./pages/FlavorSelection";
import Coals from "./pages/Coals";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sabores" element={<FlavorSelection />} />
            <Route path="/carbones" element={<Coals />} />
          </Routes>
        </div>
        <Footer />
      </div>
  );
}


export default App;
