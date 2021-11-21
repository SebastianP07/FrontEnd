import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GestionBienesService } from '@core/services/gestion-bienes/gestion-bienes.service';
import { environment } from 'src/environments/environment';
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
export class DialogCreacionEdicionListadoViviendasContribuyenteComponent {
  formRegistro!: FormGroup;
  loading = false;
  minDate!: string;
  maxDate!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogCreacionEdicionListadoViviendasContribuyenteComponent>,
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
      form.cedulaCatrastal = parametros.vivienda.cedulaCatrastal;
      this.gestionBienesService.getDetalleVivienda(form.cedulaCatrastal).subscribe(response => {
        const datosVivienda = {
          bien: {
            contribuyente: response.bien.contribuyente,
            tipoBien: response.bien.tipoBien
          },
          cedulaCatrastal: form.cedulaCatrastal,
          construccion: form.construccion,
          direccionPredio: form.direccionPredio,
          estrato: form.estrato,
          terreno: form.terreno
        };
        this.gestionBienesService.editarViviendaContribuyente(datosVivienda).subscribe(() => {
          this.snackBar.open('Registro actualizado con éxito.', 'X', { duration: 2000 });
        });
      });
    } else {
      this.gestionBienesService.getTiposBienes().subscribe(response => {
        const datosVehiculo = {
          bien: {
            contribuyente: parametros.usuario,
            tipoBien: response.filter((elem: any) => elem.nombre === 'Vivienda')[0],
            id: 2,
          },
          cedulaCatrastal: form.cedulaCatrastal,
          construccion: form.construccion,
          direccionPredio: form.direccionPredio,
          estrato: form.estrato,
          terreno: form.terreno
        };
        this.gestionBienesService.agregarVivienda(datosVehiculo).subscribe(() => {
          this.snackBar.open('Registro creado con éxito.', 'X', { duration: 2000 });
        });
      });
    }
    this.closedDialog();
  }

  contruirFormulario(): void {
    const data = this.dialogData.parametros.vivienda;
    this.formRegistro = this.formBuilder.group({
      cedulaCatrastal: new FormControl(typeof data === 'undefined' ? '' : data.cedulaCatrastal, Validators.compose([Validators.required])),
      construccion: new FormControl(typeof data === 'undefined' ? '' : data.construccion, Validators.required),
      direccionPredio: new FormControl(typeof data === 'undefined' ? '' : data.direccionPredio, Validators.required),
      estrato: new FormControl(typeof data === 'undefined' ? '' : data.estrato, Validators.required),
      terreno: new FormControl(typeof data === 'undefined' ? '' : data.terreno, Validators.required)
    });
    if (data) {
      this.formRegistro.get('cedulaCatrastal')?.disable();
    }
  }

}
