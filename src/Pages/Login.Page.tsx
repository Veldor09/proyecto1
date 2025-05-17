import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { useLogin } from "../Hooks/useLogin";
import axios from "axios";
import { hash } from "bcryptjs";

const API_KEY = "$2a$10$JMHiHuAzVzegUTuogZLRq.GRbcBWpFNpkBJ2kgEK4SQ9LQYUxAF0K";
const BIN_ID_USUARIOS = "682806fd8960c979a59b20ad";
const BIN_ID_VOLUNTARIOS = "6828075f8a456b79669f617b";
const BIN_ID_ALIADOS = "682807468a456b79669f616e";

const LoginPage = () => {
  const { login: loginToContext } = useContext(AuthContext);
  const { login } = useLogin();
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("voluntario");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isRegistering) {
      try {
        const hashedPassword = await hash(password, 10);
        const id = crypto.randomUUID();

        // Guardar en bin de usuarios
        const resUsuarios = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID_USUARIOS}`, {
          headers: { "X-Master-Key": API_KEY },
        });
        const usuarios = resUsuarios.data.record || [];

        const nuevoUsuario = {
          id,
          name,
          email,
          password: hashedPassword,
          role,
        };

        await axios.put(
          `https://api.jsonbin.io/v3/b/${BIN_ID_USUARIOS}`,
          [...usuarios, nuevoUsuario],
          {
            headers: {
              "X-Master-Key": API_KEY,
              "Content-Type": "application/json",
            },
          }
        );

        // Guardar en bin de aliados o voluntarios
        if (role !== "admin") {
          const binPublico = role === "voluntario" ? BIN_ID_VOLUNTARIOS : BIN_ID_ALIADOS;
          const clave = role === "voluntario" ? "voluntarios" : "aliados";

          const resPublico = await axios.get(`https://api.jsonbin.io/v3/b/${binPublico}`, {
            headers: { "X-Master-Key": API_KEY },
          });

          const actuales = resPublico.data.record?.[clave] || [];

          const nuevoPublico = {
            id,
            name,
            email,
            role,
          };

          await axios.put(
            `https://api.jsonbin.io/v3/b/${binPublico}`,
            { [clave]: [...actuales, nuevoPublico] },
            {
              headers: {
                "X-Master-Key": API_KEY,
                "Content-Type": "application/json",
              },
            }
          );
        }

        alert("Cuenta creada exitosamente. Ahora puedes iniciar sesión.");
        setIsRegistering(false);
        setPassword("");
      } catch (error) {
        console.error(error);
        setError("Error al registrar usuario");
      }
      return;
    }

    // Modo login
    const result = await login(email, password, role);

    if (result.success && result.user) {
      loginToContext(result.user);

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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="shadow border rounded w-full py-2 px-3"
            />
          </div>
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
          {isRegistering ? "Crear cuenta" : "Ingresar"}
        </button>

        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          className="mt-4 text-blue-500 hover:underline text-sm w-full text-center"
        >
          {isRegistering ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
