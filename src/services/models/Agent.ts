export interface Agent {
  id: string;
  name: string;
  status: "INACTIVE" | "ACTIVE";
  createdAt: Date;
}
