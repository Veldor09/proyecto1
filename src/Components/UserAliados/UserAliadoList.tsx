// Components/UserAliados/UserAliadoList.tsx
import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  Row,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { getUserAliados, deleteUserAliado } from "../../Services/UserAliadosServices";
import EditUserAliadoForm from "./EditUserAliadoButton";
import { useAuth } from "../../Context/AuthContext";

interface UserAliado {
  id: string;
  name: string;
  email: string;
  number: string;
  hidden?: boolean;
}

const UserAliadoList = () => {
  const { user } = useAuth();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["userAliados"],
    queryFn: getUserAliados,
  });
  const [selectedUserAliado, setSelectedUserAliado] = useState<UserAliado | null>(null);

  const userAliados = useMemo(() => {
    return (data ?? []).filter((useraliado) => !useraliado.hidden);
  }, [data]);

  const columns = useMemo<ColumnDef<UserAliado>[]>(() => [
    { header: "Nombre", accessorKey: "name" },
    { header: "Correo", accessorKey: "email" },
    { header: "Número de Contacto", accessorKey: "number" },
    {
      header: "Acciones",
      id: "acciones",
      cell: ({ row }: { row: Row<UserAliado> }) => (
        <div className="flex gap-2">
          {(user?.role === "Administrador" || user?.role === "Aliado") && (
            <button
              onClick={() => setSelectedUserAliado(row.original)}
              className="text-blue-600 hover:underline"
            >
              Editar
            </button>
          )}
          {user?.role === "Administrador" && (
            <button
              onClick={async () => {
                await deleteUserAliado(row.original.id);
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
    data: userAliados,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div className="p-4">Cargando UserAliados...</div>;
  if (isError) return <div className="p-4 text-red-500">Error al cargar UserAliados</div>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Lista de UserAliados</h1>
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

      {(user?.role === "Administrador" || user?.role === "Aliado") && selectedUserAliado && (
        <EditUserAliadoForm
          userAliado={selectedUserAliado}
          onClose={() => setSelectedUserAliado(null)}
          onSave={async () => {
            await refetch();
            setSelectedUserAliado(null);
          }}
        />
      )}
    </div>
  );
};

export default UserAliadoList;