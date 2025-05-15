import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  id: string;
}


const BIN_ID = "68250c3e8561e97a50140550";
const VOLUNTARIOS_API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const API_KEY = "$2a$10$1WE9CA71m8Ipze4nUPEUSORtrEj2XD95J9mSOlGqY53PTrY4mdanW";
const HEADERS = {
  "X-Access-Key": API_KEY,
  "Content-Type": "application/json",
};

const DeleteVoluntarioButton = ({ id }: Props) => {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      // 1. Obtener los datos actuales
      const res = await axios.get(VOLUNTARIOS_API_URL, { headers: HEADERS });
      const current = res.data.record.voluntarios || [];

      // 2. Marcar como oculto el voluntario seleccionado
      const updated = current.map((v: any) =>
        v.id === id ? { ...v, hidden: true } : v
      );

      // 3. Guardar datos actualizados sin envolverlos en "record"
      await axios.put(VOLUNTARIOS_API_URL, { voluntarios: updated }, { headers: HEADERS });

      // 4. Refrescar la cache
      queryClient.invalidateQueries({ queryKey: ["voluntarios"] });
    } catch (err) {
      console.error("Error al ocultar voluntario", err);
    }
  };

  return (
    <button
      className="text-red-600 hover:underline"
      onClick={handleDelete}
    >
      Eliminar
    </button>
  );
};

export default DeleteVoluntarioButton;
