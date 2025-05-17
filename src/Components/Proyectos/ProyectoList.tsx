import { useProyectos } from "../../Services/ProyectosServices";
import { useMemo } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import EditProyectoButton from "./EditProyectoButton";
import DeleteProyectoButton from "./DeleteProyectoButton";
import AddProyectoButton from "./AddProyectoButton"; //  
import { useAuth } from "../../Context/AuthContext";


const ProyectoList = () => {
  const { user } = useAuth(); // 
  const { data, isLoading, isError, error } = useProyectos();

  const proyectos = useMemo(() => data ?? [], [data]);

  const columns = useMemo(
    () => [
      {
        header: "Nombre",
        accessorKey: "nombre",
      },
      {
        header: "Ubicación",
        accessorKey: "ubicacion",
      },
      {
        header: "Fondos",
        accessorKey: "tieneFondos",
        cell: ({ row }: any) => (row.original.tieneFondos ? "Sí" : "No"),
      },
      {
        header: "Aliados",
        accessorKey: "aliados",
        cell: ({ row }: any) =>
          Array.isArray(row.original.aliados) && row.original.aliados.length > 0
            ? row.original.aliados.join(", ")
            : "Ninguno",
      },
      {
        header: "Voluntarios",
        accessorKey: "voluntarios",
        cell: ({ row }: any) =>
          Array.isArray(row.original.voluntarios) && row.original.voluntarios.length > 0
            ? row.original.voluntarios.join(", ")
            : "Ninguno",
      },
      {
        header: "Acciones",
        id: "acciones",
        cell: ({ row }: any) => (
          <div className="flex space-x-2">
            {user?.role === "admin" && (
              <>
                <EditProyectoButton proyecto={row.original} />
                <DeleteProyectoButton id={row.original.id} />
              </>
            )}
          </div>
        ),
      },
    ],
    [user]
  );

  const table = useReactTable({
    data: proyectos,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p className="p-4">Cargando proyectos...</p>;
  if (isError) return <p className="p-4 text-red-500">Error: {error?.message}</p>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Proyectos</h2>

      {/*  Mostrar botón agregar solo si es admin */}
      {user?.role === "admin" && (
        <div className="mb-4">
          <AddProyectoButton />
        </div>
      )}

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
                    {flexRender(header.column.columnDef.header, header.getContext())}
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
    </div>
  );
};

export default ProyectoList;