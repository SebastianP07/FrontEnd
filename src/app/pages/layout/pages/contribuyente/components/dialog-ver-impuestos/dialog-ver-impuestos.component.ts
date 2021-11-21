import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { DominiosData } from '@core/data/data';
export interface DialogData {
  datosRegistro: any;
  cancelDialog: string;
}
@Component({
  selector: 'app-dialog-ver-impuestos',
  templateUrl: './dialog-ver-impuestos.component.html',
  styleUrls: ['./dialog-ver-impuestos.component.scss']
})
export class DialogVerImpuestosComponent {
  displayedColumns: string[] = ['Id', 'TipoBien', 'Estado', 'Obligatorio', 'Pagado', 'FechaLimitePagoOrdinario', 'FechaLimitePagoExtraOrdinario', 'VerMas'];
  periodicidadImpuesto = DominiosData.periodicidadImpuesto;
  dataSource: any[] = [];
  datosRegistro: any;

  constructor(
    public dialogRef: MatDialogRef<DialogVerImpuestosComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private dateAdapter: DateAdapter<Date>,
  ) {
    this.dateAdapter.setLocale('es');
    this.dataSource = this.dialogData.datosRegistro
  }

  cerrarDialog(): void {
    this.dialogRef.close(this.dialogData.cancelDialog);
  }

  verDetalle(impuestoSelecionado: any): void {
    this.datosRegistro = impuestoSelecionado;
    let periodiciadaValor = impuestoSelecionado.impuesto.periodicidad;
    this.datosRegistro.impuesto.periodicidad = this.periodicidadImpuesto.find(elem => elem.valor === periodiciadaValor)?.descripcion;
  }

}
