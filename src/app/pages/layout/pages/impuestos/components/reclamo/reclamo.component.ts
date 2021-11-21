import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  datosRegistro: any;
  cancelDialog: string;
}
@Component({
  selector: 'app-reclamo',
  templateUrl: './reclamo.component.html',
  styleUrls: ['./reclamo.component.scss']
})
export class ReclamoComponent {
  datosBien: any;

  constructor(
    public dialogRef: MatDialogRef<ReclamoComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
  ) {
    const datosRegistro = this.dialogData.datosRegistro;
    this.datosBien = datosRegistro;
  }

  cerrarDialog(): void {
    this.dialogRef.close(this.dialogData.cancelDialog);
  }
}
