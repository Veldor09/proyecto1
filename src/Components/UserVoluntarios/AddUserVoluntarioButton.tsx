// Components/UserVoluntarios/AddUserVoluntarioButton.tsx
import { useState } from "react";
import GenericModal from "../GenericModal";
import AddUserVoluntarioForm from "./AddUserVoluntarioForm";
import { useAuth } from "../../Context/AuthContext";

const AddUserVoluntarioButton = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (user?.role !== "Administrador" && user?.role !== "Voluntario") return null;

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        + Agregar Voluntario
      </button>

      <GenericModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Agregar nuevo Voluntario"
      >
        <AddUserVoluntarioForm onClose={() => setIsModalOpen(false)} />
      </GenericModal>
    </>
  );
};

export default AddUserVoluntarioButton;