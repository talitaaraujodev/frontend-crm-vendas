export interface Address {
  zipcode: string;
  street: string;
  number: string;
  bairro: string;
  city: string;
  complement: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
  agent: { id: string; name: string };
  status: any;
  saleValue?: number;
  createdAt: Date;
}
