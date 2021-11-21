export interface Impuesto {
  id?: number;
  fechaLimitePagoExtraOrdinario: string;
  fechaLimitePagoOrdinario: string;
  basePagoOrdinario: number;
  basePagoOrdinarioConPagoVoluntario: number;
  basePagoExtraordinario: number;
  basePagoExtraOrdinarioConPagoVoluntario: number;
  valorPagoMinimoOrdinario: number;
  valorPagoMinimoConPagoVoluntario: number;
  valorPagoMinimoExtraOrdinario: number;
  valorPagoMinimoExtraOrdinarioConPagoVoluntario: number;
  periodicidad: string;
  estado: boolean;
  tipoBien: { id: number };
  obligatorio: boolean;
  pagado?: boolean;
  asignado?: boolean;
}
