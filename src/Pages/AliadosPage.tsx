import AliadoList from "../Components/Aliados/AliadoList";
import AddAliadoButton from "../Components/Aliados/AddAliadoButton";
import Login from "../Components/Login";
import { AuthContext } from "../Context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const AliadosPage = () => {
  const { user } = AuthContext();

  return (
    <>
      {user ? (
        <QueryClientProvider client={queryClient}>
          <h2>Bienvenido, Aliado</h2>
          <AddAliadoButton />
          <AliadoList />
        </QueryClientProvider>
      ) : (
        <Login />
      )}
    </>
  );
};

export default AliadosPage;
