import { Contribuyente } from '@core/models/contribuyente.model';
import { TipoBien } from './tipoBien.model';

export interface Vehiculo {
  placa: string;
  linea: string;
  modelo: number;
  uso: string;
  capacidad: number;
  contribuyente: Contribuyente;
}
