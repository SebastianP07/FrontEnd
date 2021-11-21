import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Comercio } from '@core/models/comercio.model';
import { GestionBienesService } from '@core/services/gestion-bienes/gestion-bienes.service';
import { GestionImpuestoService } from '@core/services/gestion-impuestos/gestion-impuestos.service';
import { DetalleContribuyenteComponent } from '../detalle-contribuyente/detalle-contribuyente.component';
import { DetalleImpuestoBienComponent } from '../detalle-impuesto-bien/detalle-impuesto-bien.component';

@Component({
  selector: 'app-listar-comercios',
  templateUrl: './listar-comercios.component.html',
  styleUrls: ['./listar-comercios.component.scss'],
})
export class ListarComerciosComponent implements OnInit {
  displayedColumns: string[] = [
    'Nit',
    'NombreEstablecimientoComercial',
    'CodigoActividad',
    'BaseGravableActividad',
    'Contribuyente',
    'Impuestos',
  ];
  dataSource: Comercio[] = [];

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
      .getAllComercios()
      .subscribe((response: Comercio[]) => {
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
        tipo: 'comercios',
        acceptDialog: 'Cerrar',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  verDetalleImpuestos(comercio: any): void {
    this.gestionBienesService.getDetalleComercio(comercio.nit).subscribe(response => {
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
