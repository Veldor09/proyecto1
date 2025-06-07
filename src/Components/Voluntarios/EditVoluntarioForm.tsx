// src/Components/Aliados/EditAliadoForm.tsx
import { useState } from "react";
import { updateVoluntario } from "../../Services/VoluntariosServices";

type Voluntario = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type EditVoluntarioFormProps = {
  voluntario: Voluntario;
  onClose: () => void;
  onSave: () => void;
};

const EditVoluntarioForm = ({ voluntario, onClose, onSave }: EditVoluntarioFormProps) => {
  const [name, setName] = useState(voluntario.name);
  const [email, setEmail] = useState(voluntario.email);
  const [role, setRole] = useState(voluntario.role);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

  
    try {
      await updateVoluntario({ ...voluntario, name, email, role });
      onSave(); // Refresca la tabla y cierra el modal
    } catch (err) {
      console.error(err);
      setError("Hubo un error al actualizar el voluntario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Voluntario</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo</label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rol</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="Aliado">Aliado</option>
              <option value="Administrador">Administrador</option>
              <option value="Voluntario">Voluntario</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVoluntarioForm;
