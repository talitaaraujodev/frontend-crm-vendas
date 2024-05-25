import { X } from "lucide-react";
import { Customer } from "../../services/models/Customer";
import { Agent } from "../../services/models/Agent";
import FormViewCustomer from "../FormViewCustomer";
import FormViewAgent from "../FormViewAgent";

type DataType = Customer | Agent;

interface ModalViewProps {
  data: DataType;
  isOpen: boolean;
  onClose: () => void;
}

const ModalView: React.FC<ModalViewProps> = ({
  data,
  isOpen,
  onClose,
}: ModalViewProps) => {
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
                ? `Visualizar Cliente #${data.id}`
                : `Visualizar Agente #${data.id}`}
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
            <FormViewCustomer customer={data} />
          ) : (
            <FormViewAgent agent={data} />
          )}

          <div className="flex justify-end p-2">
            <button
              type="button"
              onClick={onClose}
              className="font-medium bg-white transition-all text-[#2d5bff] py-2 px-4 rounded-md hover:opacity-80"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalView;
