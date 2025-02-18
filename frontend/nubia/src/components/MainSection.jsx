import { useNavigate } from "react-router-dom";

const MainSection = () => {
  const navigate = useNavigate();

  return (
    <main className="p-4 flex-col items-center">
      <h2 className="text-xl font-semibold text-center mb-4">Elige tu Sisha</h2>
      <div className="flex justify-center space-x-4">
        {/* Botón Sabores con navegación */}
        <button 
          onClick={() => navigate("/sabores")} 
          className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg cursor-pointer"
        >
          <span className="text-4xl">🚬</span>
          <p className="mt-2 text-sm">Sabores</p>
        </button>

        {/* Botón Carbones con navegación */}
        <button 
        onClick={() => navigate("/carbones")}
        className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg">
          <span className="text-4xl">🔥</span>
          <p className="mt-2 text-sm">Carbones</p>
        </button>
      </div>
    </main>
  );
};

export default MainSection;
