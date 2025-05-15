// src/Components/TablaUsuarios.tsx
import { useAuth } from "../Context/AuthContext";

interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

const usuariosEjemplo: Usuario[] = [
  { id: 1, nombre: "Pedro", email: "uservoluntario@example.com" },
  { id: 2, nombre: "Ana", email: "useraliado@example.com" },
];

export const TablaUsuarios = () => {
  const { user } = useAuth();

  const handleEditar = (usuario: Usuario) => {
    console.log("Editar", usuario);
  };

  const handleEliminar = (usuario: Usuario) => {
    console.log("Eliminar", usuario);
  };

  return (
    <table className="w-full border mt-6">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">Nombre</th>
          <th className="p-2 border">Correo</th>
          <th className="p-2 border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuariosEjemplo.map((usuario) => (
          <tr key={usuario.id} className="text-center">
            <td className="p-2 border">{usuario.nombre}</td>
            <td className="p-2 border">{usuario.email}</td>
            <td className="p-2 border space-x-2">
              {(user?.role === "admin" || user?.email === usuario.email) && (
                <button
                  onClick={() => handleEditar(usuario)}
                  className="bg-yellow-400 px-3 py-1 rounded text-white"
                >
                  Editar
                </button>
              )}
              {user?.role === "admin" && (
                <button
                  onClick={() => handleEliminar(usuario)}
                  className="bg-red-500 px-3 py-1 rounded text-white"
                >
                  Eliminar
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
