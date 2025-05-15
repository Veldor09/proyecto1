import { useState } from "react";
import GenericModal from "../GenericModal";
import AddAliadoForm from "./AddAliadoForm";

const AddAliadoButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        title="Agregar nuevo aliado"
      >
        <AddAliadoForm onClose={() => setIsModalOpen(false)} />
      </GenericModal>
    </>
  );
};

export default AddAliadoButton;