import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import AliadoList from "../Components/Aliados/AliadoList";
import AddAliadoButton from "../Components/Aliados/AddAliadoButton";
import Login from "../Components/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ✅ Mover fuera del componente
const queryClient = new QueryClient();

const AliadosPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <QueryClientProvider client={queryClient}>
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Bienvenido, Aliado</h2>
            <AddAliadoButton />
            <AliadoList />
          </div>
        </QueryClientProvider>
      ) : (
        <Login />
      )}
    </>
  );
};

export default AliadosPage;
