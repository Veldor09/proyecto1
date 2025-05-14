import ProyectoList from "../Components/Proyectos/ProyectoList";
import AddProyectoButton from "../Components/Proyectos/AddProyectoButton";
import Login from "../Components/Login";
import { AuthContext } from "../Context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const ProyectosPage = () => {
  const { user } = AuthContext();

  return (
    <>
      {user ? (
        <QueryClientProvider client={queryClient}>
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Gestión de Proyectos</h2>
            <AddProyectoButton />
            <ProyectoList />
          </div>
        </QueryClientProvider>
      ) : (
        <Login />
      )}
    </>
  );
};

export default ProyectosPage;
