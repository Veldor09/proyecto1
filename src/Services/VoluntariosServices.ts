import axios from 'axios';
import { Voluntario } from '../Types/VoluntarioTypes';
import { useQuery } from '@tanstack/react-query';

const VOLUNTARIOS_API_URL = 'https://localhost:7003/api/Voluntarios';

// 1. Obtener todos los voluntarios
export const fetchVoluntarios = async (): Promise<Voluntario[]> => {
  try {
    const response = await axios.get(VOLUNTARIOS_API_URL);
    console.log("Respuesta de voluntarios:", response.data);
    return response.data; // Se espera un array plano desde el backend
  } catch (error) {
    console.error('Error al obtener voluntarios:', error);
    return [];
  }
};

// 2. Agregar un nuevo voluntario
export const addVoluntario = async (newVoluntario: Voluntario): Promise<Voluntario> => {
  try {
    const response = await axios.post(VOLUNTARIOS_API_URL, newVoluntario);
    return response.data;
  } catch (error) {
    console.error('Error al agregar voluntario:', error);
    throw error;
  }
};

// 3. Hook de React Query para obtener voluntarios
export const useVoluntarios = () => {
  return useQuery<Voluntario[]>({
    queryKey: ['voluntarios'],
    queryFn: fetchVoluntarios,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

// 4. Actualizar voluntario existente
export const updateVoluntario = async (updatedVoluntario: Voluntario): Promise<Voluntario> => {
  try {
    const response = await axios.put(`${VOLUNTARIOS_API_URL}/${updatedVoluntario.id}`, updatedVoluntario);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar voluntario:', error);
    throw error;
  }
};

// 5. Ocultar (eliminar) voluntario
export const deleteVoluntario = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${VOLUNTARIOS_API_URL}/${id}`);
  } catch (error) {
    console.error('Error al eliminar voluntario:', error);
    throw error;
  }
};
