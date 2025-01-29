const Header = () => {
    return (
      <header className="relative">
        <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/shishas.jpg')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
            <h1 className="text-white text-3xl font-bold">Salón Nubia</h1>
            <p className="text-white text-sm mt-2">Yo voy a donde sea si es contigo hay shisha</p>
          </div>
        </div>
      
      </header>
    );
  };
  
  export default Header;
  