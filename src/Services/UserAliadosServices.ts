// services/UserAliadosServices.ts
import axios from 'axios';
import { UserAliado } from '../Types/UserAliadoTypes';

const API_URL = 'https://localhost:7003/api/UserAliado';

export const getUserAliados = async (): Promise<UserAliado[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener UserAliados:', error);
    return [];
  }
};

export const createUserAliado = async (data: Omit<UserAliado, 'id'>): Promise<UserAliado> => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error('Error al crear UserAliado:', error);
    throw error;
  }
};

export const updateUserAliado = async (id: string, data: Omit<UserAliado, 'id'>): Promise<UserAliado> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar UserAliado:', error);
    throw error;
  }
};

export const deleteUserAliado = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error al eliminar UserAliado:', error);
    throw error;
  }
};