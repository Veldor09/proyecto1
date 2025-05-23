import axios from 'axios';
import bcrypt from 'bcryptjs';

const API_KEY = '$2a$10$JMHiHuAzVzegUTuogZLRq.GRbcBWpFNpkBJ2kgEK4SQ9LQYUxAF0K';
const BIN_ID_USUARIOS = '682806fd8960c979a59b20ad';

export const useLogin = () => {
  const login = async (
    email: string,
    password: string,
    role: 'admin' | 'aliado' | 'voluntario'
  ): Promise<{
    success: boolean;
    user?: { name: string; email: string; role: 'admin' | 'aliado' | 'voluntario' };
  }> => {
    try {
      const res = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID_USUARIOS}`, {
        headers: { 'X-Master-Key': API_KEY },
      });

      const usuarios: any[] = res.data.record;

      const user = usuarios.find((u) => u.email === email && u.role === role);
      if (!user) return { success: false };

      const isAdminQuemado = user.role === 'admin' && user.email === 'admin@gmail.com';

      const passwordMatch = isAdminQuemado
        ? password === user.password // comparación directa
        : await bcrypt.compare(password, user.password); // comparación con hash

      if (!passwordMatch) return { success: false };

      return {
        success: true,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error) {
      console.error('Error al autenticar:', error);
      return { success: false };
    }
  };

  return { login };
};
