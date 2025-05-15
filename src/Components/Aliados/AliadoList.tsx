// src/Components/Aliados/AliadoList.tsx
import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  Row,
} from "@tanstack/react-table";
import { useAliados } from "../../Services/AliadosServices";
import EditAliadoForm from "./EditAliadoForm";
import { getHiddenAliados, hideAliado } from "./HiddenAliados";

interface Aliado {
  id: string;
  name: string;
  email: string;
}

const AliadoList = () => {
  const { data, isLoading, isError, refetch } = useAliados();

  // Estado para forzar re-render al ocultar aliados
  const [version, setVersion] = useState(0);

  // Filtrar aliados excluyendo los ocultos, se vuelve a calcular cuando cambian data o version
  const aliados = useMemo(() => {
    const hiddenIds = getHiddenAliados();
    return (data ?? []).filter((aliado) => !hiddenIds.includes(aliado.id));
  }, [data, version]);

  const [selectedAliado, setSelectedAliado] = useState<Aliado | null>(null);

  const columns = useMemo<ColumnDef<Aliado>[]>(
    () => [
      { header: "ID", accessorKey: "id" },
      { header: "Nombre", accessorKey: "name" },
      { header: "Correo", accessorKey: "email" },
      {
        header: "Acciones",
        id: "acciones",
        cell: ({ row }: { row: Row<Aliado> }) => (
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedAliado(row.original)}
              className="text-blue-600 hover:underline"
            >
              Editar
            </button>
            <button
              onClick={() => {
                hideAliado(row.original.id);
                setVersion((v) => v + 1); // Fuerza re-render para actualizar lista
              }}
              className="text-red-600 hover:underline"
            >
              Eliminar
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: aliados,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div className="p-4">Cargando aliados...</div>;
  }
  if (isError) {
    return <div className="p-4 text-red-500">Error al cargar aliados</div>;
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Lista de Aliados</h1>
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

      {selectedAliado && (
        <EditAliadoForm
          aliado={selectedAliado}
          onClose={() => setSelectedAliado(null)}
          onSave={() => {
            refetch();
            setSelectedAliado(null);
          }}
        />
      )}
    </div>
  );
};

export default AliadoList;
