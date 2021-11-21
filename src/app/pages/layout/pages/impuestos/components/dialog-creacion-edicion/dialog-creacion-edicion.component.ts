import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { DominiosData } from '@core/data/data';
import { PrintService } from '@shared/services/print/print.service';
import html2canvas from 'html2canvas';
export interface DialogData {
  datosRegistro: any;
  cancelDialog: string;
  idImpuesto: string;
}
@Component({
  selector: 'app-dialog-creacion-edicion',
  templateUrl: './dialog-creacion-edicion.component.html',
  styleUrls: ['./dialog-creacion-edicion.component.scss']
})
export class DialogCreacionEdicionComponent {
  periodicidadImpuesto = DominiosData.periodicidadImpuesto;

  @ViewChild('barcode', { static: true }) barcode!: any;

  constructor(
    public dialogRef: MatDialogRef<DialogCreacionEdicionComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private dateAdapter: DateAdapter<Date>,
    private printService: PrintService
  ) {
    this.dateAdapter.setLocale('es');
    let periodiciadaValor = this.dialogData.datosRegistro.impuesto.periodicidad;
    this.dialogData.datosRegistro.impuesto.periodicidad = this.periodicidadImpuesto.find(elem => elem.valor === periodiciadaValor)?.descripcion
  }

  cerrarDialog(): void {
    this.dialogRef.close(this.dialogData.cancelDialog);
  }

  imprimir(): void {
    html2canvas(this.barcode.bcElement.nativeElement).then(canvas => {
      const codigoDeBarras = canvas.toDataURL('image/png');
      this.printService.generarPDF(this.dialogData.datosRegistro, this.dialogData.idImpuesto, codigoDeBarras);
    });
  }
}
