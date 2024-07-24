import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { ptBR } from "date-fns/locale";
import { Agent } from "../../services/models/Agent";
import Thead from "../../components/Thead";
import Tbody from "../../components/Tbody";
import ModalConfirmRemove from "../../components/ModalConfirmDelete";
import ModalView from "../../components/ModalView";
import ModalUpdate from "../../components/ModalUpdate";
import { agentService } from "../../services/agentService";
import { utils } from "../../utils";
import Pagination from "../../components/Pagination";

const ListAgentsPage: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [agentSelected, setAgentSelected] = useState<Agent>({
    id: "",
    email: "",
    name: "",
    status: "ACTIVE",
    createdAt: new Date(),
  });

  const [confirmRemoveModalOpen, setConfirmRemoveModalOpen] =
    useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  function openConfirmRemoveModal(id: string) {
    setId(id);
    setConfirmRemoveModalOpen(true);
  }
  function closeConfirmRemoveModal() {
    setConfirmRemoveModalOpen(false);
  }

  function openViewModal(data: Agent) {
    setAgentSelected(data);
    setViewModalOpen(true);
  }
  async function closeViewModal() {
    setViewModalOpen(false);
  }

  function openUpdateModal(data: Agent) {
    setAgentSelected(data);
    setUpdateModalOpen(true);
  }
  async function closeUpdateModal() {
    setUpdateModalOpen(false);
  }

  const handleRemoveAgent = async () => {
    await agentService
      .deleteAgent(id)
      .then(() => {
        toast.success("Agente apagado com sucesso!");
        fetchAgents();
      })
      .catch((error) => {
        toast.error("Ocorreram erros internos ao enviar sua solicitação.");
        console.error("Error list users:", error);
      });
  };

  const handleUpdateAgent = async (agentUpdated: Agent) => {
    await agentService
      .updateAgent(agentSelected.id, agentUpdated)
      .then((response) => {
        if (response.errors) {
          toast.error(response.errors[0]);
          return;
        } else {
          toast.success("Agente atualizado com sucesso!");
          fetchAgents();
        }
      })
      .catch((error) => {
        console.error("Error ao atualizar agente:", error);
        toast.error("Ocorreram erros internos ao enviar sua solicitação.");
      });
  };

  const handleSearchChange = (query: string) => {
    setSearch(query);
    fetchAgents(query);
  };

  const fetchAgents = async (query: string = "", page: number = 1) => {
    try {
      const LIMIT = 10;
      const response = await agentService.findAgents(query, LIMIT, page);
      console.log("total ", response.total);
      console.log(" response", response);
      setTotalPages(
        response.total !== 1 ? Math.ceil(response.total / LIMIT) : 1
      );
      setAgents(response.agents);
    } catch (error) {
      console.error("Error ao listar agentes:", error);
    }
  };

  useEffect(() => {
    fetchAgents(search, currentPage);
  }, [currentPage, search]);

  const headers: string[] = [
    "#",
    "Nome",
    "E-mail",
    "Status",
    "Criado há",
    "Ações",
  ];

  const data = agents.map((agent) => [
    agent.id,
    agent.name,
    agent.email,
    <p
      className={`inline-block text-sm rounded-2xl py-[0.40rem] px-2.5 ${
        agent.status === utils.agentStatusTypes.Active
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {agent.status === utils.agentStatusTypes.Active ? "Ativo" : "Inativo"}
    </p>,
    formatDistanceToNow(agent.createdAt, { locale: ptBR, addSuffix: true }),

    <div className="flex items-center space-x-1">
      <button
        type="button"
        title="Editar agente"
        className="uppercase text-[#0062B7] hover:underline transition-all font-normal text-sm"
        onClick={() => openUpdateModal(agent)}
      >
        EDITAR
      </button>
      <span className="text-sm font-medium text-[#181818]">/</span>
      <button
        type="button"
        title="Apagar agente"
        className="uppercase text-[#0062B7] hover:underline transition-all font-normal text-sm"
        onClick={() => openConfirmRemoveModal(agent.id)}
      >
        APAGAR
      </button>
    </div>,
  ]);

  return (
    <div className="container mx-auto px-7 py-3.5">
      <div className="overflow-x-auto shadow-lg rounded-md border-2 bg-white">
        <table className="min-w-full">
          <Thead
            headers={headers}
            title="Agentes"
            search={search}
            onChangeSearch={handleSearchChange}
          />
          <Tbody
            data={data}
            openViewModal={(agentId) => {
              const selectedAgent = agents.find(
                (agent) => agent.id === agentId
              );
              if (selectedAgent) openViewModal(selectedAgent);
            }}
          />
        </table>
        {agents.length > 0 ? (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        ) : null}
      </div>
      <ModalConfirmRemove
        titleRemove="agente"
        isOpen={confirmRemoveModalOpen}
        onClose={closeConfirmRemoveModal}
        id={id}
        handleClickRemove={handleRemoveAgent}
      />

      <ModalView
        isOpen={viewModalOpen}
        onClose={closeViewModal}
        data={agentSelected}
      />
      <ModalUpdate
        handleClickUpdate={handleUpdateAgent}
        isOpen={updateModalOpen}
        onClose={closeUpdateModal}
        data={agentSelected}
      />
    </div>
  );
};

export default ListAgentsPage;
