import React from "react";
import { CurrencyInput } from "react-currency-mask";
import { Customer } from "../../services/models/Customer";
import { utils } from "../../utils";

interface FormViewCustomer {
  customer: Customer;
}

const CustomInput = React.forwardRef<HTMLInputElement, any>((props, ref) => (
  <input
    {...props}
    ref={ref}
    className="block w-full outline-none p-2 cursor-not-allowed rounded-md font-normal disabled:bg-gray-100 disabled:text-slate-500 disabled:border-slate-200"
    placeholder="R$ 0,00"
    disabled
  />
));

const FormViewCustomer: React.FC<FormViewCustomer> = ({
  customer,
}: FormViewCustomer) => {
  return (
    <form className="flex flex-col items-start p-4" action="get">
      <div className="flex flex-col md:flex-row w-full mb-4">
        <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
          <label
            className="py-1 text-[#181818] text-base pb-1 font-medium"
            htmlFor="name"
          >
            Nome
          </label>
          <input
            type="text"
            disabled
            name="name"
            id="name"
            value={customer.name}
            className="block w-full outline-none p-2 cursor-not-allowed rounded-md font-normal disabled:bg-gray-100 disabled:text-slate-500 disabled:border-slate-200"
          />
        </div>
        <div className="w-full md:w-1/2 md:pl-2">
          <label
            className="py-1 text-[#181818] text-base pb-1 font-medium"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            type="email"
            disabled
            name="email"
            id="email"
            value={customer.email}
            className="block w-full outline-none p-2 cursor-not-allowed rounded-md font-normal disabled:bg-gray-100 disabled:text-slate-500 disabled:border-slate-200"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full mb-4">
        <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
          <label
            className="py-1 text-[#181818] text-base pb-1 font-medium"
            htmlFor="agent"
          >
            Agente
          </label>
          <input
            type="text"
            disabled
            name="agent"
            id="agent"
            value={customer.agent.name}
            className="block w-full outline-none p-2 cursor-not-allowed rounded-md font-normal disabled:bg-gray-100 disabled:text-slate-500 disabled:border-slate-200"
          />
        </div>
        <div className="w-full md:w-1/2 md:pl-2">
          <label
            className="py-1 text-[#181818] text-base pb-1 font-medium"
            htmlFor="phone"
          >
            Telefone
          </label>
          <input
            type="tel"
            disabled
            name="phone"
            id="phone"
            value={utils.maskPhone(customer.phone)}
            className="block w-full outline-none p-2 cursor-not-allowed rounded-md font-normal disabled:bg-gray-100 disabled:text-slate-500 disabled:border-slate-200"
          />
        </div>
      </div>
      <label
        className="py-1 text-[#181818] text-base pb-1 font-medium"
        htmlFor="status"
      >
        Status
      </label>
      <input
        type="text"
        disabled
        name="status"
        id="status"
        value={customer.status || ""}
        className="block w-full outline-none p-2 cursor-not-allowed rounded-md font-normal disabled:bg-gray-100 disabled:text-slate-500 disabled:border-slate-200 mb-4"
      />
      {customer.status === utils.customerStatusTypes.Sold && (
        <div className="flex flex-col py-2 mb-4 w-full">
          <label
            className="py-1 text-[#181818] text-base pb-1 font-medium"
            htmlFor="saleValue"
          >
            Valor da Venda
          </label>
          <CurrencyInput
            InputElement={<CustomInput />}
            value={customer.saleValue}
            onChangeValue={function (
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              _event: React.ChangeEvent<HTMLInputElement>,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              _originalValue: number | string
            ): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      )}
      <h3 className="py-1 text-[#181818] text-base pb-1 font-medium">
        Endereço
      </h3>
      <div className="flex flex-col py-2">
        <div className="-mx-3 md:flex mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="font-medium text-sm pb-2" htmlFor="street">
              Logradouro
            </label>
            <input
              type="text"
              disabled
              name="street"
              id="street"
              value={customer.address.street}
              className="block w-full outline-none p-2 cursor-not-allowed rounded-md font-normal disabled:bg-gray-100 disabled:text-slate-500 disabled:border-slate-200"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="font-medium text-sm pb-2" htmlFor="number">
              Número
            </label>
            <input
              type="number"
              disabled
              name="number"
              id="number"
              value={customer.address.number}
              className="block w-full outline-none p-2 cursor-not-allowed rounded-md font-normal disabled:bg-gray-100 disabled:text-slate-500 disabled:border-slate-200"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="font-medium text-sm pb-2" htmlFor="zipcode">
              CEP
            </label>
            <input
              type="text"
              disabled
              name="zipcode"
              id="zipcode"
              className="block w-full outline-none p-2 cursor-not-allowed rounded-md font-normal disabled:bg-gray-100 disabled:text-slate-500 disabled:border-slate-200"
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
              disabled
              name="bairro"
              id="bairro"
              value={customer.address.bairro}
              className="block w-full outline-none p-2 cursor-not-allowed rounded-md font-normal disabled:bg-gray-100 disabled:text-slate-500 disabled:border-slate-200"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="font-medium text-sm pb-2" htmlFor="city">
              Cidade
            </label>
            <input
              type="text"
              disabled
              name="city"
              id="city"
              value={customer.address.city}
              className="block w-full outline-none p-2 cursor-not-allowed rounded-md font-normal disabled:bg-gray-100 disabled:text-slate-500 disabled:border-slate-200"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="font-medium text-sm pb-2" htmlFor="complement">
              Complemento
            </label>
            <input
              type="text"
              disabled
              name="complement"
              id="complement"
              value={customer.address.complement}
              className="block w-full outline-none p-2 cursor-not-allowed rounded-md font-normal disabled:bg-gray-100 disabled:text-slate-500 disabled:border-slate-200"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormViewCustomer;
