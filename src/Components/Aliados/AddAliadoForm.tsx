import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { addAliado } from "../../Services/AliadosServices";

interface Props {
  onClose: () => void;
}

const AddAliadoForm = ({ onClose }: Props) => {
  const [formData, setFormData] = useState({
    id: crypto.randomUUID(),
    name: "",
    email: "",
  });

  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addAliado(formData);
      queryClient.invalidateQueries({ queryKey: ['aliados'] });
      onClose();
    } catch (error) {
      console.error("Error al agregar aliado", error);
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
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Agregar Aliado
      </button>
    </form>
  );
};

export default AddAliadoForm;