import axios from "axios";

const API_URL = "https://localhost:7003/api/Usuarios"; // Ajustá el puerto según tu backend

interface RegistroData {
  id:string;
  name: string;
  email: string;
  password: string;
  role: "voluntario" | "aliado" | "admin";
}

export async function registrarUsuario(data: RegistroData) {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Error al registrar usuario:", error);

    // Puedes personalizar según lo que devuelva tu backend
    const message =
      error.response?.data?.message ||
      "Ocurrió un error al registrar el usuario.";

    return { success: false, message };
  }
}
