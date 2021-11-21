import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DateAdapter} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GestionBienesService} from '@core/services/gestion-bienes/gestion-bienes.service';
import {environment} from 'src/environments/environment';
import {GestionContribuyentesService} from '@core/services/gestion-contribuyentes/gestion-contribuyentes.service';
import {UserService} from '@core/services/user/user.service';
import {Subscription} from 'rxjs';

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
export class DialogCreacionEdicionListadoComercioContribuyenteComponent {
  observableUser!: Subscription;
  formRegistro!: FormGroup;
  loading = false;
  minDate!: string;
  maxDate!: string;
  dataUser: any;
  rol!: number;

  constructor(
    public dialogRef: MatDialogRef<DialogCreacionEdicionListadoComercioContribuyenteComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private snackBar: MatSnackBar,
    private gestionBienesService: GestionBienesService,
    private gestionContribuyentesService: GestionContribuyentesService,
    private userService: UserService
  ) {
    this.dateAdapter.setLocale('es');
    this.contruirFormulario();
    this.getDataUser();
  }

  getDataUser(): void {
    this.observableUser = this.userService.datosUsuario$.subscribe(response => {
      this.dataUser = response;
      const rolCustom = response?.responseDataUser?.roles.find((elem: { id: number; nombre: string }) => elem.id === 1)?.id;
      this.rol = rolCustom ? rolCustom : 2;
    });
  }

  closedDialog(): void {
    this.dialogRef.close(this.dialogData.cancelDialog);
  }

  acceptDialogBtn(form: any): void {
    const accion = this.dialogData?.accion;
    if (accion === 'editar') {
      form.nit = this.dialogData.parametros.nit;
      this.gestionBienesService.getDetalleComercio(form.nit).subscribe(response => {
        const datosComercio = {
          bien: {
            contribuyente: response.bien.contribuyente,
            tipoBien: response.bien.tipoBien
          },
          nit: form.nit,
          nombreEstablecimientoComercial: form.nombreEstablecimientoComercial,
          codigoActividad: form.codigoActividad,
          baseGravableActividad: form.baseGravableActividad,
        };
        this.gestionBienesService.editarComercioContribuyente(datosComercio).subscribe(() => {
          this.snackBar.open('Registro actualizado con éxito.', 'X', {duration: 2000});
        });
      });
    } else {
      this.gestionBienesService.getTiposBienes().subscribe(response => {
        const datosVehiculo = {
          bien: {
            contribuyente: this.dataUser,
            tipoBien: response.filter((elem: any) => elem.nombre === 'Vivienda')[0],
            id: 3,
          },
          nit: form.nit,
          nombreEstablecimientoComercial: form.nombreEstablecimientoComercial,
          codigoActividad: form.codigoActividad,
          baseGravableActividad: form.baseGravableActividad,
        };
        this.gestionBienesService.agregarComercio(datosVehiculo).subscribe(() => {
          this.snackBar.open('Registro creado con éxito.', 'X', {duration: 2000});
        });
      });
    }
    this.closedDialog();
  }

  contruirFormulario(): void {
    const data = this.dialogData.parametros;
    this.formRegistro = this.formBuilder.group({
      nit: new FormControl(
        typeof data === 'undefined' ? '' : data.nit, Validators.compose([Validators.required])
      ),
      nombreEstablecimientoComercial: new FormControl(
        typeof data === 'undefined' ? '' : data.nombreEstablecimientoComercial, Validators.required),
      codigoActividad: new FormControl(
        typeof data === 'undefined' ? '' : data.codigoActividad, Validators.required),
      baseGravableActividad: new FormControl(
        typeof data === 'undefined' ? '' : data.baseGravableActividad, Validators.required),
    });
    if (data) {
      this.formRegistro.get('nit')?.disable();
    }
  }

}
