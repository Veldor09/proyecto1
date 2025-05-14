import { useProyectos } from "../../Services/ProyectosServices";
import { useMemo } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";

const ProyectoList = () => {
  const { data, isLoading, isError } = useProyectos();
  const proyectos = useMemo(() => data ?? [], [data]);

  const columns = useMemo(
    () => [
      { header: 'Nombre', accessorKey: 'nombre' },
      { header: 'Ubicación', accessorKey: 'ubicacion' },
      { header: 'Fondos', accessorKey: 'tieneFondos' },
      { header: 'Aliados', accessorKey: 'aliados' },
      { header: 'Voluntarios', accessorKey: 'voluntarios' },
    ],
    []
  );

  const table = useReactTable({
    data: proyectos,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p>Cargando proyectos...</p>;
  if (isError) return <p>Error al cargar proyectos</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Proyectos</h2>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
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
