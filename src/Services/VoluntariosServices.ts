import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const BIN = '68250c3e8561e97a50140550';
const VOLUNTARIOS_API_URL = 'https://api.jsonbin.io/v3/b/' + BIN;
const API_KEY = '$2a$10$1WE9CA71m8Ipze4nUPEUSORtrEj2XD95J9mSOlGqY53PTrY4mdanW';

const HEADERS = {
  'X-Access-Key': API_KEY,
  'Content-Type': 'application/json',
};

// Obtener voluntarios
const fetchVoluntarios = async () => {
  try {
    const response = await axios.get(VOLUNTARIOS_API_URL, { headers: HEADERS });
    return response.data.record.voluntarios || [];
  } catch (error) {
    console.error('Error al obtener voluntarios:', error);
    return [];
  }
};

// Agregar voluntario
export const addVoluntario = async (newVoluntario: { id: string; name: string; email: string; role: string; }) => {
  try {
    const response = await axios.get(VOLUNTARIOS_API_URL, { headers: HEADERS });
    const current = response.data.record.voluntarios || [];
    const updated = [...current, newVoluntario];

    await axios.put(VOLUNTARIOS_API_URL, { voluntarios: updated }, { headers: HEADERS });
  } catch (error) {
    console.error('Error al agregar voluntario:', error);
    throw error;
  }
};

// Hook personalizado
export const useVoluntarios = () => {
  return useQuery({
    queryKey: ['voluntarios'],
    queryFn: fetchVoluntarios,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};