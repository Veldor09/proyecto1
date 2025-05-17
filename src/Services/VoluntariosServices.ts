import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// 1. Definir la interfaz Voluntario
export interface Voluntario {
  id: string;
  name: string;
  email: string;
  role: string;
}

// 2. Constantes de configuración
const BIN = '6828075f8a456b79669f617b';
const VOLUNTARIOS_API_URL = `https://api.jsonbin.io/v3/b/${BIN}`;
const API_KEY = '$2a$10$1WE9CA71m8Ipze4nUPEUSORtrEj2XD95J9mSOlGqY53PTrY4mdanW';

const HEADERS = {
  'X-Access-Key': API_KEY,
  'Content-Type': 'application/json',
};

// 3. Obtener voluntarios
const fetchVoluntarios = async (): Promise<Voluntario[]> => {
  try {
    const response = await axios.get(VOLUNTARIOS_API_URL, { headers: HEADERS });
    return response.data.record.voluntarios || [];
  } catch (error) {
    console.error('Error al obtener voluntarios:', error);
    return [];
  }
};

// 4. Agregar voluntario
export const addVoluntario = async (newVoluntario: Voluntario): Promise<void> => {
  try {
    const response = await axios.get(VOLUNTARIOS_API_URL, { headers: HEADERS });
    const current: Voluntario[] = response.data.record.voluntarios || [];
    const updated = [...current, newVoluntario];

    await axios.put(VOLUNTARIOS_API_URL, { voluntarios: updated }, { headers: HEADERS });
  } catch (error) {
    console.error('Error al agregar voluntario:', error);
    throw error;
  }
};

// 5. Hook personalizado para React Query
export const useVoluntarios = () => {
  return useQuery<Voluntario[]>({
    queryKey: ['voluntarios'],
    queryFn: fetchVoluntarios,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

// 6. Editar voluntario existente
export const updateVoluntario = async (updatedVoluntario: Voluntario): Promise<void> => {
  try {
    const response = await axios.get(VOLUNTARIOS_API_URL, { headers: HEADERS });
    const current: Voluntario[] = response.data.record.voluntarios || [];

    const updated = current.map((v: Voluntario) =>
      v.id === updatedVoluntario.id ? updatedVoluntario : v
    );

    await axios.put(VOLUNTARIOS_API_URL, { voluntarios: updated }, { headers: HEADERS });
  } catch (error) {
    console.error('Error al actualizar voluntario:', error);
    throw error;
  }
};