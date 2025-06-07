// services/UserVoluntariosService.ts
import axios from 'axios';
import { UserVoluntario } from '../Types/UserVoluntarioTypes';

const API_URL = 'https://localhost:7003/api/UserVoluntario';

export const getUserVoluntarios = async (): Promise<UserVoluntario[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener UserVoluntarios:', error);
    return [];
  }
};

export const createUserVoluntario = async (data: Omit<UserVoluntario, 'id'>): Promise<UserVoluntario> => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error('Error al crear UserVoluntario:', error);
    throw error;
  }
};

export const updateUserVoluntario = async (id: string, data: Omit<UserVoluntario, 'id'>): Promise<UserVoluntario> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar UserVoluntario:', error);
    throw error;
  }
};

export const deleteUserVoluntario = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error al eliminar UserVoluntario:', error);
    throw error;
  }
};