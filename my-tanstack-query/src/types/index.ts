export interface Client {
  id: number;
  name: string;
  email: string;
  projects: number[];
}

export interface Project {
  id: number;
  title: string;
  clientId: number;
  status: string;
}

export interface Invoice {
  id: number;
  clientId: number;
  amount: number;
  status: string;
}
