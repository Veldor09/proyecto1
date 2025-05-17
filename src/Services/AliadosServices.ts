import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Tipo para representar un Aliado
export interface Aliado {
  id: string;
  name: string;
  email: string;
}

// Configuración de la API
const BIN = '682807468a456b79669f616e';
const ALIADOS_API_URL = `https://api.jsonbin.io/v3/b/${BIN}`;
const API_KEY = '$2a$10$JMHiHuAzVzegUTuogZLRq.GRbcBWpFNpkBJ2kgEK4SQ9LQYUxAF0K';

const HEADERS = {
  'X-Access-Key': API_KEY,
  'Content-Type': 'application/json',
};

// Obtener aliados
const fetchAliados = async (): Promise<Aliado[]> => {
  try {
    const response = await axios.get(ALIADOS_API_URL, { headers: HEADERS });
    return response.data.record.aliados || [];
  } catch (error) {
    console.error('Error al obtener aliados:', error);
    return [];
  }
};

// Agregar aliado
export const addAliado = async (newAliado: Aliado): Promise<void> => {
  try {
    const response = await axios.get(ALIADOS_API_URL, { headers: HEADERS });
    const current: Aliado[] = response.data.record.aliados || [];
    const updated = [...current, newAliado];

    await axios.put(ALIADOS_API_URL, { aliados: updated }, { headers: HEADERS });
  } catch (error) {
    console.error('Error al agregar aliado:', error);
    throw error;
  }
};

// Hook personalizado para React Query
export const useAliados = () => {
  return useQuery<Aliado[]>({
    queryKey: ['aliados'],
    queryFn: fetchAliados,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 1,
  });
};

// Editar aliado existente
export const updateAliado = async (updatedAliado: Aliado): Promise<void> => {
  try {
    const response = await axios.get(ALIADOS_API_URL, { headers: HEADERS });
    const current: Aliado[] = response.data.record.aliados || [];

    const updatedAliados = current.map((aliado: Aliado) =>
      aliado.id === updatedAliado.id ? updatedAliado : aliado
    );

    await axios.put(ALIADOS_API_URL, { aliados: updatedAliados }, { headers: HEADERS });
  } catch (error) {
    console.error('Error al actualizar aliado:', error);
    throw error;
  }
};
