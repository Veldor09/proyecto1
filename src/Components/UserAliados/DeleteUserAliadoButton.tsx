// Components/UserAliados/DeleteUserAliadoButton.tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserAliado } from "../../Services/UserAliadosServices";

interface Props {
  id: string;
}

export default function DeleteUserAliadoButton({ id }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteUserAliado(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAliados"] });
    },
    onError: (error) => {
      console.error("Error al eliminar UserAliado:", error);
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