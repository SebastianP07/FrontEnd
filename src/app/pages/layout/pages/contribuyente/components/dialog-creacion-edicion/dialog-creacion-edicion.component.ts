import { Dominio } from './../../../../../../core/models/dominio.model';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { Contribuyente } from '@core/models/contribuyente.model';
import { GestionContribuyentesService } from '@core/services/gestion-contribuyentes/gestion-contribuyentes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DominiosData } from '@core/data/data';
export interface DialogData {
  headerDialog: string;
  contribuyente?: Contribuyente;
  imagen: string;
  accion: string;
  acceptDialog: string;
  cancelDialog: string;
}
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YY'
  },
  display: {
    dateInput: 'DD/MM/YY',
    monthYearLabel: 'DD MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MMMM YYYY'
  }
};
@Component({
  selector: 'app-dialog-creacion-edicion',
  templateUrl: './dialog-creacion-edicion.component.html',
  styleUrls: ['./dialog-creacion-edicion.component.scss']
})
export class DialogCreacionEdicionComponent {

  formRegistro!: FormGroup;
  loading = false;
  minDate!: string;
  maxDate!: string;
  tiposdeDocumento = DominiosData.tiposdeDocumento;

  constructor(
    public dialogRef: MatDialogRef<DialogCreacionEdicionComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private gestionContribuyentesService: GestionContribuyentesService,
    private _snackBar: MatSnackBar
  ) {
    this.dateAdapter.setLocale('es');
    this.contruirFormulario();
  }

  closedDialog(): void {
    this.dialogRef.close(this.dialogData.cancelDialog);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  acceptDialogBtn(form: Contribuyente): void {
    const accion = this.dialogData?.accion;
    if (accion === 'editar') {
      this.gestionContribuyentesService.editarContribuyente(form).subscribe(response => {
        this.openSnackBar('Registro actualizado con éxito.', 'X');
      });
    } else {
      this.gestionContribuyentesService.agregarContribuyente(form).subscribe(response => {
        this.openSnackBar('Registro creado con éxito.', 'X');
      });
    }
    this.closedDialog();
  }

  contruirFormulario(): void {
    const data = this.dialogData.contribuyente;
    this.formRegistro = this.formBuilder.group({
      tipoIdentificacion: new FormControl(data?.tipoIdentificacion, Validators.required),
      numeroIdentificacion: new FormControl(data?.numeroIdentificacion === null ? '' : data?.numeroIdentificacion, Validators.required),
      primerApellido: new FormControl(data?.primerApellido === null ? '' : data?.primerApellido, Validators.required),
      segundoApellido: new FormControl(data?.segundoApellido === null ? '' : data?.segundoApellido),
      primerNombre: new FormControl(data?.primerNombre === null ? '' : data?.primerNombre, Validators.required),
      segundoNombre: new FormControl(data?.segundoNombre === null ? '' : data?.segundoNombre),
      correoElectronico: new FormControl(data?.correoElectronico === null ? '' : data?.correoElectronico, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
      direccionNotificacion: new FormControl(data?.direccionNotificacion === null ? '' : data?.direccionNotificacion, Validators.required),
      telefonoPrincipal: new FormControl(data?.telefonoPrincipal === null ? '' : data?.telefonoPrincipal, Validators.required),
    });
  }
}
