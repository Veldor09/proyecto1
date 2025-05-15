import { useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender, Row } from '@tanstack/react-table';
import { useVoluntarios } from '../../Services/VoluntariosServices';
import EditVoluntarioButton from './EditVoluntarioButton';
import HideVoluntarioButton from './DeleteVoluntarioButton';

interface Voluntario {
  id: string;
  name: string;
  email: string;
  role: string;
  hidden?: boolean;
}

const VoluntarioList = () => {
  const { data, isLoading, isError, error } = useVoluntarios();

  const voluntarios = useMemo(
    () => (data ?? []).filter((v: Voluntario) => !v.hidden),
    [data]
  );

  const columns = useMemo(
    () => [
      { header: 'ID', accessorKey: 'id' },
      { header: 'Nombre', accessorKey: 'name' },
      { header: 'Correo', accessorKey: 'email' },
      { header: 'Rol', accessorKey: 'role' },
      {
        header: 'Acciones',
        id: 'acciones',
        cell: ({ row }: { row: Row<Voluntario> }) => (
          <div className="flex space-x-2">
            <EditVoluntarioButton voluntario={row.original} />
            <HideVoluntarioButton id={row.original.id} />
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: voluntarios,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div className="p-4">Cargando voluntarios...</div>;
  if (isError) return <div className="p-4 text-red-500">Error: {error?.message}</div>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Voluntarios</h1>
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

export default VoluntarioList;
