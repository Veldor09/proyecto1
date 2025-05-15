import { useState } from "react";
import { addProyecto } from "../../Services/ProyectosServices";
import { useQueryClient } from "@tanstack/react-query";
import { useAliados } from "../../Services/AliadosServices";
import { useVoluntarios } from "../../Services/VoluntariosServices";

// Tipos de datos esperados
interface Aliado {
  name: string;
  email: string;
}

interface Voluntario {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AddProyectoFormProps {
  onClose: () => void;
}

const AddProyectoForm = ({ onClose }: AddProyectoFormProps) => {
  const [formData, setFormData] = useState({
    nombre: "",
    ubicacion: "",
    tieneFondos: false,
    tieneAliados: false,
    aliados: [] as string[],
    tieneVoluntarios: false,
    voluntarios: [] as string[],
  });

  const queryClient = useQueryClient();

  // Tipado explícito para evitar errores con `.map`
  const { data: aliados } = useAliados() as { data: Aliado[] };
  const { data: voluntarios } = useVoluntarios() as { data: Voluntario[] };

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value, type } = e.target;

  if (type === 'checkbox') {
    const target = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: target.checked,
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};


  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, selectedOptions } = e.target;
    const values = Array.from(selectedOptions).map((option) => option.value);
    setFormData((prev) => ({ ...prev, [name]: values }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProyecto(formData);
      queryClient.invalidateQueries({ queryKey: ['proyectos'] });
      onClose();
    } catch (error) {
      console.error("Error al agregar proyecto", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="nombre"
        placeholder="Nombre del proyecto"
        value={formData.nombre}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="ubicacion"
        placeholder="Ubicación"
        value={formData.ubicacion}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <label className="block">
        <input
          type="checkbox"
          name="tieneFondos"
          checked={formData.tieneFondos}
          onChange={handleChange}
        />{" "}
        ¿Cuenta con fondos?
      </label>

      <label className="block">
        <input
          type="checkbox"
          name="tieneAliados"
          checked={formData.tieneAliados}
          onChange={handleChange}
        />{" "}
        ¿Cuenta con aliados?
      </label>

      {formData.tieneAliados && (
        <select
          name="aliados"
          multiple
          onChange={handleSelectChange}
          className="w-full p-2 border rounded"
        >
          {aliados?.map((a) => (
            <option key={a.email} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
      )}

      <label className="block">
        <input
          type="checkbox"
          name="tieneVoluntarios"
          checked={formData.tieneVoluntarios}
          onChange={handleChange}
        />{" "}
        ¿Cuenta con voluntarios?
      </label>

      {formData.tieneVoluntarios && (
        <select
          name="voluntarios"
          multiple
          onChange={handleSelectChange}
          className="w-full p-2 border rounded"
        >
          {voluntarios?.map((v) => (
            <option key={v.id} value={v.name}>
              {v.name}
            </option>
          ))}
        </select>
      )}

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Agregar Proyecto
      </button>
    </form>
  );
};

export default AddProyectoForm;
