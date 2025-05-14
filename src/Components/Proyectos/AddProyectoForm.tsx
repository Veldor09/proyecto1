import { useState, useEffect } from "react";
import { addProyecto } from "../../Services/ProyectosServices";
import { useQueryClient } from "@tanstack/react-query";
import { useAliados } from "../../Services/AliadosServices";
import { useVoluntarios } from "../../Services/VoluntariosServices";

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
  const { data: aliados } = useAliados();
  const { data: voluntarios } = useVoluntarios();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, selectedOptions } = e.target;
    const values = Array.from(selectedOptions).map((option) => option.value);
    setFormData((prev) => ({ ...prev, [name]: values }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProyecto(formData);
      queryClient.invalidateQueries(['proyectos']);
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
        /> ¿Cuenta con fondos?
      </label>

      <label className="block">
        <input
          type="checkbox"
          name="tieneAliados"
          checked={formData.tieneAliados}
          onChange={handleChange}
        /> ¿Cuenta con aliados?
      </label>

      {formData.tieneAliados && (
        <select
          name="aliados"
          multiple
          onChange={handleSelectChange}
          className="w-full p-2 border rounded"
        >
          {aliados?.map((a, i) => (
            <option key={i} value={a.name}>{a.name}</option>
          ))}
        </select>
      )}

      <label className="block">
        <input
          type="checkbox"
          name="tieneVoluntarios"
          checked={formData.tieneVoluntarios}
          onChange={handleChange}
        /> ¿Cuenta con voluntarios?
      </label>

      {formData.tieneVoluntarios && (
        <select
          name="voluntarios"
          multiple
          onChange={handleSelectChange}
          className="w-full p-2 border rounded"
        >
          {voluntarios?.map((v, i) => (
            <option key={i} value={v.name}>{v.name}</option>
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
