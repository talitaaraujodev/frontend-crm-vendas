import React, { KeyboardEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Customer } from "../../services/models/Customer";
import { utils } from "../../utils";
import { agentService } from "../../services/agentService";
import { Agent } from "../../services/models/Agent";
import { CurrencyInput } from "react-currency-mask";
interface FormUpdateCustomerProps {
  customer: Customer;
  handleClickUpdate: (customer: Customer) => void;
  onClose: () => void;
}

const CustomInput = React.forwardRef<HTMLInputElement, any>((props, ref) => (
  <input
    {...props}
    ref={ref}
    className="block w-full outline-none border border-[#D7D7D7] rounded-md focus:border-[#2d5bff] p-2"
    placeholder="R$ 0,00"
  />
));

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
      [name]: name === "agent" ? { id: value } : value,
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
      const response = await agentService.findAgents("", 20);
      setAgents(response.agents);
    } catch (error) {
      console.error("Error ao listar agentes:", error);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleSearchAddressByCEP = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_API_CEP}${
          updatedCustomer.address.zipcode
        }/json`,
        {
          method: "GET",
          headers: { "content-type": "application/json" },
          mode: "cors",
        }
      );

      const result = await response.json();
      if (response.ok) {
        setUpdatedCustomer({
          ...customer,
          address: {
            ...customer.address,
            street: result.logradouro,
            bairro: result.bairro,
            zipcode: result.cep,
          },
        });
      } else {
        toast.error(
          "CEP não foi encontrado, verifique o CEP e tente novamente."
        );
        clearAddress();
      }
    } catch (error) {
      toast.error("CEP está inválido, verifique o CEP e tente novamente.");
      clearAddress();
      console.error("Erro ao buscar endereço:", error);
    }
  };

  const clearAddress = () => {
    setUpdatedCustomer({
      ...updatedCustomer,
      address: {
        bairro: "",
        complement: "",
        number: "",
        city: "",
        street: "",
        zipcode: updatedCustomer.address.zipcode,
      },
    });
  };

  const handleKeyDownSearchAddress = async (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") await handleSearchAddressByCEP();
    return null;
  };

  const isCustomerEmpty = () => {
    const { address, agent, name, phone, status } = updatedCustomer;
    return (
      !agent ||
      !phone ||
      !status ||
      !name ||
      !address.street ||
      !address.bairro ||
      !address.complement ||
      !address.number ||
      !address.city ||
      !address.zipcode
    );
  };

  return (
    <>
      <form className="flex flex-col items-start p-4">
        <div className="flex flex-col md:flex-row w-full mb-4">
          <div className="md:w-1/2 pr-2">
            <label
              className="py-1.5 text-[#181818] text-base font-medium"
              htmlFor="name"
            >
              Nome
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={updatedCustomer.name}
              onChange={handleInputChange}
              className="block w-full outline-none border border-[#D7D7D7] rounded-md focus:border-[#2d5bff] p-2"
            />
          </div>
          <div className="md:w-1/2 pl-2">
            <label
              className="py-1.5 text-[#181818] text-base font-medium"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={updatedCustomer.email}
              onChange={handleInputChange}
              className="block w-full outline-none border border-[#D7D7D7] rounded-md focus:border-[#2d5bff] p-2"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full">
          <div className="md:w-1/2">
            <label
              className="py-1.5 text-[#181818] text-base font-medium"
              htmlFor="phone"
            >
              Telefone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              value={utils.maskPhone(updatedCustomer.phone)}
              maxLength={15}
              minLength={15}
              onChange={handleInputChange}
              className="block w-full outline-none border border-[#D7D7D7] rounded-md focus:border-[#2d5bff] p-2"
            />
          </div>
          <div className="md:w-1/2 pl-2">
            <label
              className="py-1.5 text-[#181818] text-base font-medium"
              htmlFor="agent"
            >
              Agente
            </label>
            <select
              name="agent"
              id="agent"
              required
              value={updatedCustomer.agent.id}
              onChange={handleInputChange}
              className="block w-full outline-none border border-[#D7D7D7] rounded-md focus:border-[#2d5bff] p-2"
            >
              <option value="">Agente</option>
              {agents.map((agent: any) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label
          className="py-1.5 text-[#181818] text-base font-medium"
          htmlFor="status"
        >
          Status
        </label>
        <select
          name="status"
          id="status"
          required
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
              className="py-1.5 text-[#181818] text-base font-medium"
              htmlFor="saleValue"
            >
              Valor da Venda
            </label>

            <CurrencyInput
              InputElement={<CustomInput />}
              value={updatedCustomer.saleValue}
              onChangeValue={(_event: any, originalValue: any) => {
                setUpdatedCustomer((prevCustomer: any) => ({
                  ...prevCustomer,
                  saleValue: originalValue,
                }));
              }}
            />
          </div>
        ) : null}

        <h3 className="py-1.5 text-[#181818] text-base font-medium">
          Endereço
        </h3>
        <div className="flex flex-col py-2">
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 pl-2">
              <label
                className="py-1.5 text-[#181818] text-base font-medium"
                htmlFor="zipcode"
              >
                CEP
              </label>
              <input
                type="text"
                name="zipcode"
                id="zipcode"
                maxLength={9}
                minLength={9}
                required
                value={utils.maskCEP(updatedCustomer.address.zipcode)}
                onChange={handleAddressChange}
                onKeyDown={(e) => handleKeyDownSearchAddress(e)}
                className="block w-full outline-none border border-[#D7D7D7] rounded-md focus:border-[#2d5bff] p-2"
              />
            </div>

            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="font-medium text-sm pb-2" htmlFor="street">
                Logradouro
              </label>
              <input
                type="text"
                name="street"
                id="street"
                required
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
                required
                value={updatedCustomer.address.number}
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
                required
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
                required
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
                required
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
          className="font-normal bg-white transition-all text-gray-400 py-2 px-4 rounded-md hover:opacity-80"
        >
          Cancelar
        </button>
        <button
          className="bg-[#2d5bff] text-white font-normal rounded-md py-2 px-3 hover:opacity-80 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-75"
          type="button"
          onClick={handleClickUpdateCustomer}
          disabled={isCustomerEmpty()}
        >
          Salvar
        </button>
      </div>
    </>
  );
};

export default FormUpdateCustomer;
