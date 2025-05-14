import AliadoList from "../Components/AliadoList";
import AddAliadoButton from "../Components/AddAliadoButton";
import Login from "../Components/Login";
import { useAuth } from "../Context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const AliadosPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
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