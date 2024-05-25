import React, { useEffect, useState } from "react";
import Thead from "../../components/Thead";
import Tbody from "../../components/Tbody";
import ModalConfirmRemove from "../../components/ModalConfirmDelete";
import { Customer } from "../../services/models/Customer";
import ModalView from "../../components/ModalView";
import ModalUpdate from "../../components/ModalUpdate";
import { customerService } from "../../services/customerService";
import { utils } from "../../utils";
import { toast } from "sonner";

const ListCustomersPage: React.FC = () => {
  const [customerSelected, setCustomerSelected] = useState<Customer>({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: {
      zipcode: "",
      street: "",
      number: "",
      bairro: "",
      city: "",
      complement: "",
    },
    agent: {
      id: "",
      name: "",
    },
    status: "",
  });
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [confirmRemoveModalOpen, setConfirmRemoveModalOpen] =
    useState<boolean>(false);
  const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  function openConfirmRemoveModal(id: string) {
    setId(id);
    setConfirmRemoveModalOpen(true);
  }
  function closeConfirmRemoveModal() {
    setConfirmRemoveModalOpen(false);
  }
  function openViewModal(data: Customer) {
    setCustomerSelected(data);
    setViewModalOpen(true);
  }
  async function closeViewModal() {
    setViewModalOpen(false);
  }
  function openUpdateModal(data: Customer) {
    setCustomerSelected(data);
    setUpdateModalOpen(true);
  }
  async function closeUpdateModal() {
    setUpdateModalOpen(false);
  }
  const handleRemoveCustomer = async () => {
    await customerService
      .deleteCustomer(id)
      .then(() => {
        toast.success("Cliente apagado com sucesso!");
        fetchCustomers();
      })
      .catch((error) => {
        toast.error("Ocorreram erros internos ao enviar sua solicitação.");
        console.error("Error list users:", error);
      });
  };

  const handleUpdateCustomer = async (customerUpdated: Customer) => {
    await customerService
      .updateCustomer(customerUpdated.id, customerUpdated)
      .then((response) => {
        if (response.errors) {
          toast.error(response.errors[0]);
          return;
        } else {
          toast.success("Cliente atualizado com sucesso!");
          fetchCustomers();
        }
      })
      .catch((error) => {
        console.error("Error ao atualizar cliente:", error);
        toast.error("Ocorreram erros internos ao enviar sua solicitação.");
      });
  };

  const headers: string[] = [
    "#",
    "Nome",
    "E-mail",
    "Telefone",
    "Agente",
    "Status",
    "Ações",
  ];

  const fetchCustomers = async () => {
    try {
      const response = await customerService.findCustomers();
      console.log(response);
      setCustomers(response.customers);
    } catch (error) {
      console.error("Error ao listar customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const data: (string | React.ReactNode)[][] = customers.map((customer) => [
    customer.id,
    customer.name,
    customer.email,
    utils.maskPhone(customer.phone),
    customer.agent.name,
    <p
      className={`inline-block ${
        customer.status === utils.customerStatusTypes.Sold
          ? "bg-green-100 text-green-700"
          : customer.status === utils.customerStatusTypes.NotConcluded
          ? "bg-red-100 text-red-700"
          : "bg-yellow-100 text-yellow-700"
      } text-sm rounded-2xl py-[0.50rem] px-2.5`}
    >
      {utils.verifyCustomerStatus(customer.status)}
    </p>,
    <div className="flex items-center space-x-1">
      <button
        type="button"
        title="Editar cliente"
        className="uppercase text-[#0062B7] hover:underline transition-all font-normal text-sm"
        onClick={() => openUpdateModal(customer)}
      >
        EDITAR
      </button>
      <span className="text-sm font-medium text-[#181818]">/</span>
      <button
        type="button"
        title="Apagar cliente"
        className="uppercase text-[#0062B7] hover:underline transition-all font-normal text-sm"
        onClick={() => openConfirmRemoveModal(customer.id)}
      >
        APAGAR
      </button>
      <span className="text-sm font-medium text-[#181818]">/</span>
      <button
        type="button"
        title="Ver cliente"
        className="uppercase text-[#0062B7] hover:underline transition-all font-normal text-sm"
        onClick={() => openViewModal(customer)}
      >
        VER
      </button>
    </div>,
  ]);

  return (
    <div className="container mx-auto p-7">
      <div className="overflow-x-auto shadow-lg rounded-md border-2">
        <table className="min-w-full">
          <Thead headers={headers} title="Clientes" />
          <Tbody data={data} />
        </table>
      </div>

      <ModalConfirmRemove
        titleRemove="cliente"
        isOpen={confirmRemoveModalOpen}
        onClose={closeConfirmRemoveModal}
        id={id}
        handleClickRemove={handleRemoveCustomer}
      />
      <ModalView
        isOpen={viewModalOpen}
        onClose={closeViewModal}
        data={customerSelected}
      />
      <ModalUpdate
        isOpen={updateModalOpen}
        onClose={closeUpdateModal}
        data={customerSelected}
        handleClickUpdate={handleUpdateCustomer}
      />
    </div>
  );
};

export default ListCustomersPage;
