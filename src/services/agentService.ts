import fetch from "../helpers/ApiConfig";
import { Agent } from "./models/Agent";

const agentService = {
  async createAgent(name: string, email: string) {
    return await fetch("POST", "/agents", { name, email });
  },
  async updateAgent(id: string, agent: Agent) {
    return await fetch("PUT", `/agents/${id}`, {
      name: agent.name,
      email: agent.email,
      status: agent.status,
    });
  },
  async findAgents() {
    return await fetch("GET", "/agents");
  },
  async findOneAgent(id: string) {
    return await fetch("GET", `/agents/${id}`);
  },
  async deleteAgent(id: string) {
    return await fetch("DELETE", `/agents/${id}`);
  },
};

export { agentService };
