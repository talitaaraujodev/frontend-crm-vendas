import React, { useState } from "react";
import { Agent } from "../../services/models/Agent";
import { toast } from "sonner";
import { utils } from "../../utils";

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
  const [email, setEmail] = useState(agent.email);
  const [status, setStatus] = useState(
    agent.status === utils.agentStatusTypes.Active ? "ATIVO" : "INATIVO"
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleClickUpdateAgent = async () => {
    const updatedAgent = {
      ...agent,
      name,
      email,
      status: status === utils.agentStatusTypes.Active ? "ACTIVE" : "INACTIVE",
    } as Agent;

    handleClickUpdate(updatedAgent);
    toast.success("Agente atualizado com sucesso");
    onClose();
  };

  return (
    <>
      <form className="flex flex-col items-start p-4">
        <label htmlFor="name" className="font-medium text-base py-2">
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
        <label htmlFor="email" className="font-medium text-base py-2">
          E-mail
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className="w-full outline-none border border-[#D7D7D7] rounded-md p-2 focus:border-[#2d5bff]"
        />

        <label htmlFor="status" className="font-medium text-base py-2">
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
          className="font-normal bg-white transition-all text-gray-400 py-2 px-4 rounded-md hover:opacity-80"
        >
          Cancelar
        </button>
        <button
          className="bg-[#2d5bff] text-white font-normal rounded-md py-2 px-3 hover:opacity-80 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-75"
          type="button"
          onClick={handleClickUpdateAgent}
          disabled={!name || !email || !status}
        >
          Salvar
        </button>
      </div>
    </>
  );
};

export default FormUpdateAgent;
