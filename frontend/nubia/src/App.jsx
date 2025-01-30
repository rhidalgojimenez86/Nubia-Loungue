import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FlavorSelection from "./pages/FlavorSelection";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sabores" element={<FlavorSelection />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
