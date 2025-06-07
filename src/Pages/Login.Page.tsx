// src/Pages/LoginPage.tsx
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { useAuthService } from "../Hooks/useAuthService";

const LoginPage = () => {
  const { login: loginToContext } = useContext(AuthContext);
  const { login, register } = useAuthService();
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Voluntario"); // valor por defecto
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isRegistering) {
      const result = await register(id, name, email, password, role as any);
      if (result.success) {
        alert("Cuenta creada exitosamente. Ahora puedes iniciar sesión.");
        setIsRegistering(false);
        setPassword("");
      } else {
        setError("Error al registrar usuario");
      }
      return;
    }

    const result = await login(id, password, role as any);
    if (result.success && result.user) {
      loginToContext(result.user);
      switch (result.user.role) {
        case "Administrador":
          navigate({ to: "/proyectos" });
          break;
        case "Aliado":
          navigate({ to: "/aliados" });
          break;
        case "Voluntario":
          navigate({ to: "/voluntarios" });
          break;
        default:
          navigate({ to: "/" });
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
        <h2 className="text-xl font-bold mb-4 text-center">
          {isRegistering ? "Crear Cuenta" : "Iniciar Sesión"}
        </h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}

        {isRegistering && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="shadow border rounded w-full py-2 px-3"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="shadow border rounded w-full py-2 px-3"
              />
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">ID</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            className="shadow border rounded w-full py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow border rounded w-full py-2 px-3"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Rol</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="shadow border rounded w-full py-2 px-3"
            required
          >
            <option value="Voluntario">Voluntario</option>
            <option value="Aliado">Aliado</option>
            <option value="Administrador">Administrador</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          {isRegistering ? "Registrarse" : "Iniciar Sesión"}
        </button>

        <p
          className="mt-4 text-sm text-center text-blue-500 hover:underline cursor-pointer"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering
            ? "¿Ya tienes una cuenta? Inicia sesión"
            : "¿No tienes cuenta? Regístrate"}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
