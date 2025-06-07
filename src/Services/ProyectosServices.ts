import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Proyecto } from "../Types/ProyectoTypes";

const PROYECTO_API_URL = "https://localhost:7003/api/Proyectos";

// 1. Obtener todos los proyectos
export const fetchProyectos = async (): Promise<Proyecto[]> => {
  try {
    const response = await axios.get(PROYECTO_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    return [];
  }
};

// 2. Agregar nuevo proyecto
export const addProyecto = async (newProyecto: Proyecto): Promise<Proyecto> => {
  try {
    const response = await axios.post(PROYECTO_API_URL, newProyecto);
    return response.data;
  } catch (error) {
    console.error("Error al agregar proyecto:", error);
    throw error;
  }
};

// 3. Actualizar proyecto existente
export const updateProyecto = async (updatedProyecto: Proyecto): Promise<Proyecto> => {
  try {
    const response = await axios.put(`${PROYECTO_API_URL}/${updatedProyecto.id}`, updatedProyecto);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar proyecto:", error);
    throw error;
  }
};

// 4. Ocultar proyecto (marcar hidden: true)
export const deleteProyecto = async (id: string): Promise<void> => {
  try {
    await axios.put(`${PROYECTO_API_URL}/${id}/ocultar`);
  } catch (error) {
    console.error("Error al ocultar proyecto:", error);
    throw error;
  }
};

// 5. Hook react-query
export const useProyectos = () => {
  return useQuery<Proyecto[]>({
    queryKey: ["proyectos"],
    queryFn: fetchProyectos,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export type { Proyecto };
