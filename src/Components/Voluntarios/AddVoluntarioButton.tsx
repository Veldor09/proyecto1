import { useState } from "react";
import GenericModal from "../GenericModal";
import AddVoluntarioForm from "./AddVoluntarioForm";
import { useAuth } from "../../Context/AuthContext"; // 👈

const AddVoluntarioButton = () => {
  const { user } = useAuth(); // 👈
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (user?.role !== "admin" && user?.role !== "voluntario") return null; // ⛔ No permitido

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
        title="Agregar nuevo voluntario"
      >
        <AddVoluntarioForm onClose={() => setIsModalOpen(false)} />
      </GenericModal>
    </>
  );
};

export default AddVoluntarioButton;