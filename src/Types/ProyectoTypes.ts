export interface Proyecto{
  id: string;
  nombre: string;
  ubicacion: string;
  tieneFondos: boolean;
  tieneAliados: boolean;
  aliados: string[];
  tieneVoluntarios: boolean;
  voluntarios: string[];
  hidden?: boolean;
} 