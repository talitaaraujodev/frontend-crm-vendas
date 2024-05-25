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
  async findCustomersToReport(
    startDate?: string,
    endDate?: string,
    statusCustomer?: string,
    agentId?: string
  ) {
    const queryParams = new URLSearchParams();

    if (startDate) {
      queryParams.append("startDate", startDate);
    }
    if (endDate) {
      queryParams.append("endDate", endDate);
    }
    if (statusCustomer) {
      queryParams.append("statusCustomer", statusCustomer);
    }
    if (agentId) {
      queryParams.append("agentId", agentId);
    }

    const url = `/customers/report?${queryParams}`;
    console.log("URL:", url);
    return await fetch("GET", url);
  },
  async findOneCustomer(id: string) {
    return await fetch("GET", `/customers/${id}`);
  },
  async deleteCustomer(id: string) {
    return await fetch("DELETE", `/customers/${id}`);
  },
};

export { customerService };
