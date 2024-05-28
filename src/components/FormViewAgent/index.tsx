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
      <label className="text-[#181818] text-base font-medium" htmlFor="name">
        Nome
      </label>
      <input
        type="text"
        disabled={true}
        name="name"
        id="name"
        value={agent.name}
        className="block w-full outline-none p-2 cursor-not-allowed rounded-md disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
      />

      <label className="text-[#181818] text-base font-medium" htmlFor="status">
        E-mail
      </label>
      <input
        type="email"
        disabled={true}
        name="email"
        id="email"
        value={agent.email}
        className="block w-full outline-none p-2 cursor-not-allowed rounded-md disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
      />
      <label className="text-[#181818] text-base font-medium" htmlFor="status">
        Status
      </label>
      <input
        type="text"
        disabled={true}
        name="status"
        id="status"
        value={
          agent.status === utils.agentStatusTypes.Active ? "ATIVO" : "INATIVO"
        }
        className="block w-full outline-none p-2 cursor-not-allowed rounded-md disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
      />
    </form>
  );
};

export default FormViewAgent;
