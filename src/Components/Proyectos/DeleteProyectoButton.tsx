import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext"; // 👈 Asegúrate que esta ruta sea correcta

interface Props {
  id: string;
}

const BIN_ID = "68250c788561e97a50140573";
const PROYECTOS_API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const API_KEY = "$2a$10$1WE9CA71m8Ipze4nUPEUSORtrEj2XD95J9mSOlGqY53PTrY4mdanW";
const HEADERS = {
  "X-Access-Key": API_KEY,
  "Content-Type": "application/json",
};

const DeleteProyectoButton = ({ id }: Props) => {
  const queryClient = useQueryClient();
  const { user } = useAuth(); // 👈 Obtenemos el usuario actual

  // 🚫 Si no es admin, no renderiza el botón
  if (user?.role !== "admin") return null;

  const handleDelete = async () => {
    try {
      const res = await axios.get(PROYECTOS_API_URL, { headers: HEADERS });
      const current = res.data.record.proyectos || [];

      const updated = current.map((p: any) =>
        p.id === id ? { ...p, hidden: true } : p
      );

      await axios.put(
        PROYECTOS_API_URL,
        { proyectos: updated },
        { headers: HEADERS }
      );

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
