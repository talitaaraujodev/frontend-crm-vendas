import Modal from "../Modal";

interface ModalConfirmRemoveProps {
  titleRemove: string;
  id: string;
  isOpen: boolean;
  onClose: () => void;
  handleClickRemove: (id: string) => void;
}

const ModalConfirmRemove: React.FC<ModalConfirmRemoveProps> = ({
  titleRemove,
  id,
  isOpen,
  onClose,
  handleClickRemove,
}: ModalConfirmRemoveProps) => {
  if (!isOpen) return null;

  return (
    <Modal
      title={`Tem certeza que deseja apagar esse ${titleRemove}?`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex flex-col items-center justify-start px-2 py-4">
        <span className="text-base font-normal py-3">
          Essa ação apagará permanentemente. Para prosseguir, clique no botão
          "Sim, apagar"
        </span>
      </div>
      <div className="w-full border-b" />
      <div className="flex justify-end items-center p-3 space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="font-normal bg-white transition-all text-gray-400 py-2 px-4 rounded-md hover:opacity-80"
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
    </Modal>
  );
};

export default ModalConfirmRemove;
