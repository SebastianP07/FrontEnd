import { Vehiculo } from './../../../../../core/models/Vehiculo.model';
import { GestionBienesService } from './../../../../../core/services/gestion-bienes/gestion-bienes.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { DetalleContribuyenteComponent } from '../detalle-contribuyente/detalle-contribuyente.component';
import { DetalleImpuestoBienComponent } from '../detalle-impuesto-bien/detalle-impuesto-bien.component';
import { GestionImpuestoService } from '@core/services/gestion-impuestos/gestion-impuestos.service';

@Component({
  selector: 'app-listar-vehiculos',
  templateUrl: './listar-vehiculos.component.html',
  styleUrls: ['./listar-vehiculos.component.scss'],
})
export class ListarVehiculosComponent implements OnInit {
  displayedColumns: string[] = [
    'Placa',
    'Marca',
    'Linea',
    'Modelo',
    'Uso',
    'Contribuyente',
    'Impuestos',
  ];
  dataSource: Vehiculo[] = [];

  constructor(
    public dialog: MatDialog,
    private gestionBienesService: GestionBienesService,
    private gestionImpuestoService: GestionImpuestoService
  ) { }

  ngOnInit(): void {
    this.getAllVehiculos();
  }

  getAllVehiculos(): void {
    this.gestionBienesService
      .getAllVehiculos()
      .subscribe((response: Vehiculo[]) => {
        this.dataSource = response;
      });
  }

  verDetalleContribuyente(contribuyenteSeleccionado: any): void {
    const dialogRef = this.dialog.open(DetalleContribuyenteComponent, {
      width: '800px',
      panelClass: 'custom-modalbox',
      data: {
        headerDialog: `Detalle del contribuyente`,
        contribuyente: contribuyenteSeleccionado,
        tipo: 'vehiculos',
        acceptDialog: 'Cerrar',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  verDetalleImpuestos(vehiculo: any): void {
    this.gestionBienesService.getDetalleVehiculo(vehiculo.placa).subscribe(response => {
      this.gestionImpuestoService.getImpuestosBien(response.bien.id).subscribe(response => {
        const dialogRef = this.dialog.open(DetalleImpuestoBienComponent, {
          width: '2000px',
          panelClass: 'custom-modalbox',
          data: {
            headerDialog: `Vivienda del contribuyente`,
            parametros: response,
            cancelDialog: 'Cerrar'
          }
        });
        dialogRef.afterClosed().subscribe(result => {

        });
      });
    });
  }
}
