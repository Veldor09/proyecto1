import VoluntarioList from "../Components/Voluntarios/VoluntarioList";
import AddVoluntarioButton from "../Components/Voluntarios/AddVoluntarioButton";
import Login from "../Components/Login";
import { AuthContext } from "../Context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const VoluntariosPage = () => {
  const { user } = AuthContext();

  return (
    <>
      {user ? (
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
