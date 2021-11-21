import { Contribuyente } from '@core/models/contribuyente.model';
import { TipoBien } from './tipoBien.model';

export interface Vivienda {
  cedulaCatrastal: string;
  direccionPredio: string;
  construccion: number;
  estrato: number;
  terreno: number;
  contribuyente: Contribuyente;
}
