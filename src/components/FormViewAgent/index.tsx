import React from "react";
import { Agent } from "../../services/models/Agent";
import { utils } from "../../utils";

interface FormViewAgentProps {
  agent: Agent;
}
const FormViewAgent: React.FC<FormViewAgentProps> = ({
  agent,
}: FormViewAgentProps) => {
  return (
    <form className="flex flex-col items-start p-4" action="get">
      <label className="text-[#181818] text-base font-medium pb-1" htmlFor="name">
        Nome
      </label>
      <input
        type="text"
        disabled={true}
        name="name"
        id="name"
        value={agent.name}
        className="block w-full outline-none  p-2  cursor-not-allowed rounded-md font-normal disabled:bg-gray-100  disabled:text-slate-400 disabled:border-slate-200"
      />

      <label className="text-[#181818] text-base font-medium pb-1" htmlFor="status">
        E-mail
      </label>
      <input
        type="email"
        disabled={true}
        name="email"
        id="email"
        value={agent.email}
        className="block w-full outline-none p-2 cursor-not-allowed rounded-md font-normal disabled:bg-gray-100  disabled:text-slate-400 disabled:border-slate-200"
      />
      <label className="text-[#181818] text-base font-medium pb-1" htmlFor="status">
        Status
      </label>
      <span className="block  outline-none bg-green-100 text-green-700 mt-1 rounded-full capitalize min-w-16 py-1.5 text-sm text-center">
        {agent.status === utils.agentStatusTypes.Active ? "Ativo" : "Inativo"}
      </span>
    </form>
  );
};

export default FormViewAgent;
