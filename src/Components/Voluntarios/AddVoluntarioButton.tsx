import { useState } from "react";
import GenericModal from "../GenericModal";
import AddVoluntarioForm from "./AddVoluntarioForm";
import { useAuth } from "../../Context/AuthContext";

const AddVoluntarioButton = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Solo Administradores y Voluntarios pueden ver este botón
  if (user?.role !== "Administrador") return null;

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={handleOpen}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        + Agregar Voluntario
      </button>

      <GenericModal
        isOpen={isModalOpen}
        onClose={handleClose}
        title="Agregar nuevo voluntario"
      >
        <AddVoluntarioForm onClose={handleClose} />
      </GenericModal>
    </>
  );
};

export default AddVoluntarioButton;
