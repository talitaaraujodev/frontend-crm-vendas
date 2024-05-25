import React, { useState } from "react";
import { Agent } from "../../services/models/Agent";
import { toast } from "sonner";

interface FormUpdateAgentProps {
  agent: Agent;
  handleClickUpdate: (agent: Agent) => void;
  onClose: () => void;
}

const FormUpdateAgent: React.FC<FormUpdateAgentProps> = ({
  agent,
  handleClickUpdate,
  onClose,
}: FormUpdateAgentProps) => {
  const [name, setName] = useState(agent.name);
  const [status, setStatus] = useState(
    agent.status === "ACTIVE" ? "ATIVO" : "INATIVO"
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleClickUpdateAgent = async () => {
    const updatedAgent = {
      ...agent,
      name,
      status: status === "ATIVO" ? "ACTIVE" : "INACTIVE",
    } as Agent;

    await handleClickUpdate(updatedAgent);
    toast.success("Agente atualizado com sucesso");
    onClose(); // Fechar modal após atualização
  };

  return (
    <>
      <form className="flex flex-col items-start p-4">
        <label htmlFor="name" className="font-medium text-base pb-2">
          Nome
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleNameChange}
          className="w-full outline-none border border-[#D7D7D7] rounded-md p-2 focus:border-[#2d5bff]"
        />

        <label htmlFor="status" className="font-medium text-base pb-2">
          Status
        </label>
        <select
          name="status"
          id="status"
          value={status}
          onChange={handleStatusChange}
          className="w-full outline-none border border-[#D7D7D7] rounded-md p-2 focus:border-[#2d5bff]"
        >
          <option value="ATIVO">Ativo</option>
          <option value="INATIVO">Inativo</option>
        </select>
      </form>
      <div className="flex justify-end p-2 border-t mt-1">
        <button
          type="button"
          onClick={onClose}
          className="font-medium bg-white transition-all text-[#2d5bff] py-2 px-4 rounded-md hover:opacity-80"
        >
          Cancelar
        </button>
        <button
          className="bg-[#2d5bff] text-white font-normal rounded-md py-2 px-3 hover:opacity-80 transition-all cursor-pointer"
          type="button"
          onClick={handleClickUpdateAgent}
        >
          Salvar
        </button>
      </div>
    </>
  );
};

export default FormUpdateAgent;
