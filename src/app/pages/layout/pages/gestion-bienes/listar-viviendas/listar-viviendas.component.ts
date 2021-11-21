import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Comercio } from '@core/models/comercio.model';
import { GestionBienesService } from '@core/services/gestion-bienes/gestion-bienes.service';
import { GestionImpuestoService } from '@core/services/gestion-impuestos/gestion-impuestos.service';
import { DetalleContribuyenteComponent } from '../detalle-contribuyente/detalle-contribuyente.component';
import { DetalleImpuestoBienComponent } from '../detalle-impuesto-bien/detalle-impuesto-bien.component';

@Component({
  selector: 'app-listar-viviendas',
  templateUrl: './listar-viviendas.component.html',
  styleUrls: ['./listar-viviendas.component.scss'],
})
export class ListarViviendasComponent implements OnInit {
  displayedColumns: string[] = [
    'CedulaCatrastal',
    'DireccionPredio',
    'Estrato',
    'Construccion',
    'Terreno',
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
    this.getAllViviendas();
  }

  getAllViviendas(): void {
    this.gestionBienesService
      .getAllViviendas()
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
        tipo: 'vivienda',
        acceptDialog: 'Cerrar',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  verDetalleImpuestos(bien: any): void {
    this.gestionBienesService.getDetalleVivienda(bien.cedulaCatrastal).subscribe(response => {
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
