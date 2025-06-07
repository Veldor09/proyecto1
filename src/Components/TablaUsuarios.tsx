import { useAuth } from "../Context/AuthContext";

interface Usuario {
  id: string;
  name: string;
  email: string;
  role: "Administrador" | "Voluntario" | "Aliado";
}

const usuariosEjemplo: Usuario[] = [
  { id: "1", name: "Pedro", email: "uservoluntario@example.com", role: "Voluntario" },
  { id: "2", name: "Ana", email: "useraliado@example.com", role: "Aliado" },
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
            <td className="p-2 border">{usuario.name}</td>
            <td className="p-2 border">{usuario.email}</td>
            <td className="p-2 border space-x-2">
              {(user?.role === "Administrador" || user?.id === usuario.id) && (
                <button
                  onClick={() => handleEditar(usuario)}
                  className="bg-yellow-400 px-3 py-1 rounded text-white"
                >
                  Editar
                </button>
              )}
              {user?.role === "Administrador" && (
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
