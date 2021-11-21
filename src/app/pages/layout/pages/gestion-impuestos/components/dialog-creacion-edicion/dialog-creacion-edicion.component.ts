import { DominiosData } from '@core/data/data';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GestionBienesService } from '@core/services/gestion-bienes/gestion-bienes.service';
import { Impuesto } from '@core/models/impuesto.model';
import { TipoBien } from '@core/models/tipoBien.model';
import { Dominio } from '@core/models/dominio.model';

export interface DialogData {
  headerDialog: string;
  datos: any;
  accion: string;
  acceptDialog: string;
  cancelDialog: string;
}

@Component({
  selector: 'app-dialog-creacion-edicion',
  templateUrl: './dialog-creacion-edicion.component.html',
  styleUrls: ['./dialog-creacion-edicion.component.scss'],
})
export class DialogCreacionEdicionComponent {
  formRegistro!: FormGroup;
  loading = false;
  tiposBien!: TipoBien[];
  periodicidadImpuesto: Dominio[];
  tipoBienSeleccionado!: number;
  periodicidadSeleccionado!: number;
  fechaLimPagoOrdinario = new Date(2020, 1, 1);

  constructor(
    public dialogRef: MatDialogRef<DialogCreacionEdicionComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private _snackBar: MatSnackBar,
    private gestionBienesService: GestionBienesService
  ) {
    this.dateAdapter.setLocale('es');
    this.contruirFormulario();
    this.getTipoBien();
    this.periodicidadImpuesto = DominiosData.periodicidadImpuesto;
    this.getPeriodicidadImpuesto();
  }

  closedDialog(): void {
    this.dialogRef.close(this.dialogData.cancelDialog);
  }

  acceptDialogBtn(form: any): void {
    const accion = this.dialogData?.accion;
    const datosServicio: Impuesto = {
      fechaLimitePagoExtraOrdinario: moment(form.fechaLimitePagoExtraOrdinario).format('yyyy-MM-DD'),
      fechaLimitePagoOrdinario: moment(form.fechaLimitePagoOrdinario).format('yyyy-MM-DD'),
      basePagoOrdinario: form.basePagoOrdinario,
      basePagoOrdinarioConPagoVoluntario: form.basePagoOrdinarioConPagoVoluntario,
      basePagoExtraordinario: form.basePagoExtraordinario,
      basePagoExtraOrdinarioConPagoVoluntario: form.basePagoExtraOrdinarioConPagoVoluntario,
      valorPagoMinimoOrdinario: form.valorPagoMinimoOrdinario,
      valorPagoMinimoConPagoVoluntario: form.valorPagoMinimoConPagoVoluntario,
      valorPagoMinimoExtraOrdinario: form.valorPagoMinimoExtraOrdinario,
      valorPagoMinimoExtraOrdinarioConPagoVoluntario: form.valorPagoMinimoExtraOrdinarioConPagoVoluntario,
      estado: form.estado === '' ? false : form.estado,
      tipoBien: {
        id: this.tiposBien.filter((elem) => elem.id === this.tipoBienSeleccionado)[0].id
      },
      periodicidad: this.periodicidadImpuesto.filter((elem) => elem.id === this.periodicidadSeleccionado)[0]?.valor,
      obligatorio: form.obligatorio === '' ? false : form.obligatorio,
    };

    if (accion === 'editar') {
      datosServicio.id = this.dialogData.datos.id;
      this.gestionBienesService
        .editarImpuesto(datosServicio)
        .subscribe((response) => {
          this._snackBar.open('Registro actualizado con éxito.', 'X', {
            duration: 2000,
          });
        });
    } else {
      this.gestionBienesService
        .agregarImpuesto(datosServicio)
        .subscribe((response) => {
          this._snackBar.open('Registro creado con éxito.', 'X', {
            duration: 2000,
          });
        });
    }

    this.closedDialog();
  }

  contruirFormulario(): void {
    const data = this.dialogData.datos;
    console.log(data)
    this.formRegistro = this.formBuilder.group({
      fechaLimitePagoOrdinario: new FormControl(
        typeof data === 'undefined' ? '' : data.fechaLimitePagoOrdinario,
        Validators.required
      ),
      fechaLimitePagoExtraOrdinario: new FormControl(
        typeof data === 'undefined' ? '' : data.fechaLimitePagoExtraOrdinario,
        Validators.required
      ),
      estado: new FormControl(typeof data === 'undefined' ? '' : data.estado),
      obligatorio: new FormControl(
        typeof data === 'undefined' ? '' : data.obligatorio
      ),
      basePagoOrdinario: new FormControl(
        typeof data === 'undefined' ? '' : data.basePagoOrdinario,
        Validators.compose([Validators.required])
      ),
      basePagoOrdinarioConPagoVoluntario: new FormControl(
        typeof data === 'undefined'
          ? ''
          : data.basePagoOrdinarioConPagoVoluntario,
        Validators.compose([Validators.required])
      ),
      basePagoExtraordinario: new FormControl(
        typeof data === 'undefined' ? '' : data.basePagoExtraordinario,
        Validators.compose([Validators.required])
      ),
      basePagoExtraOrdinarioConPagoVoluntario: new FormControl(
        typeof data === 'undefined'
          ? ''
          : data.basePagoExtraOrdinarioConPagoVoluntario,
        Validators.compose([Validators.required])
      ),
      valorPagoMinimoOrdinario: new FormControl(
        typeof data === 'undefined' ? '' : data.valorPagoMinimoOrdinario,
        Validators.compose([Validators.required])
      ),
      valorPagoMinimoConPagoVoluntario: new FormControl(
        typeof data === 'undefined'
          ? ''
          : data.valorPagoMinimoConPagoVoluntario,
        Validators.compose([Validators.required])
      ),
      valorPagoMinimoExtraOrdinario: new FormControl(
        typeof data === 'undefined' ? '' : data.valorPagoMinimoExtraOrdinario,
        Validators.compose([Validators.required])
      ),
      valorPagoMinimoExtraOrdinarioConPagoVoluntario: new FormControl(
        typeof data === 'undefined'
          ? ''
          : data.valorPagoMinimoExtraOrdinarioConPagoVoluntario,
        Validators.compose([Validators.required])
      ),
    });
    this.formRegistro.get('fechaLimitePagoOrdinario')?.valueChanges.subscribe(response => {
      this.fechaLimPagoOrdinario = new Date(response);
    })
  }

  getTipoBien(): void {
    const tipoBienSeleccionado = this.dialogData.datos?.tipoBien;
    this.gestionBienesService.getTiposBienes().subscribe((response) => {
      this.tiposBien = response;
      if (tipoBienSeleccionado) {
        this.tipoBienSeleccionado = this.tiposBien.filter(
          (elem) => elem.id === tipoBienSeleccionado.id
        )[0].id;
      }
    });
  }

  getPeriodicidadImpuesto(): void {
    const periodicidadSeleccionado = this.dialogData.datos?.periodicidad;
    if (periodicidadSeleccionado) {
      this.periodicidadSeleccionado = this.periodicidadImpuesto.filter(
        (elem) => elem.valor === this.cambioDatoPeriodicidad(periodicidadSeleccionado)
      )[0].id;
    }
  }

  cambioDatoPeriodicidad(periodicidad: string): string {
    switch (periodicidad) {
      case 'ANUAL':
        return 'CA';
      case 'SEMESTRAL':
        return 'CSM';
      case 'UNICO':
        return 'U';
      default:
        return periodicidad;
    }
  }
}
