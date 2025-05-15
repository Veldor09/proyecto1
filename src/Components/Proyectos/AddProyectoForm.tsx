import { useState } from "react";
import { addProyecto, updateProyecto } from "../../Services/ProyectosServices";
import { useQueryClient } from "@tanstack/react-query";
import { useAliados } from "../../Services/AliadosServices";
import { useVoluntarios } from "../../Services/VoluntariosServices";

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

interface Proyecto {
  id: string;
  nombre: string;
  ubicacion: string;
  tieneFondos: boolean;
  tieneAliados: boolean;
  aliados: string[];
  tieneVoluntarios: boolean;
  voluntarios: string[];
  hidden?: boolean;
}

interface Props {
  onClose: () => void;
  initialData?: Proyecto;
  isEdit?: boolean;
}

const AddProyectoForm = ({ onClose, initialData, isEdit }: Props) => {
  const [formData, setFormData] = useState<Proyecto>(
    initialData || {
      id: crypto.randomUUID(),
      nombre: "",
      ubicacion: "",
      tieneFondos: false,
      tieneAliados: false,
      aliados: [],
      tieneVoluntarios: false,
      voluntarios: [],
      hidden: false,
    }
  );

  const queryClient = useQueryClient();

  const { data: aliados } = useAliados() as { data: Aliado[] };
  const { data: voluntarios } = useVoluntarios() as { data: Voluntario[] };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, selectedOptions } = e.target;
    const values = Array.from(selectedOptions).map((option) => option.value);
    setFormData((prev) => ({ ...prev, [name]: values }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateProyecto(formData);
      } else {
        await addProyecto(formData);
      }

      queryClient.invalidateQueries({ queryKey: ["proyectos"] });
      onClose();
    } catch (error) {
      console.error("Error al guardar proyecto", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
    >
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

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="tieneFondos"
          checked={formData.tieneFondos}
          onChange={handleChange}
        />
        <span>¿Cuenta con fondos?</span>
      </label>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="tieneAliados"
          checked={formData.tieneAliados}
          onChange={handleChange}
        />
        <span>¿Cuenta con aliados?</span>
      </label>

      {formData.tieneAliados && (
        <select
          name="aliados"
          multiple
          onChange={handleSelectChange}
          value={formData.aliados}
          className="md:col-span-2 w-full p-2 border rounded"
        >
          {aliados?.map((a) => (
            <option key={a.email} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
      )}

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="tieneVoluntarios"
          checked={formData.tieneVoluntarios}
          onChange={handleChange}
        />
        <span>¿Cuenta con voluntarios?</span>
      </label>

      {formData.tieneVoluntarios && (
        <select
          name="voluntarios"
          multiple
          onChange={handleSelectChange}
          value={formData.voluntarios}
          className="md:col-span-2 w-full p-2 border rounded"
        >
          {voluntarios?.map((v) => (
            <option key={v.id} value={v.name}>
              {v.name}
            </option>
          ))}
        </select>
      )}

      <div className="md:col-span-2 flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          {isEdit ? "Guardar Cambios" : "Agregar Proyecto"}
        </button>
      </div>
    </form>
  );
};

export default AddProyectoForm;
