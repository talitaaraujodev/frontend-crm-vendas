import { X } from "lucide-react";
import { Customer } from "../../services/models/Customer";
import { Agent } from "../../services/models/Agent";
import FormUpdateCustomer from "../FormUpdateCustomer";
import FormUpdateAgent from "../FormUpdateAgent";

type DataType = Customer | Agent;

interface ModalUpdateProps {
  data: DataType;
  isOpen: boolean;
  onClose: () => void;
  handleClickUpdate: (data: any) => void;
}

const ModalUpdate: React.FC<ModalUpdateProps> = ({
  data,
  isOpen,
  onClose,
  handleClickUpdate,
}: ModalUpdateProps) => {
  if (!isOpen || !data) return null;

  function verifyIsCustomer(data: DataType): data is Customer {
    return "agent" in data;
  }
  const isCustomer = verifyIsCustomer(data);

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="fixed inset-0 bg-[#6a6e75bf] bg-opacity-75 transition-opacity"
          onClick={onClose}
        />
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-3xl w-full">
          <div className="bg-[#0062B7] px-4 py-3 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white ">
              {isCustomer
                ? `Editar Cliente #${data.id}`
                : `Editar Agente #${data.id}`}
            </h2>
            <button type="button" onClick={() => onClose()}>
              <X
                color="#ffff"
                className="hover:cursor-pointer hover:opacity-85 transition-all"
                size={25}
              />
            </button>
          </div>

          {isCustomer ? (
            <FormUpdateCustomer
              customer={data}
              onClose={onClose}
              handleClickUpdate={handleClickUpdate}
            />
          ) : (
            <FormUpdateAgent
              agent={data}
              onClose={onClose}
              handleClickUpdate={handleClickUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalUpdate;
