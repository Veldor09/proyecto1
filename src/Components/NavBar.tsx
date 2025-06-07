import { Link } from "@tanstack/react-router";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4 shadow-md">
      {/* Logo + Nombre */}
      <div className="flex items-center space-x-3">
        <img
  src="/imagenes/fundecodesdigital.jpg"
  alt="Logo Fundecodes"
  className="h-12 w-12 object-cover rounded-full"
/>

      </div>

      {/* Enlaces */}
      <div className="flex space-x-6">
        <Link
          to="/"
          className="text-white text-lg font-semibold hover:text-gray-300 transition-colors duration-300"
        >
          Home
        </Link>
        
        <Link
          to="/user-aliados"
          className="text-white text-lg font-semibold hover:text-gray-300 transition-colors duration-300"
        >
          Programa de Aliados
        </Link>

        <Link
          to="/user-voluntarios"
          className="text-white text-lg font-semibold hover:text-gray-300 transition-colors duration-300"
        >
          Programa de Voluntarios
        </Link>

        <Link
          to="/aliados"
          className="text-white text-lg font-semibold hover:text-gray-300 transition-colors duration-300"
        >
          Coordinación de Aliados
        </Link>
        <Link
          to="/voluntarios"
          className="text-white text-lg font-semibold hover:text-gray-300 transition-colors duration-300"
        >
          Coordinación de Voluntarios
        </Link>
        <Link
          to="/proyectos"
          className="text-white text-lg font-semibold hover:text-gray-300 transition-colors duration-300"
        >
          Coordinación de Proyectos
        </Link>
        
      </div>
    </nav>
  );
};

export default NavBar;