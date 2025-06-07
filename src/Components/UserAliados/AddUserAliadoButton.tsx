// Components/UserAliados/AddUserAliadoButton.tsx
import { useState } from "react";
import GenericModal from "../GenericModal";
import AddUserAliadoForm from "./AddUserAliadoForm";
import { useAuth } from "../../Context/AuthContext";

const AddUserAliadoButton = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (user?.role !== "Administrador" && user?.role !== "Aliado") return null;

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        + Agregar Aliado
      </button>

      <GenericModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Agregar nuevo Aliado"
      >
        <AddUserAliadoForm onClose={() => setIsModalOpen(false)} />
      </GenericModal>
    </>
  );
};

export default AddUserAliadoButton;