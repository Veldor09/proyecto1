// Components/UserAliados/EditUserAliadoForm.tsx
import { useState } from "react";
import { updateUserAliado } from "../../Services/UserAliadosServices";

type UserAliado = {
  id: string;
  name: string;
  email: string;
  number: string;
  hidden?: boolean;
};

type EditUserAliadoFormProps = {
  userAliado: UserAliado;
  onClose: () => void;
  onSave: () => void;
};

const EditUserAliadoForm = ({ userAliado, onClose, onSave }: EditUserAliadoFormProps) => {
  const [name, setName] = useState(userAliado.name);
  const [email, setEmail] = useState(userAliado.email);
  const [number, setNumber] = useState(userAliado.number);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await updateUserAliado(userAliado.id, { name, email, number });
      onSave(); // Refresca la tabla y cierra el modal
    } catch (err) {
      console.error(err);
      setError("Hubo un error al actualizar el Aliado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Aliado</h2>
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
            <label className="block text-sm font-medium text-gray-700">Número</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
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

export default EditUserAliadoForm;