import fetch from "../helpers/ApiConfig";
import { Customer } from "./models/Customer";

const customerService = {
  async createCustomer(customer: Customer) {
    return await fetch("POST", "/customers", customer);
  },
  async updateCustomer(id: string, customer: Customer) {
    return await fetch("PUT", `/customers/${id}`, customer);
  },
  async findCustomers() {
    return await fetch("GET", "/customers");
  },
  async findOneCustomer(id: string) {
    return await fetch("GET", `/customers/${id}`);
  },
  async deleteCustomer(id: string) {
    return await fetch("DELETE", `/customers/${id}`);
  },
};

export { customerService };
