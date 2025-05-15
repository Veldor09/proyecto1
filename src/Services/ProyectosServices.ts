import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface Proyecto {
  id: string;
  nombre: string;
  ubicacion: string;
  tieneFondos: boolean;
  tieneAliados: boolean;
  aliados: string[];
  tieneVoluntarios: boolean;
  voluntarios: string[];
  hidden?: boolean;
}

const BIN_ID = "68250c788561e97a50140573";
const PROYECTOS_API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const API_KEY = "$2a$10$1WE9CA71m8Ipze4nUPEUSORtrEj2XD95J9mSOlGqY53PTrY4mdanW";

const HEADERS = {
  "X-Access-Key": API_KEY,
  "Content-Type": "application/json",
};

const fetchProyectos = async (): Promise<Proyecto[]> => {
  try {
    const response = await axios.get(PROYECTOS_API_URL, { headers: HEADERS });
    const todos = response.data.record.proyectos || [];
    return todos.filter((p: Proyecto) => !p.hidden);
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    return [];
  }
};

export const addProyecto = async (newProyecto: Proyecto): Promise<void> => {
  try {
    const response = await axios.get(PROYECTOS_API_URL, { headers: HEADERS });
    const current: Proyecto[] = response.data.record.proyectos || [];
    const updated = [...current, newProyecto];

    await axios.put(PROYECTOS_API_URL, { proyectos: updated }, { headers: HEADERS });
  } catch (error) {
    console.error("Error al agregar proyecto:", error);
    throw error;
  }
};

export const updateProyecto = async (updatedProyecto: Proyecto): Promise<void> => {
  try {
    const response = await axios.get(PROYECTOS_API_URL, { headers: HEADERS });
    const current: Proyecto[] = response.data.record.proyectos || [];

    const updated = current.map((p: Proyecto) =>
      p.id === updatedProyecto.id ? updatedProyecto : p
    );

    await axios.put(PROYECTOS_API_URL, { proyectos: updated }, { headers: HEADERS });
  } catch (error) {
    console.error("Error al actualizar proyecto:", error);
    throw error;
  }
};

export const useProyectos = () => {
  return useQuery<Proyecto[]>({
    queryKey: ['proyectos'],
    queryFn: fetchProyectos,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
