import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  datosRegistro: any;
  cancelDialog: string;
}
@Component({
  selector: 'app-conciliacion',
  templateUrl: './conciliacion.component.html',
  styleUrls: ['./conciliacion.component.scss']
})
export class ConciliacionComponent {
  datosBien: any;
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(
    public dialogRef: MatDialogRef<ConciliacionComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
  ) {
    const datosRegistro = this.dialogData.datosRegistro;
    console.log(datosRegistro);
  }

  cerrarDialog(): void {
    this.dialogRef.close(this.dialogData.cancelDialog);
  }

  solicitarConciliacion(): void {
    console.log(this.dialogData.datosRegistro);
  }

}
