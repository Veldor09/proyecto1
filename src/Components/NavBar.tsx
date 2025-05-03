import { Link } from "@tanstack/react-router";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-end bg-gray-800 p-4 shadow-md">
      <div className="flex space-x-6">
        <Link to="/" className="text-white text-lg font-semibold hover:text-gray-300 transition-colors duration-300">
          Home
        </Link>
        <Link to="/donaciones" className="text-white text-lg font-semibold hover:text-gray-300 transition-colors duration-300">
          Donaciones
        </Link>
        <Link to="/proyectos" className="text-white text-lg font-semibold hover:text-gray-300 transition-colors duration-300">
          Proyectos
        </Link>
        <Link to="/voluntarios" className="text-white text-lg font-semibold hover:text-gray-300 transition-colors duration-300">
          Voluntarios
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;