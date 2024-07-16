import React from "react";
import { Customer } from "../../services/models/Customer";
import { Agent } from "../../services/models/Agent";
import FormUpdateCustomer from "../FormUpdateCustomer";
import FormUpdateAgent from "../FormUpdateAgent";
import Modal from "../Modal";

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
    <Modal
      title={
        isCustomer ? `Editar Cliente #${data.id}` : `Editar Agente #${data.id}`
      }
      isOpen={isOpen}
      onClose={onClose}
    >
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
    </Modal>
  );
};

export default ModalUpdate;
