export const utils = {
  statusCustomerOptions: [
    { value: "Aguardando Atendimento", label: "Aguardando Atendimento" },
    { value: "Em Atendimento", label: "Em Atendimento" },
    { value: "Proposta Feita", label: "Proposta Feita" },
    { value: "Não Concluído", label: "Não Concluído" },
    { value: "Vendido", label: "Vendido" },
  ],
  agentStatusTypes: {
    Active: "ACTIVE",
    Inactive: "INACTIVE",
  },
  customerStatusTypes: {
    WaitingAttendance: "Aguardando Atendimento",
    InAttendance: "Em Atendimento",
    ProposalMade: "Proposta Feita",
    NotConcluded: "Não Concluído",
    Sold: "Vendido",
  },
  maskCEP: (value: string) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    return value;
  },
  maskPhone: (value: string) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
  },

  maskCurrency(value: number) {
    if (isNaN(value)) {
      value = 0;
    }

    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  },
};
