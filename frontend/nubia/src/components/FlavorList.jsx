const FlavorList = () => {
    const flavors = [
      { name: "La noche de Berlín", description: "Melocotón y menta", price: "15€" },
      { name: "Dragón azul", description: "Fruta del dragón, arándanos y bombón helado", price: "18€" },
      { name: "I azules", description: "Arándanos y hielo", price: "16€" },
      { name: "Rosa del desierto", description: "Rosa, miel y menta", price: "17€" },
    ];
  
    return (
      <section className="p-4">
        <h3 className="text-lg font-semibold text-center mb-4">Sabores (Máximo 3 a elegir)</h3>
        <ul className="space-y-4">
          {flavors.map((flavor, index) => (
            <li key={index} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{flavor.name}</h4>
                <p className="text-sm text-gray-500">{flavor.description}</p>
              </div>
              <span className="font-bold">{flavor.price}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  };
  
  export default FlavorList;
  