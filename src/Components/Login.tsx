// src/Components/Login.tsx
import { useRef, useState } from 'react';
import { useLogin } from '../Hooks/useLogin';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from '@tanstack/react-router';

const Login = () => {
  const { login: loginToContext } = useAuth();
  const { login } = useLogin();
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    const result = await login(email, password);

    setLoading(false);

    if (result.success && result.user) {
      loginToContext(result.user);
      navigate({ to: '/' });
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
      <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-lg w-80 mx-auto space-y-4">
        <input
          type="email"
          placeholder="Correo"
          ref={emailRef}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Contraseña"
          ref={passwordRef}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {loading ? 'Cargando...' : 'Ingresar'}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </>
  );
};

export default Login;
