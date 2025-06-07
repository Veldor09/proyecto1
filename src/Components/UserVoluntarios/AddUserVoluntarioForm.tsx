import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createUserVoluntario } from "../../Services/UserVoluntariosService";

interface Props {
  onClose: () => void;
}

const AddUserVoluntarioForm = ({ onClose }: Props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
  });

  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserVoluntario(formData);
      queryClient.invalidateQueries({ queryKey: ["userVoluntarios"] });
      onClose();
    } catch (error) {
      console.error("Error al agregar Voluntario", error);
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
        name="number"
        placeholder="Número"
        value={formData.number}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Agregar Voluntario
      </button>
    </form>
  );
};

export default AddUserVoluntarioForm;