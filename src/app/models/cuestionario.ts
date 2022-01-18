import { Pregunta } from './pregunta';
export interface Cuestionario {
  id?: string;
  uid: string;
  titulo: string;
  descripcion: string;
  codigo: string;
  cantPreguntas: number;
  fechaCreacion: string;
  listPreguntas: Pregunta[];
}
