import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { addVoluntario, updateVoluntario } from "../../Services/VoluntariosServices";

interface Props {
  onClose: () => void;
  initialData?: {
    id: string;
    name: string;
    email: string;
    role: string;
    hidden?: boolean;
  };
  isEdit?: boolean;
}

const AddVoluntarioForm = ({ onClose, initialData, isEdit }: Props) => {
  const [formData, setFormData] = useState(
    initialData || {
      id: crypto.randomUUID(),
      name: "",
      email: "",
      role: "",
      hidden: false,
    }
  );

  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateVoluntario(formData);
      } else {
        await addVoluntario(formData);
      }
      queryClient.invalidateQueries({ queryKey: ['voluntarios'] });
      onClose();
    } catch (error) {
      console.error("Error al guardar voluntario", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
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
        {isEdit ? "Guardar Cambios" : "Agregar Voluntario"}
      </button>
    </form>
  );
};

export default AddVoluntarioForm;
