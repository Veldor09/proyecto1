import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { addVoluntario } from "../../Services/VoluntariosServices";

interface Props {
  onClose: () => void;
}

const AddVoluntarioForm = ({ onClose }: Props) => {
  const [formData, setFormData] = useState({
    id: crypto.randomUUID(), // ⚠️ usar uuid o nanoid si lo necesitas más robusto
    name: "",
    email: "",
    role: "",
  });

  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addVoluntario(formData);
      queryClient.invalidateQueries(["voluntarios"]);
      onClose();
    } catch (error) {
      console.error("Error al agregar voluntario", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="role"
        placeholder="Rol"
        value={formData.role}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Agregar Voluntario
      </button>
    </form>
  );
};

export default AddVoluntarioForm;