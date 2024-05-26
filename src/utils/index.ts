export const utils = {
  statusCustomerOptions: [
    { value: "WAITING_ATTENDANCE", label: "Aguardando Atendimento" },
    { value: "IN_ATTENDANCE", label: "Em Atendimento" },
    { value: "PROPOSAL_MADE", label: "Proposta Feita" },
    { value: "NOT_CONCLUDED", label: "Não Concluído" },
    { value: "SOLD", label: "Vendido" },
  ],
  agentStatusTypes: {
    Active: "ACTIVO",
    Inactive: "INACTIVE",
  },
  customerStatusTypes: {
    WaitingAttendance: "WAITING_ATTENDANCE",
    InAttendance: "IN_ATTENDANCE",
    ProposalMade: "PROPOSAL_MADE",
    NotConcluded: "NOT_CONCLUDED",
    Sold: "SOLD",
  },
  verifyCustomerStatus: (customerStatus: string) => {
    switch (customerStatus) {
      case utils.customerStatusTypes.WaitingAttendance:
        return "Aguardando Atendimento";
      case utils.customerStatusTypes.InAttendance:
        return "Em Atendimento";
      case utils.customerStatusTypes.ProposalMade:
        return "Proposta Realizada";
      case utils.customerStatusTypes.NotConcluded:
        return "Não Concluído";
      case utils.customerStatusTypes.Sold:
        return "Vendido";
      default:
        return null;
    }
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
