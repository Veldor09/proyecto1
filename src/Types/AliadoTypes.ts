export interface Aliado {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  hidden?: boolean;
}
