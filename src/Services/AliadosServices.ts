import axios from "axios";
  import { useQuery } from "@tanstack/react-query";

  const BIN = '68250c638561e97a50140565';
  const ALIADOS_API_URL = 'https://api.jsonbin.io/v3/b/' + BIN;
  const API_KEY = '$2a$10$1WE9CA71m8Ipze4nUPEUSORtrEj2XD95J9mSOlGqY53PTrY4mdanW';

  const HEADERS = {
    'X-Access-Key': API_KEY,
    'Content-Type': 'application/json',
  };

  // Obtener aliados
  const fetchAliados = async () => {
    try {
      const response = await axios.get(ALIADOS_API_URL, { headers: HEADERS });
      return response.data.record.aliados || [];
    } catch (error) {
      console.error('Error al obtener aliados:', error);
      return [];
    }
  };

  // Agregar aliado
  export const addAliado = async (newAliado: { name: string; email: string }) => {
    try {
      const response = await axios.get(ALIADOS_API_URL, { headers: HEADERS });
      const current = response.data.record.aliados || [];
      const updated = [...current, newAliado];

      await axios.put(ALIADOS_API_URL, { aliados: updated }, { headers: HEADERS });
    } catch (error) {
      console.error('Error al agregar aliado:', error);
      throw error;
    }
  };

  // Hook personalizado
  export const useAliados = () => {
    return useQuery({
      queryKey: ['aliados'],
      queryFn: fetchAliados,
      staleTime: 5 * 60 * 1000,
      retry: 1,
    });
  };