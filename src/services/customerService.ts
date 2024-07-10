import fetch from "../helpers/ApiConfig";
import { Customer } from "./models/Customer";

class CustomerService {
  private sufix: string;

  constructor() {
    this.sufix = "/customers";
  }

  async createCustomer(customer: Customer) {
    return await fetch("POST", this.sufix, customer);
  }

  async updateCustomer(id: string, customer: Customer) {
    return await fetch("PUT", `${this.sufix}/${id}`, customer);
  }

  async findCustomers(search = "") {
    const queryParams = new URLSearchParams();

    if (search) {
      queryParams.append("search", search);
    }

    return await fetch("GET", `${this.sufix}?${queryParams}`);
  }

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

    const url = `${this.sufix}/report?${queryParams}`;

    return await fetch("GET", url);
  }

  async findOneCustomer(id: string) {
    return await fetch("GET", `${this.sufix}/${id}`);
  }

  async deleteCustomer(id: string) {
    return await fetch("DELETE", `${this.sufix}/${id}`);
  }
}
const customerService = new CustomerService();

export { customerService };
