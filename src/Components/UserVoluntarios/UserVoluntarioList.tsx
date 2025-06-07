import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  Row,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { getUserVoluntarios, deleteUserVoluntario } from "../../Services/UserVoluntariosService";
import EditUserVoluntarioForm from "./EditUserVoluntarioButton";
import { useAuth } from "../../Context/AuthContext";

interface UserVoluntario {
  id: string;
  name: string;
  email: string;
  number: string;
  hidden?: boolean;
}

const UserVoluntarioList = () => {
  const { user } = useAuth();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["userVoluntarios"],
    queryFn: getUserVoluntarios,
  });
  const [selectedUserVoluntario, setSelectedUserVoluntario] = useState<UserVoluntario | null>(null);

  const userVoluntarios = useMemo(() => {
    return (data ?? []).filter((useravoluntario) => !useravoluntario.hidden);
  }, [data]);

  const columns = useMemo<ColumnDef<UserVoluntario>[]>(() => [
    { header: "Nombre", accessorKey: "name" },
    { header: "Correo", accessorKey: "email" },
    { header: "Número de Contacto", accessorKey: "number" },
    {
      header: "Acciones",
      id: "acciones",
      cell: ({ row }: { row: Row<UserVoluntario> }) => (
        <div className="flex gap-2">
          {(user?.role === "Administrador" || user?.role === "Voluntario") && (
            <button
              onClick={() => setSelectedUserVoluntario(row.original)}
              className="text-blue-600 hover:underline"
            >
              Editar
            </button>
          )}
          {user?.role === "Administrador" && (
            <button
              onClick={async () => {
                await deleteUserVoluntario(row.original.id);
                await refetch();
              }}
              className="text-red-600 hover:underline"
            >
              Eliminar
            </button>
          )}
        </div>
      ),
    },
  ], [user, refetch]);

  const table = useReactTable({
    data: userVoluntarios,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div className="p-4">Cargando UserVoluntarios...</div>;
  if (isError) return <div className="p-4 text-red-500">Error al cargar UserVoluntarios</div>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Lista de UserVoluntarios</h1>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(user?.role === "Administrador" || user?.role === "Voluntario") && selectedUserVoluntario && (
        <EditUserVoluntarioForm
          userVoluntario={selectedUserVoluntario}
          onClose={() => setSelectedUserVoluntario(null)}
          onSave={async () => {
            await refetch();
            setSelectedUserVoluntario(null);
          }}
        />
      )}
    </div>
  );
};

export default UserVoluntarioList;