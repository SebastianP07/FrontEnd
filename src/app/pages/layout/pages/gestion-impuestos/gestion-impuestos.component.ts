import { Impuesto } from './../../../../core/models/impuesto.model';
import { GestionImpuestoService } from './../../../../core/services/gestion-impuestos/gestion-impuestos.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreacionEdicionComponent } from './components/dialog-creacion-edicion/dialog-creacion-edicion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { GestionContribuyentesService } from '@core/services/gestion-contribuyentes/gestion-contribuyentes.service';
import { Contribuyente } from '@core/models/contribuyente.model';
import { GestionBienesService } from '@core/services/gestion-bienes/gestion-bienes.service';
@Component({
  selector: 'app-gestion-impuestos',
  templateUrl: './gestion-impuestos.component.html',
  styleUrls: ['./gestion-impuestos.component.scss']
})
export class GestionImpuestosComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'TipoBien', 'Estado', 'Obligatorio', 'FechaLimitePagoOrdinario', 'FechaLimitePagoExtraOrdinario', 'VerMas', 'AsignarImpuestoBienes'];
  dataSource: Impuesto[] = [];
  impuestosMora!: { cantidad: number, descipcion: string };
  cantidadContribuyentes!: { cantidad: number, descipcion: string };
  cantidadBienes!: { cantidad: number, descipcion: string };

  constructor(public dialog: MatDialog, private gestionImpuestosService: GestionImpuestoService, private _snackBar: MatSnackBar,
    private gestionContribuyentesService: GestionContribuyentesService, private gestionBienesService: GestionBienesService,) {
  }

  ngOnInit(): void {
    this.getAllImpuestos();
    this.calcularCantidadContribuyentes();
    this.calcularCantidadBienes();
  }

  getAllImpuestos(): void {
    this.gestionImpuestosService.getImpuestos().subscribe((response: Impuesto[]) => {
      this.dataSource = response;
      this.dataSource.map(elem => elem.asignado = false);
      this.calcularImpuestosMora(response);
    });
  }

  accionRegistro(registro?: any): void {
    const dialogRef = this.dialog.open(DialogCreacionEdicionComponent, {
      width: '800px',
      panelClass: 'custom-modalbox',
      data: {
        headerDialog: `Contribuyente`,
        datos: registro,
        accion: registro ? 'editar' : 'agregar',
        acceptDialog: registro ? 'Editar' : 'Registrar',
        cancelDialog: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllImpuestos();
    });
  }

  asignarImpuestoBienes(impuesto: Impuesto): void {
    impuesto.asignado = true;
    this.gestionImpuestosService.asignarImpuestoBienes(impuesto).subscribe({
      next: (response) => {
        this._snackBar.open('Impuesto asignado con éxito.', 'X', {
          duration: 2000,
        })
      },
      error: (err) => {
        this._snackBar.open('Impuesto ya asignado.', 'X', {
          duration: 2000,
        })
      }
    });
  }

  calcularImpuestosMora(impuestos: Impuesto[]): void {
    this.impuestosMora = {
      cantidad: impuestos.filter(elem => moment(elem.fechaLimitePagoExtraOrdinario) < moment(new Date())).length,
      descipcion: 'Impuestos en mora'
    }
  }

  calcularCantidadContribuyentes(): void {
    this.gestionContribuyentesService.getContribuyentes().subscribe((response: Contribuyente[]) => {
      this.cantidadContribuyentes = {
        cantidad: response.length,
        descipcion: 'Cantidad de contribuyentes'
      }
    });
  }

  calcularCantidadBienes(): void {
    let comercios = 0;
    let vehiculos = 0;
    let viviendas = 0;
    this.gestionBienesService.getAllComercios().subscribe(response => {
      comercios = response.length;
      this.gestionBienesService.getAllVehiculos().subscribe(response => {
        vehiculos = response.length;
        this.gestionBienesService.getAllViviendas().subscribe(response => {
          viviendas = response.length;
          this.cantidadBienes = {
            cantidad: comercios + vehiculos + viviendas,
            descipcion: 'Cantidad de bienes'
          }
        });
      });
    });
  }
}
