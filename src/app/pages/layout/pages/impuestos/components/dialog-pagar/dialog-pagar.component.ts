import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  datosRegistro: any;
  cancelDialog: string;
}
@Component({
  selector: 'app-dialog-pagar',
  templateUrl: './dialog-pagar.component.html',
  styleUrls: ['./dialog-pagar.component.scss']
})
export class DialogPagarComponent implements OnInit {
  datosImpuesto: any;

  constructor(public dialogRef: MatDialogRef<DialogPagarComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,) {
    this.datosImpuesto = dialogData.datosRegistro.impuesto;
  }

  ngOnInit(): void {
  }

  cerrarDialog(): void {
    this.dialogRef.close(this.dialogData.cancelDialog);
  }

  pagar(): void {
    this.dialogRef.close('PAGAR');

  }

}
