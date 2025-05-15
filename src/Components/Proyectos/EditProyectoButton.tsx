import { useState } from "react";
import GenericModal from "../GenericModal";
import AddProyectoForm from "./AddProyectoForm";
import { Proyecto } from "../../Services/ProyectosServices";

interface Props {
  proyecto: Proyecto;
}

const EditProyectoButton = ({ proyecto }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-blue-600 hover:underline"
      >
        Editar
      </button>

      <GenericModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Editar proyecto"
      >
        <AddProyectoForm
          onClose={() => setIsModalOpen(false)}
          initialData={proyecto}
          isEdit
        />
      </GenericModal>
    </>
  );
};

export default EditProyectoButton;
