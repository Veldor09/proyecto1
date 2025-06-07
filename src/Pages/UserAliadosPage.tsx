import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import UserAliadoList from "../Components/UserAliados/UserAliadoList";
import AddUserAliadoButton from "../Components/UserAliados/AddUserAliadoButton";
import Login from "../Components/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ✅ Mover fuera del componente
const queryClient = new QueryClient();

const UserAliadosPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <QueryClientProvider client={queryClient}>
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Bienvenido, UserAliado</h2>
            <AddUserAliadoButton />
            <UserAliadoList />
          </div>
        </QueryClientProvider>
      ) : (
        <Login />
      )}
    </>
  );
};

export default UserAliadosPage;
