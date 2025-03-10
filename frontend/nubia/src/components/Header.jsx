import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="relative w-full">
      <div 
        className="w-full h-48 bg-cover bg-center brightness-150 relative" 
        style={{ backgroundImage: "url('/assets/images/shishas.jpg')" }}
      >
        {/* Logo interactivo con navegación */}
        <Link to="/" className="absolute top-2 left-2 z-50">
          <img
            src="/assets/images/logo8.png"
            alt="Salón Nubia Logo"
            className="h-14 md:h-20 brightness-200 contrast-150 mix-blend-screen
            transition-transform duration-300 ease-in-out transform active:scale-110 active:rotate-3 cursor-pointer"
          />
        </Link>

        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-white text-3xl font-bold text-center">Salón Nubia</h1>
          <p className="text-white text-sm mt-2 text-center">
            Yo voy a donde sea si <span className="line-through">es contigo</span> hay shisha
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;

