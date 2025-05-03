import { Outlet } from "@tanstack/react-router";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;