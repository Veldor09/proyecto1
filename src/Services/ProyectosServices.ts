import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const BIN = '64c7a5e9b89b1e2299d3e730'; // ⚠️ Cambia por el BIN que uses para proyectos
const PROYECTOS_API_URL = 'https://api.jsonbin.io/v3/b/' + BIN;
const API_KEY = '$2a$10$E.wyDo.Z69fnDRowFEiUh.51THUCweAucz3kvZ0qgU17PqfLqZAFW';

const HEADERS = {
  'X-Access-Key': API_KEY,
  'Content-Type': 'application/json',
};

export interface Proyecto {
  nombre: string;
  ubicacion: string;
  tieneFondos: boolean;
  tieneAliados: boolean;
  aliados?: string[]; // ids o nombres
  tieneVoluntarios: boolean;
  voluntarios?: string[];
}

// ✅ Obtener proyectos
const fetchProyectos = async (): Promise<Proyecto[]> => {
  try {
    const response = await axios.get(PROYECTOS_API_URL, { headers: HEADERS });
    return response.data.record.proyectos || [];
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    return [];
  }
};

// ✅ Agregar proyecto
export const addProyecto = async (nuevoProyecto: Proyecto) => {
  try {
    const response = await axios.get(PROYECTOS_API_URL, { headers: HEADERS });
    const proyectosActuales = response.data.record.proyectos || [];
    const actualizados = [...proyectosActuales, nuevoProyecto];

    await axios.put(PROYECTOS_API_URL, { proyectos: actualizados }, { headers: HEADERS });
  } catch (error) {
    console.error('Error al agregar proyecto:', error);
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
