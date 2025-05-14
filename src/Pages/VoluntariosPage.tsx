import VoluntarioList from "../Components/VoluntarioList";
import AddVoluntarioButton from "../Components/AddVoluntarioButton";
import Login from "../Components/Login";
import { useAuth } from "../Context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const VoluntariosPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <QueryClientProvider client={queryClient}>
          <h2>Bienvenido, Voluntario</h2>
          <AddVoluntarioButton />
          <VoluntarioList />
        </QueryClientProvider>
      ) : (
        <Login />
      )}
    </>
  );
};

export default VoluntariosPage;