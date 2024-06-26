import React from "react";
import { Customer } from "../../services/models/Customer";
import { utils } from "../../utils";

interface FormViewCustomer {
  customer: Customer;
}

const FormViewCustomer: React.FC<FormViewCustomer> = ({
  customer,
}: FormViewCustomer) => {
  return (
    <form className="flex flex-col items-start p-4" action="get">
      <div className="flex flex-col md:flex-row w-full mb-4">
        <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
          <label
            className="py-1 text-[#181818] text-base font-medium"
            htmlFor="name"
          >
            Nome
          </label>
          <input
            type="text"
            disabled={true}
            name="name"
            id="name"
            value={customer.name}
            className="block w-full outline-none p-2 cursor-not-allowed rounded-md disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
          />
        </div>
        <div className="w-full md:w-1/2 md:pl-2">
          <label
            className="py-1 text-[#181818] text-base font-medium"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            type="email"
            disabled={true}
            name="email"
            id="email"
            value={customer.email}
            className="block w-full outline-none p-2 cursor-not-allowed rounded-md disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full mb-4">
        <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
          <label
            className="py-1 text-[#181818] text-base font-medium"
            htmlFor="agent"
          >
            Agente
          </label>
          <input
            type="text"
            disabled={true}
            name="agent"
            id="agent"
            value={customer.agent.name}
            className="block w-full outline-none p-2 cursor-not-allowed rounded-md disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
          />
        </div>
        <div className="w-full md:w-1/2 md:pl-2">
          <label
            className="py-1 text-[#181818] text-base font-medium"
            htmlFor="phone"
          >
            Telefone
          </label>
          <input
            type="tel"
            disabled={true}
            name="phone"
            id="phone"
            value={utils.maskPhone(customer.phone)}
            className="block w-full outline-none p-2 cursor-not-allowed rounded-md disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
          />
        </div>
      </div>
      <label
        className="py-1 text-[#181818] text-base font-medium"
        htmlFor="status"
      >
        Status
      </label>
      <input
        type="text"
        disabled={true}
        name="status"
        id="status"
        value={utils.verifyCustomerStatus(customer.status) || ""}
        className="block w-full outline-none p-2 cursor-not-allowed rounded-md disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 mb-4"
      />
      {customer.status === utils.customerStatusTypes.Sold && (
        <div className="flex flex-col py-2 mb-4 w-full">
          <label
            className="py-1 text-[#181818] text-base font-medium"
            htmlFor="saleValue"
          >
            Valor da Venda
          </label>
          <input
            type="text"
            disabled={true}
            name="saleValue"
            id="saleValue"
            value={utils.maskCurrency(Number(customer.saleValue))}
            className="block w-full outline-none p-2 cursor-not-allowed rounded-md disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
          />
        </div>
      )}
      <h3 className="py-1 text-[#181818] text-base font-medium">Endereço</h3>
      <div className="flex flex-col py-2">
        <div className="-mx-3 md:flex mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="font-medium text-sm pb-2" htmlFor="street">
              Logradouro
            </label>
            <input
              type="text"
              disabled={true}
              name="street"
              id="street"
              value={customer.address.street}
              className="block w-full outline-none p-2 cursor-not-allowed rounded-md disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="font-medium text-sm pb-2" htmlFor="number">
              Número
            </label>
            <input
              type="number"
              disabled={true}
              name="number"
              id="number"
              value={customer.address.number}
              className="block w-full outline-none p-2 cursor-not-allowed rounded-md disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="font-medium text-sm pb-2" htmlFor="zipcode">
              CEP
            </label>
            <input
              type="text"
              disabled={true}
              name="zipcode"
              id="zipcode"
              className="block w-full outline-none p-2 cursor-not-allowed rounded-md disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
              value={utils.maskCEP(customer.address.zipcode)}
            />
          </div>
        </div>
        <div className="-mx-3 md:flex mb-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="font-medium text-sm mb-2" htmlFor="bairro">
              Bairro
            </label>
            <input
              type="text"
              disabled={true}
              name="bairro"
              id="bairro"
              value={customer.address.bairro}
              className="block w-full outline-none p-2 cursor-not-allowed rounded-md disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="font-medium text-sm pb-2" htmlFor="city">
              Cidade
            </label>
            <input
              type="text"
              disabled={true}
              name="city"
              id="city"
              value={customer.address.city}
              className="block w-full outline-none p-2 cursor-not-allowed rounded-md disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="font-medium text-sm pb-2" htmlFor="complement">
              Complemento
            </label>
            <input
              type="text"
              disabled={true}
              name="complement"
              id="complement"
              value={customer.address.complement}
              className="block w-full outline-none p-2 cursor-not-allowed rounded-md disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormViewCustomer;
