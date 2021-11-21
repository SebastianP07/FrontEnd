import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  datosRegistro: any;
  cancelDialog: string;
}

@Component({
  selector: 'app-detalle-bien',
  templateUrl: './detalle-bien.component.html',
  styleUrls: ['./detalle-bien.component.scss']
})
export class DetalleBienComponent {
  datosBien: any;

  constructor(
    public dialogRef: MatDialogRef<DetalleBienComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
  ) {
    const datosRegistro = this.dialogData.datosRegistro;
    this.datosBien = {
      nombreTipoBien: datosRegistro.nombreTipoBien,
      valorAvaluo: datosRegistro.bien.valorAvaluo,
      icono: datosRegistro.bien.tipoBien.icono,
      valorTotalConPagoVoluntario: datosRegistro.valorTotalConPagoVoluntario,
      valorTotalExtraOrdinario: datosRegistro.valorTotalExtraOrdinario,
      valorTotalExtraOrdinarioConPagoVoluntario: datosRegistro.valorTotalExtraOrdinarioConPagoVoluntario,
      valorTotalOrdinario: datosRegistro.valorTotalOrdinario
    };
  }

  cerrarDialog(): void {
    this.dialogRef.close(this.dialogData.cancelDialog);
  }
}
