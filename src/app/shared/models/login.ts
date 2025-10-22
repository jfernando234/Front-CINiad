export interface User {
  id: number;
  nombre: string;
  rol: Role;
}
export type Role = 'admin' | 'profesor' | 'alumno';
