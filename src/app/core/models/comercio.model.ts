import { Contribuyente } from '@core/models/contribuyente.model';
export interface Comercio {
  baseGravableActividad: number;
  codigoActividad: number;
  contribuyente: Contribuyente;
  nit: number;
  nombreEstablecimientoComercial: string;
}
