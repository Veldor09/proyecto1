import { useState } from "react";
import GenericModal from "../GenericModal";
import AddVoluntarioForm from "./AddVoluntarioForm";

interface Props {
  voluntario: {
    id: string;
    name: string;
    email: string;
    role: string;
    hidden?: boolean;
  };
}

const EditVoluntarioButton = ({ voluntario }: Props) => {
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
        title="Editar voluntario"
      >
        <AddVoluntarioForm
          onClose={() => setIsModalOpen(false)}
          initialData={voluntario}
          isEdit
        />
      </GenericModal>
    </>
  );
};

export default EditVoluntarioButton;
