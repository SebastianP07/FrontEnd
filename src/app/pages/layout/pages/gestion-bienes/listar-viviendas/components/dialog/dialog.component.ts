import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface DialogData {
  headerDialog: string;
  parametrosServicioToma: any;
  imagen: string;
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
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogCreacionEdicionListadoViviendasComponent {
  formRegistro!: FormGroup;
  loading = false;
  minDate!: string;
  maxDate!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogCreacionEdicionListadoViviendasComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private _snackBar: MatSnackBar
  ) {
    this.dateAdapter.setLocale('es');
    this.contruirFormulario();
    this.formaMinMaxDate();
  }

  closedDialog(): void {
    this.dialogRef.close(this.dialogData.cancelDialog);
  }

  acceptDialogBtn(form: any): void {
    const accion = this.dialogData?.parametrosServicioToma.accion;
    const parametrosServicio: any = {
      idAnioAcademico: this.dialogData.parametrosServicioToma.idAnioAcademico,
      nombre: form.nombreToma,
      fechaInicio: new Date(moment(form.initDate).format('yyyy/MM/DD')),
      fechaFin: new Date(moment(form.endDate).format('yyyy/MM/DD')),
      estado: form.activo ? true : false
    };
  }

  contruirFormulario(): void {
    const data = this.dialogData.parametrosServicioToma;
    this.formRegistro = this.formBuilder.group({
      nombreToma: new FormControl(data.nombre === null ? '' : data.nombre, Validators.compose([Validators.required])),
      initDate: new FormControl(data.fechaInicio === null ? '' : data.fechaInicio, Validators.required),
      endDate: new FormControl(data.fechaFin === null ? '' : data.fechaFin, Validators.required),
      activo: new FormControl(data.estado === null ? '' : data.estado)
    });
  }

  formaMinMaxDate(): void {
    let minDateArr = '2000/01/01';
    let maxDateArr = '2021/01/01';
    this.minDate = `${minDateArr[0]}-${minDateArr[1]}-${minDateArr[2]}`;
    this.maxDate = `${maxDateArr[0]}-${maxDateArr[1]}-${maxDateArr[2]}`;
  }

}
