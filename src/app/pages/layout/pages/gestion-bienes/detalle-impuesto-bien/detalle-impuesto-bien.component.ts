import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  headerDialog: string;
  parametros: any;
  cancelDialog: string;
}
@Component({
  selector: 'app-detalle-impuesto-bien',
  templateUrl: './detalle-impuesto-bien.component.html',
  styleUrls: ['./detalle-impuesto-bien.component.scss']
})
export class DetalleImpuestoBienComponent implements OnInit {
  displayedColumns: string[] = [
    'fechaLimitePagoOrdinario',
    'fechaLimitePagoExtraOrdinario',
    'valorPagoMinimoOrdinario',
    'valorPagoMinimoExtraOrdinario',
    'valorPagoMinimoConPagoVoluntario',
    'valorPagoMinimoExtraOrdinarioConPagoVoluntario',
    'basePagoOrdinario',
    'basePagoExtraordinario',
    'basePagoOrdinarioConPagoVoluntario',
    'basePagoExtraOrdinarioConPagoVoluntario',
    'obligatorio',
    'Pagado',
  ];

  constructor(public dialogRef: MatDialogRef<DetalleImpuestoBienComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,) { }

  ngOnInit(): void {
  }

}
