const MainSection = () => {
    return (
      <main className="p-4">
        <h2 className="text-xl font-semibold text-center mb-4">Elige tu Sisha</h2>
        <div className="flex justify-center space-x-4">
          <button className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg">
            <span className="text-4xl">🚬</span>
            <p className="mt-2 text-sm">Sabores</p>
          </button>
          <button className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg">
            <span className="text-4xl">🔥</span>
            <p className="mt-2 text-sm">Carbones</p>
          </button>
        </div>
      </main>
    );
  };
  
  export default MainSection;
  