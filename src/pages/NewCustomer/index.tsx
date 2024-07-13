import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { customerService } from "../../services/customerService";
import { toast } from "sonner";
import { Customer } from "../../services/models/Customer";
import { utils } from "../../utils";
import { ArrowRight } from "lucide-react";

const NewCustomerPage: React.FC = () => {
  const [customer, setCustomer] = useState({
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
  });

  const handleCustomerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue = name === "phone" ? utils.maskPhone(value) : value;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: newValue,
    }));
  };

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue = name === "zipcode" ? utils.maskCEP(value) : value;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      address: {
        ...prevCustomer.address,
        [name]: newValue,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      ...customer,
      phone: customer.phone.replace(/\D/g, ""),
      address: {
        ...customer.address,
        zipcode: customer.address.zipcode.replace(/\D/g, ""),
      },
    };

    await customerService
      .createCustomer(data as Customer)
      .then((response) => {
        const errors = response.errors;
        if (errors) {
          if (Array.isArray(errors)) {
            toast.error(errors[0]);
          } else if (typeof errors === "string") {
            toast.error(errors);
          }
          return;
        } else {
          toast.success("Cliente criado com sucesso!");
          setCustomer({
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
          });
          return;
        }
      })
      .catch((error) => {
        console.log("Erro ao criar cliente:", error);
        toast.error("Ocorreram erros internos ao enviar sua solicitação.");
      });
  };

  const handleSearchAddressByCEP = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_API_CEP}${customer.address.zipcode}/json`,
        {
          method: "GET",
          headers: { "content-type": "application/json" },
          mode: "cors",
        }
      );

      const result = await response.json();

      if (response.ok) {
        setCustomer({
          ...customer,
          address: {
            ...customer.address,
            street: result.logradouro,
            bairro: result.bairro,
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
    setCustomer({
      ...customer,
      address: {
        bairro: "",
        complement: "",
        number: "",
        city: "",
        street: "",
        zipcode: customer.address.zipcode,
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
    const { address, name, phone } = customer;
    return (
      !phone ||
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
    <div className="container mx-auto p-7">
      <div className="overflow-x-auto shadow-md rounded-md border-2 bg-white p-4">
        <h2 className="text-[#2d5bff] font-semibold text-xl">Novo Cliente</h2>
        <form action="" method="post" onSubmit={handleSubmit}>
          <div className="flex flex-col py-2">
            <label htmlFor="name" className="font-medium text-base pb-2">
              Nome
            </label>
            <input
              placeholder="Nome"
              type="text"
              name="name"
              id="name"
              required
              className="outline-none border border-[#D7D7D7] rounded-md p-2 focus:border-[#2d5bff]"
              value={customer.name}
              onChange={handleCustomerChange}
            />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="email" className="font-medium text-base pb-2">
              E-mail
            </label>
            <input
              placeholder="E-mail"
              type="email"
              name="email"
              id="email"
              required
              className="outline-none border border-[#D7D7D7] rounded-md p-2 focus:border-[#2d5bff]"
              value={customer.email}
              onChange={handleCustomerChange}
            />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="phone" className="font-medium text-base pb-2">
              Telefone
            </label>
            <input
              placeholder="Telefone"
              type="tel"
              name="phone"
              id="phone"
              required
              className="outline-none border border-[#D7D7D7] rounded-md p-2 focus:border-[#2d5bff]"
              value={customer.phone}
              maxLength={15}
              onChange={handleCustomerChange}
            />
          </div>
          <div className="flex flex-col py-2">
            <h3 className="font-medium text-base pb-2">Endereço</h3>
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3">
                <label htmlFor="zipcode" className="font-medium text-sm pb-2">
                  CEP
                </label>
                <input
                  placeholder="CEP"
                  type="text"
                  name="zipcode"
                  id="zipcode"
                  required
                  className="block w-full outline-none border border-[#D7D7D7] rounded-md p-2 focus:border-[#2d5bff]"
                  value={customer.address.zipcode}
                  onChange={handleAddressChange}
                  maxLength={9}
                  minLength={9}
                  onKeyDown={(e) => handleKeyDownSearchAddress(e)}
                />
              </div>
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label htmlFor="street" className="font-medium text-sm pb-2">
                  Logradouro
                </label>
                <input
                  placeholder="Logradouro"
                  type="text"
                  name="street"
                  id="street"
                  className="block w-full outline-none border border-[#D7D7D7] rounded-md p-2 focus:border-[#2d5bff]"
                  value={customer.address.street}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className="md:w-1/2 px-3">
                <label htmlFor="number" className="font-medium text-sm pb-2">
                  Número
                </label>
                <input
                  placeholder="Número"
                  type="text"
                  name="number"
                  id="number"
                  className="block w-full outline-none border border-[#D7D7D7] rounded-md p-2 focus:border-[#2d5bff]"
                  value={customer.address.number}
                  onChange={handleAddressChange}
                  required
                />
              </div>
            </div>

            <div className="-mx-3 md:flex mb-2">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label htmlFor="bairro" className="font-medium text-sm mb-2">
                  Bairro
                </label>
                <input
                  placeholder="Bairro"
                  type="text"
                  name="bairro"
                  id="bairro"
                  className="block w-full outline-none border border-[#D7D7D7] rounded-md p-2 focus:border-[#2d5bff]"
                  value={customer.address.bairro}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className="md:w-1/2 px-3">
                <label htmlFor="city" className="font-medium text-sm pb-2">
                  Cidade
                </label>
                <input
                  placeholder="Cidade"
                  type="text"
                  name="city"
                  id="city"
                  className="block w-full outline-none border border-[#D7D7D7] rounded-md p-2 focus:border-[#2d5bff]"
                  value={customer.address.city}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className="md:w-1/2 px-3">
                <label
                  htmlFor="complement"
                  className="font-medium text-sm pb-2"
                >
                  Complemento
                </label>
                <input
                  placeholder="Complemento"
                  type="text"
                  name="complement"
                  id="complement"
                  className="block w-full outline-none border border-[#D7D7D7] rounded-md p-2 focus:border-[#2d5bff]"
                  value={customer.address.complement}
                  onChange={handleAddressChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end pt-4">
            <button
              className="bg-[#2d5bff] text-white font-normal rounded-md py-2 px-3 hover:opacity-80 transition-all cursor-pointer flex items-center space-x-1 disabled:cursor-not-allowed disabled:opacity-75"
              type="submit"
              disabled={isCustomerEmpty()}
            >
              <span> Enviar</span>

              <ArrowRight />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCustomerPage;
