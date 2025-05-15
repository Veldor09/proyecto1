// src/Hooks/useLogin.ts
export const useLogin = () => {
  const login = (
    email: string,
    password: string
  ): { success: boolean; user?: { name: string; email: string } } => {
    // Lista hardcoded de usuarios válidos
    const users = [
      { email: 'admin@demo.com', password: '12345', name: 'Administrador' },
      { email: 'useraliado@example.com', password: '1234', name: 'Aliado Ejemplo' },
      { email: 'uservoluntario@example.com', password: '1234', name: 'Voluntario Ejemplo' },
    ];

    const foundUser = users.find((u) => u.email === email && u.password === password);
    return foundUser ? { success: true, user: { name: foundUser.name, email: foundUser.email } } : { success: false };
  };

  return { login };
};