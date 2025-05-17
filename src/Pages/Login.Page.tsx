import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { useLogin } from "../Hooks/useLogin";

const LoginPage = () => {
  const { login: loginToContext } = useContext(AuthContext);
  const { login } = useLogin();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("voluntario");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await login(email, password, role);

    if (result.success && result.user) {
      loginToContext(result.user);

      // Redirección automática según el rol
      switch (result.user.role) {
        case "admin":
          navigate({ to: "/proyectos" }); 
          break;
        case "aliado":
          navigate({ to: "/aliados" });
          break;
        case "voluntario":
          navigate({ to: "/voluntarios" });
          break;
        default:
          navigate({ to: "/" });
          break;
      }
    } else {
      setError("Usuario, contraseña o rol incorrecto");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Iniciar Sesión</h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Correo
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow border rounded w-full py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow border rounded w-full py-2 px-3"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Rol
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="shadow border rounded w-full py-2 px-3"
          >
            <option value="voluntario">Voluntario</option>
            <option value="aliado">Aliado</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
