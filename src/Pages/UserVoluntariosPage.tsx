// pages/UserVoluntariosPage.tsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import AddUserVoluntarioButton from "../Components/UserVoluntarios/AddUserVoluntarioButton";
import UserVoluntarioList from "../Components/UserVoluntarios/UserVoluntarioList";
import Login from "../Components/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getUserVoluntarios } from "../Services/UserVoluntariosService";
import { UserVoluntario } from "../Types/UserVoluntarioTypes"; // Importar el tipo UserVoluntario

const queryClient = new QueryClient();

const UserVoluntariosPage = () => {
  const { user } = useContext(AuthContext);
  const [userVoluntarios, setUserVoluntarios] = useState<UserVoluntario[]>([]);

  useEffect(() => {
    const fetchUserVoluntarios = async () => {
      const data = await getUserVoluntarios();
      setUserVoluntarios(data);
    };

    fetchUserVoluntarios();
  }, []);

  const handleEdit = (userVoluntario: UserVoluntario) => {
    console.log("Editar", userVoluntario);
  };

  return (
    <>
      {user ? (
        <QueryClientProvider client={queryClient}>
          <h2>Bienvenido, UserVoluntario</h2>
          <AddUserVoluntarioButton />
          <UserVoluntarioList items={userVoluntarios} onEdit={handleEdit} />
        </QueryClientProvider>
      ) : (
        <Login />
      )}
    </>
  );
};

export default UserVoluntariosPage;