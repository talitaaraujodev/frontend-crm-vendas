import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { utils } from "../../utils";
import { Agent } from "http";
import { agentService } from "../../services/agentService";

const ReportGeneratePage: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [statusCustomer, setStatusCustomer] = useState<string>("");
  const [agent, setAgent] = useState<string>("");
  const [agentsOptions, setAgentsOptions] = useState<Agent[]>([]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusCustomer(e.target.value);
  };

  const handleAgentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAgent(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ startDate, endDate, statusCustomer, agent });
  };

  const fetchAgents = async () => {
    try {
      const response = await agentService.findAgents();
      const data = response.agents.map((agent: any) => {
        return {
          value: agent.value,
          label: agent.name,
        };
      });

      setAgentsOptions(data);
    } catch (error) {
      console.error("Error list users:", error);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="container mx-auto p-7">
      <div className="overflow-x-auto shadow-md rounded-md border-2 bg-white p-4">
        <h2 className="text-[#2d5bff] font-semibold text-xl pb-2">
          Gerar Relatório de Clientes
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="startDate" className="font-medium text-base py-2">
              Período
            </label>
            <div className="flex items-center justify-start space-x-3">
              <div className="relative max-w-sm">
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={startDate}
                  onChange={handleStartDateChange}
                  className="bg-white text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 border border-[#D7D7D7]"
                />
              </div>
              <span className="text-[#181818] lowercase font-medium text-base">
                -
              </span>
              <div className="relative max-w-sm">
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={endDate}
                  onChange={handleEndDateChange}
                  className="bg-white text-gray-900 text-sm rounded-lg w-full p-2.5 border border-[#D7D7D7]"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="agent" className="font-medium text-base py-2">
              Agente
            </label>
            <select
              name="agent"
              id="agent"
              value={agent}
              onChange={handleAgentChange}
              className="w-full outline-none border border-[#D7D7D7] rounded-md p-2 focus:border-[#2d5bff]"
            >
              {agentsOptions.map((agentOption: any) => (
                <option key={agentOption.value} value={agentOption.value}>
                  {agentOption.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="statusCustomer"
              className="font-medium text-base py-2"
            >
              Status
            </label>
            <select
              name="statusCustomer"
              id="statusCustomer"
              value={statusCustomer}
              onChange={handleStatusChange}
              className="w-full outline-none border border-[#D7D7D7] rounded-md p-2 focus:border-[#2d5bff]"
            >
              {utils.statusCustomerOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-start pt-6">
            <button
              className="flex items-center bg-[#2d5bff] text-white font-normal rounded-md py-2 px-3 hover:opacity-80 transition-all cursor-pointer"
              type="submit"
            >
              Gerar relatório
              <Download color="#fff" className="ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportGeneratePage;
