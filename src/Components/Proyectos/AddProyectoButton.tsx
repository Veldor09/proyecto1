import { useState } from "react";
import GenericModal from "../GenericModal";
import AddProyectoForm from "./AddProyectoForm";
import { useAuth } from "../../Context/AuthContext";

const AddProyectoButton = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  //  Ocultar botón si no es admin
  if (user?.role !== "Administrador") return null;

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        + Agregar Proyecto
      </button>

      <GenericModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Agregar nuevo proyecto"
      >
        <AddProyectoForm onClose={() => setIsModalOpen(false)} />
      </GenericModal>
    </>
  );
};

export default AddProyectoButton;