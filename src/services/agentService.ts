import fetch from "../helpers/ApiConfig";
import { Agent } from "./models/Agent";

class AgentService {
  private sufix: string;

  constructor() {
    this.sufix = "/agents";
  }

  async createAgent(name: string, email: string) {
    return await fetch("POST", this.sufix, { name, email });
  }
  async updateAgent(id: string, agent: Agent) {
    return await fetch("PUT", `${this.sufix}/${id}`, {
      name: agent.name,
      email: agent.email,
      status: agent.status,
    });
  }
  async findAgents(search = "", limit: number = 10, page: number = 1) {
    const queryParams = new URLSearchParams({
      search,
      page: page.toString(),
      limit: limit.toString(),
    });
    return await fetch("GET", `${this.sufix}?${queryParams}`);
  }
  async findOneAgent(id: string) {
    return await fetch("GET", `${this.sufix}/${id}`);
  }
  async deleteAgent(id: string) {
    return await fetch("DELETE", `${this.sufix}/${id}`);
  }
}
const agentService = new AgentService();

export { agentService };
