import { X } from "lucide-react";

interface ModalConfirmRemoveProps {
  titleRemove: string;
  id: string;
  isOpen: boolean;
  onClose: () => void;
  handleClickRemove: (id: string) => void;
}
const ModalConfirmRemove = ({
  titleRemove,
  id,
  isOpen,
  onClose,
  handleClickRemove,
}: ModalConfirmRemoveProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="fixed inset-0 bg-[#6a6e75bf] bg-opacity-75 transition-opacity"
          onClick={onClose}
        />
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
          <div className="flex items-center justify-end p-2">
            <button
              type="button"
              className="cursor-pointer hover:bg-gray-100 rounded-full p-1 transition-all"
              onClick={onClose}
            >
              <X color="#9ca3af" size={25} />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center px-2 py-4">
            <h2 className="text-center font-medium text-xl md:text-xl ">
              Tem certeza que deseja apagar esse {titleRemove}?
            </h2>
            <span className="text-center text-base font-normal py-2">
              Para prosseguir clique no botão "Sim, apagar"
            </span>
          </div>
          <div className="w-full border-b" />
          <div className="flex justify-end items-center  p-3">
            <button
              type="button"
              onClick={onClose}
              className="font-medium bg-white transition-all text-[#2d5bff] py-2 px-4 rounded-md hover:opacity-80"
            >
              Cancelar
            </button>
            <button
              className="bg-[#2d5bff] text-white py-2 px-4 rounded hover:opacity-90 hover:cursor-pointer transition-all"
              onClick={() => {
                handleClickRemove(id);
                onClose();
              }}
            >
              Sim, apagar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalConfirmRemove;
