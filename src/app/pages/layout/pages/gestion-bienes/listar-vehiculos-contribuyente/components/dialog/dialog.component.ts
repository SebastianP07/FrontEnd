import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GestionBienesService } from '@core/services/gestion-bienes/gestion-bienes.service';
import { environment } from 'src/environments/environment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
export interface DialogData {
  headerDialog: string;
  parametros: any;
  accion: string;
  acceptDialog: string;
  cancelDialog: string;
}
@Component({
  selector: 'app-dialog-creacion-edicion',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogCreacionEdicionListadoVehiculosCOntribuyenteComponent {
  formRegistro!: FormGroup;
  loading = false;
  minDate!: string;
  maxDate!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogCreacionEdicionListadoVehiculosCOntribuyenteComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private snackBar: MatSnackBar,
    private gestionBienesService: GestionBienesService
  ) {
    this.dateAdapter.setLocale('es');
    this.contruirFormulario();
  }

  closedDialog(): void {
    this.dialogRef.close(this.dialogData.cancelDialog);
  }

  acceptDialogBtn(form: any): void {
    const accion = this.dialogData?.accion;
    const parametros = this.dialogData.parametros;
    if (accion === 'editar') {
      form.placa = parametros.vehiculo.placa;
      this.gestionBienesService.getDetalleVehiculo(form.placa).subscribe(response => {
        console.log('getDetalleVehiculo', response);
        const datosVehiculo = {
          bien: {
            contribuyente: response.bien.contribuyente,
            tipoBien: response.bien.tipoBien
          },
          capacidad: response.capacidad,
          linea: form.linea,
          marca: form.marca,
          modelo: form.modelo,
          placa: form.placa,
          uso: form.uso
        };
        this.gestionBienesService.editarVehiculoContribuyente(datosVehiculo).subscribe(() => {
          this.snackBar.open('Registro actualizado con éxito.', 'X', { duration: 2000 });
        });
      });
    } else {
      this.gestionBienesService.getTiposBienes().subscribe(tiposBien => {
        const datosVehiculo = {
          bien: {
            contribuyente: parametros.usuario,
            tipoBien: tiposBien.filter((elem: any) => elem.nombre === 'VEHICULO')[0],
            id: 1,
          },
          capacidad: 1591,
          linea: form.linea,
          marca: form.marca,
          modelo: form.modelo,
          placa: form.placa,
          uso: form.uso
        };
        this.gestionBienesService.agregarVehiculo(datosVehiculo).subscribe(() => {
          this.snackBar.open('Registro creado con éxito.', 'X', { duration: 2000 });
        });
      });
    }
    this.closedDialog();
  }

  contruirFormulario(): void {
    const data = this.dialogData.parametros.vehiculo;
    this.formRegistro = this.formBuilder.group({
      placa: new FormControl(typeof data === 'undefined' ? '' : data.placa, Validators.compose([Validators.required])),
      marca: new FormControl(typeof data === 'undefined' ? '' : data.marca, Validators.required),
      linea: new FormControl(typeof data === 'undefined' ? '' : data.linea, Validators.required),
      modelo: new FormControl(typeof data === 'undefined' ? '' : data.modelo, Validators.required),
      uso: new FormControl(typeof data === 'undefined' ? '' : data.uso, Validators.required)
    });
    if (data) {
      this.formRegistro.get('placa')?.disable();
    }
  }

}
