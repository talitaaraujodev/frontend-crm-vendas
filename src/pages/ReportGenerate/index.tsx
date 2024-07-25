import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  formatDistanceToNow,
  format,
  parseISO,
  isValid,
} from "date-fns";
import { utils } from "../../utils";
import { agentService } from "../../services/agentService";
import { customerService } from "../../services/customerService";
import { Customer } from "../../services/models/Customer";

interface AgentOption {
  value: string;
  label: string;
}

const ReportGeneratePage: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [statusCustomer, setStatusCustomer] = useState<string>("");
  const [agent, setAgent] = useState<AgentOption>({ value: "", label: "" });
  const [agentsOptions, setAgentsOptions] = useState<AgentOption[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

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
    const selectedAgent = agentsOptions.find(
      (option) => option.value === e.target.value
    );
    if (selectedAgent) {
      setAgent(selectedAgent);
    }
  };

  const fetchAgents = async () => {
    try {
      const response = await agentService.findAgents();
      const data = response.agents.map((agent: any) => ({
        value: agent.id,
        label: agent.name,
      }));

      setAgentsOptions(data);
    } catch (error) {
      console.error("Error list agents:", error);
    }
  };

  const generatePDF = () => {
    const agentLabel = agent ? agent.label : "Todos";
    const statusLabel = statusCustomer
      ? utils.statusCustomerOptions.find((s) => s.value === statusCustomer)
          ?.label
      : "Todos";

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Relatório de Clientes", 10, 20);

    doc.setFontSize(14);

    let periodText;
    if (startDate && endDate) {
      periodText = `Período: ${format(
        parseISO(startDate),
        "dd/MM/yyyy"
      )} - ${format(parseISO(endDate), "dd/MM/yyyy")}`;
    } else if (startDate) {
      periodText = `Período: ${format(
        parseISO(startDate),
        "dd/MM/yyyy"
      )} - Todos `;
    } else if (endDate) {
      periodText = `Período: Todos - ${format(
        parseISO(endDate),
        "dd/MM/yyyy"
      )}`;
    } else {
      periodText = "Período: Todos";
    }

    doc.text(periodText, 10, 30);
    doc.text(`Agente: ${agentLabel}`, 10, 40);
    doc.text(`Status: ${statusLabel}`, 10, 50);

    const tableColumn = [
      "Cliente",
      "Data de criação",
      "Status",
      "Última atualização",
      "Agente",
    ];

    const tableRows = customers.map((customer: any) => [
      customer.name,
      isValid(new Date(customer.createdAt))
        ? format(new Date(customer.createdAt), "dd/MM/yyyy")
        : "",
      customer.status,
      isValid(new Date(customer.updatedAt))
        ? formatDistanceToNow(new Date(customer.updatedAt), {
            locale: ptBR,
            addSuffix: true,
          })
        : "",
      customer.agent.name,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 60,
    });

    doc.save("relatório_clientes.pdf");
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await customerService.findCustomersToReport(
          startDate,
          endDate,
          statusCustomer,
          agent.value
        );
        setCustomers(response.customers);
      } catch (error) {
        console.error("Error ao listar customers:", error);
      }
    };
    if (startDate || endDate || statusCustomer || agent) {
      fetchCustomers();
    }
  }, [startDate, endDate, statusCustomer, agent]);

  return (
    <div className="container mx-auto p-7">
      <div className="overflow-x-auto shadow-md rounded-md border-2 bg-white p-4">
        <h2 className="text-[#2d5bff] font-semibold text-xl pb-2">
          Gerar Relatório de Clientes
        </h2>
        <form>
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
              value={agent.value}
              onChange={handleAgentChange}
              className="w-full outline-none border border-[#D7D7D7] rounded-md p-2 focus:border-[#2d5bff]"
            >
              <option value="">Todos</option>
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
              <option value="">Todos</option>
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
              type="button"
              onClick={generatePDF}
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
