import axios from 'axios';
import { Aliado } from '../Types/AliadoTypes';

const ALIADOS_API_URL = 'https://localhost:7003/api/Aliados';

// 1. Obtener todos los Aliados
export const fetchAliados = async (): Promise<Aliado[]> => {
  try {
    const response = await axios.get(ALIADOS_API_URL);
    console.log("Respuesta de aliados:", response.data);
    return response.data; // <-- asegúrate que esto es un array plano
  } catch (error) {
    console.error('Error al obtener aliados:', error);
    return [];
  }
};

// 2. Agregar un nuevo aliado
export const addAliado = async (newAliado: Aliado): Promise<Aliado> => {
  try {
    const response = await axios.post(ALIADOS_API_URL, newAliado);
    return response.data;
  } catch (error) {
    console.error('Error al agregar aliado:', error);
    throw error;
  }
};

// 3. Hook de React Query para obtener aliados
import { useQuery } from '@tanstack/react-query';

export const useAliados = () => {
  return useQuery<Aliado[]>({
    queryKey: ['aliados'],
    queryFn: fetchAliados,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

// 4. Actualizar aliado existente
export const updateAliado = async (updatedAliado: Aliado): Promise<Aliado> => {
  try {
    const response = await axios.put(`${ALIADOS_API_URL}/${updatedAliado.id}`, updatedAliado);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar aliado:', error);
    throw error;
  }
};

// 5. Eliminar aliado (si deseas ocultarlo, puedes usar PATCH o PUT para marcar como "hidden")
export const deleteAliado = async (Id: string): Promise<void> => {
  try {
    await axios.delete(`${ALIADOS_API_URL}/${Id}`);
  } catch (error) {
    console.error('Error al eliminar aliado:', error);
    throw error;
  }
};