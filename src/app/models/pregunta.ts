import { Respuesta } from './respuesta';
export interface Pregunta {
  titulo: string;
  puntos: number;
  segundos: number;
  listRespuestas: Respuesta[];
}
