import { useState } from "react";
import GenericModal from "../GenericModal";
import AddVoluntarioForm from "./AddVoluntarioForm";

const AddVoluntarioButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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