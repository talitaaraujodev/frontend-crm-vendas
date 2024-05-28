export interface Agent {
  id: string;
  name: string;
  email: string;
  status: "INACTIVE" | "ACTIVE";
  createdAt: Date;
}
