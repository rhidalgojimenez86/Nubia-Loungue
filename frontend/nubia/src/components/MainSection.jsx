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
          <img
            src="/assets/images/sabores5.jpg"
            alt="Sabores"
            className="w-16 h-16 object-cover"/>
          <p className="mt-2 text-sm">Sabores</p>
        </button>

        {/* Botón Carbones con navegación */}
        <button 
        onClick={() => navigate("/carbones")}
        className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg">
          <img
            src="/assets/images/carbones2.jpg"
            alt="Carbones"
            className="w-16 h-16 object-cover"/>
          <p className="mt-2 text-sm">Carbones</p>
        </button>
      </div>
    </main>
  );
};

export default MainSection;
