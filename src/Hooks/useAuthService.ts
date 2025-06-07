// src/Hooks/useAuthService.ts
import axios from "axios";
import { User } from "../Context/AuthContext";

const API_BASE_URL = "https://localhost:7003/api/Auth";

export const useAuthService = () => {
  const login = async (
    id: string,
    password: string,
    role: "Administrador" | "Aliado" | "Voluntario"
  ): Promise<{ success: boolean; user?: User }> => {
    try {
      const res = await axios.post(`${API_BASE_URL}/login`, {
        Id: id,
        Password: password,
        Role: role
      });

      const user = res.data.user;

      return { success: true, user };
    } catch (err) {
      console.error("Error al iniciar sesión", err);
      return { success: false };
    }
  };

  const register = async (
    id: string,
    name: string,
    email: string,
    password: string,
    role: "Administrador" | "Aliado" | "Voluntario"
  ): Promise<{ success: boolean }> => {
    try {
      await axios.post(`${API_BASE_URL}/register`, {
        Id: id,
        Name: name,
        Email: email,
        Password: password,
        Role: role,
      });

      return { success: true };
    } catch (err) {
      console.error("Error al registrar", err);
      return { success: false };
    }
  };

  return { login, register };
};
