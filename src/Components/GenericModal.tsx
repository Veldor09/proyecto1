import { ReactNode } from "react";

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const GenericModal = ({ isOpen, onClose, title, children }: GenericModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2x1 mx-4 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>

        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

        {children}
      </div>
    </div>
  );
};

export default GenericModal;
