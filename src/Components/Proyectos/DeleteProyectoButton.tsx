import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import { deleteProyecto } from "../../Services/ProyectosServices";

interface Props {
  id: string;
}

const DeleteProyectoButton = ({ id }: Props) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  if (user?.role !== "Administrador") return null;

  const handleDelete = async () => {
    try {
      await deleteProyecto(id);
      queryClient.invalidateQueries({ queryKey: ["proyectos"] });
    } catch (err) {
      console.error("Error al ocultar proyecto", err);
    }
  };

  return (
    <button className="text-red-600 hover:underline" onClick={handleDelete}>
      Eliminar
    </button>
  );
};

export default DeleteProyectoButton;
