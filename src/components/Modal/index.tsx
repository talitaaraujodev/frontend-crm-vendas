import { X } from "lucide-react";
import React, { ReactNode } from "react";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="fixed inset-0 bg-[#6a6e75bf] bg-opacity-75 transition-opacity"
          onClick={onClose}
        />
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-3xl w-full">
          <div className="bg-[#0062B7] px-4 py-3 flex justify-between items-center">
            <h2 className="text-lg font-medium text-white ">{title}</h2>
            <button type="button" onClick={onClose}>
              <X
                color="#ffff"
                className="hover:cursor-pointer hover:opacity-85 transition-all"
                size={25}
              />
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
