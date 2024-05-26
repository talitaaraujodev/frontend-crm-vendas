import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Customer } from "../../services/models/Customer";
import { utils } from "../../utils";
import { agentService } from "../../services/agentService";
import { Agent } from "../../services/models/Agent";

interface FormUpdateCustomerProps {
  customer: Customer;
  handleClickUpdate: (customer: Customer) => void;
  onClose: () => void;
}

const FormUpdateCustomer: React.FC<FormUpdateCustomerProps> = ({
  customer,
  handleClickUpdate,
  onClose,
}: FormUpdateCustomerProps) => {
  const [updatedCustomer, setUpdatedCustomer] = useState<Customer>({
    ...customer,
  });
  const [agents, setAgents] = useState<Agent[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: name === "saleValue" ? Number(value) : value,
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedCustomer((prevCustomer) => ({
      ...prevCustomer,
      address: {
        ...prevCustomer.address,
        [name]: value,
      },
    }));
  };

  const handleSaleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUpdatedCustomer((prevCustomer) => ({
      ...prevCustomer,
      saleValue: Number(value),
    }));
  };

  const handleClickUpdateCustomer = () => {
    const data = {
      ...updatedCustomer,
      agentId: updatedCustomer.agent.id,
    };
    handleClickUpdate(data);
    toast.success("Cliente atualizado com sucesso");
    onClose();
  };

  const fetchAgents = async () => {
    try {
      const response = await agentService.findAgents();
      setAgents(response.agents);
    } catch (error) {
      console.error("Error ao listar agentes:", error);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <>
      <form className="flex flex-col items-start p-4">
        <div className="flex flex-col md:flex-row w-full mb-4">
          <div className="md:w-1/2 pr-2">
            <label
              className="py-1 text-[#181818] text-base font-medium"
              htmlFor="name"
            >
              Nome
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={updatedCustomer.name}
              onChange={handleInputChange}
              className="block w-full outline-none border border-[#D7D7D7] rounded-md focus:border-[#2d5bff] p-2"
            />
          </div>
          <div className="md:w-1/2 pl-2">
            <label
              className="py-1 text-[#181818] text-base font-medium"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={updatedCustomer.email}
              onChange={handleInputChange}
              className="block w-full outline-none border border-[#D7D7D7] rounded-md focus:border-[#2d5bff] p-2"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full">
          <div className="md:w-1/2">
            <label
              className="py-1 text-[#181818] text-base font-medium"
              htmlFor="phone"
            >
              Telefone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={utils.maskPhone(updatedCustomer.phone)}
              onChange={handleInputChange}
              className="block w-full outline-none border border-[#D7D7D7] rounded-md focus:border-[#2d5bff] p-2"
            />
          </div>
          <div className="md:w-1/2 pl-2">
            <label
              className="py-1 text-[#181818] text-base font-medium"
              htmlFor="agent"
            >
              Agente
            </label>
            <select
              name="agent"
              id="agent"
              value={updatedCustomer.agent.name}
              onChange={handleInputChange}
              className="block w-full outline-none border border-[#D7D7D7] rounded-md focus:border-[#2d5bff] p-2"
            >
              <option value="">Agente</option>
              {agents.map((agent: any) => (
                <option key={agent.id} value={agent.name}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label
          className="py-1 text-[#181818] text-base font-medium"
          htmlFor="status"
        >
          Status
        </label>
        <select
          name="status"
          id="status"
          value={updatedCustomer.status}
          onChange={handleInputChange}
          className="block w-full outline-none border border-[#D7D7D7] rounded-md focus:border-[#2d5bff] p-2"
        >
          {utils.statusCustomerOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {customer.status === utils.customerStatusTypes.Sold ||
        updatedCustomer.status === utils.customerStatusTypes.Sold ? (
          <div className="flex flex-col py-2 w-full">
            <label
              className="py-1 text-[#181818] text-base font-medium"
              htmlFor="saleValue"
            >
              Valor da Venda
            </label>
            <input
              type="number"
              name="saleValue"
              id="saleValue"
              value={updatedCustomer.saleValue}
              onChange={handleSaleValueChange}
              className="block w-full outline-none border border-[#D7D7D7] rounded-md focus:border-[#2d5bff] p-2"
            />
          </div>
        ) : null}

        <h3 className="py-1 text-[#181818] text-base font-medium">Endereço</h3>
        <div className="flex flex-col py-2">
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="font-medium text-sm pb-2" htmlFor="street">
                Logradouro
              </label>
              <input
                type="text"
                name="street"
                id="street"
                value={updatedCustomer.address.street}
                onChange={handleAddressChange}
                className="block w-full outline-none border border-[#D7D7D7] rounded-md focus:border-[#2d5bff] p-2"
              />
            </div>
            <div className="md:w-1/2 px-3">
              <label className="font-medium text-sm pb-2" htmlFor="number">
                Número
              </label>
              <input
                type="text"
                name="number"
                id="number"
                value={updatedCustomer.address.number}
                onChange={handleAddressChange}
                className="block w-full outline-none border border-[#D7D7D7] rounded-md focus:border-[#2d5bff] p-2"
              />
            </div>

            <div className="md:w-1/2 pl-2">
              <label
                className="py-1 text-[#181818] text-base font-medium"
                htmlFor="zipccode"
              >
                CEP
              </label>
              <input
                type="text"
                name="zipcode"
                id="zipcode"
                value={utils.maskCEP(updatedCustomer.address.zipcode)}
                onChange={handleAddressChange}
                className="block w-full outline-none border border-[#D7D7D7] rounded-md focus:border-[#2d5bff] p-2"
              />
            </div>
          </div>

          <div className="-mx-3 md:flex mb-2">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="font-medium text-sm mb-2" htmlFor="bairro">
                Bairro
              </label>
              <input
                type="text"
                name="bairro"
                id="bairro"
                value={updatedCustomer.address.bairro}
                onChange={handleAddressChange}
                className="block w-full outline-none border border-[#D7D7D7] rounded-md focus:border-[#2d5bff] p-2"
              />
            </div>
            <div className="md:w-1/2 px-3">
              <label className="font-medium text-sm pb-2" htmlFor="city">
                Cidade
              </label>
              <input
                type="text"
                name="city"
                id="city"
                value={updatedCustomer.address.city}
                onChange={handleAddressChange}
                className="block w-full outline-none border border-[#D7D7D7] rounded-md focus:border-[#2d5bff] p-2"
              />
            </div>
            <div className="md:w-1/2 px-3">
              <label className="font-medium text-sm pb-2" htmlFor="complement">
                Complemento
              </label>
              <input
                type="text"
                name="complement"
                id="complement"
                value={updatedCustomer.address.complement}
                onChange={handleAddressChange}
                className="block w-full outline-none border border-[#D7D7D7] rounded-md focus:border-[#2d5bff] p-2"
              />
            </div>
          </div>
        </div>
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
          onClick={handleClickUpdateCustomer}
        >
          Salvar
        </button>
      </div>
    </>
  );
};

export default FormUpdateCustomer;
