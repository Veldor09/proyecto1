import { ReactNode } from "react";

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const GenericModal = ({ isOpen, onClose, title, children }: GenericModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-xl"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default GenericModal;
