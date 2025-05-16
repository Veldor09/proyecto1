// src/Hooks/useLogin.ts
export const useLogin = () => {
  const login = (
    email: string,
    password: string
  ): {
    success: boolean;
    user?: { name: string; email: string; role: 'admin' | 'aliado' | 'voluntario' };
  } => {
    const users = [
      {
        email: 'admin@gmail.com',
        password: '12345',
        name: 'Administrador',
        role: 'admin',
      },
      {
        email: 'aliado@gmail.com',
        password: '1234',
        name: 'Aliado Ejemplo',
        role: 'aliado',
      },
      {
        email: 'voluntario@gmail.com',
        password: '1234',
        name: 'Voluntario Ejemplo',
        role: 'voluntario',
      },
    ];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    return foundUser
      ? {
          success: true,
          user: {
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role,
          },
        }
      : { success: false };
  };

  return { login };
};