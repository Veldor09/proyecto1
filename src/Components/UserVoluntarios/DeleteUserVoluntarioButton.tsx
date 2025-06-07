import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserVoluntario } from "../../Services/UserVoluntariosService";

interface Props {
  id: string;
}

export default function DeleteUserVoluntarioButton({ id }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteUserVoluntario(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userVoluntarios"] });
    },
    onError: (error) => {
      console.error("Error al eliminar UserVoluntario:", error);
    },
  });

  const handleDelete = () => {
    if (confirm("¿Estás seguro de eliminar este registro?")) {
      mutation.mutate();
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={mutation.isPending} // Cambiado de mutation.isLoading a mutation.isPending
      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition disabled:opacity-50"
    >
      {mutation.isPending ? "Eliminando..." : "Eliminar"} // Cambiado de mutation.isLoading a mutation.isPending
    </button>
  );
}