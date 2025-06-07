// types/VoluntarioTypes.ts
export interface Voluntario {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  hidden?: boolean;
}
