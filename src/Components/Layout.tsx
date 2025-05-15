import { Outlet, useRouterState } from "@tanstack/react-router";
import NavBar from "./NavBar";

const Layout = () => {
  const { location } = useRouterState();

  // Si estás en la ruta / (homepage), no encierres en container
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      {isHome ? (
        <Outlet /> // Home se renderiza a pantalla completa
      ) : (
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Layout;