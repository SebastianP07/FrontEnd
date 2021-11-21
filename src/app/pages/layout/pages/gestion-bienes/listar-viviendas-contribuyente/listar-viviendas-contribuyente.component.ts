import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Comercio} from '@core/models/comercio.model';
import {GestionBienesService} from '@core/services/gestion-bienes/gestion-bienes.service';
import {GestionImpuestoService} from '@core/services/gestion-impuestos/gestion-impuestos.service';
import {environment} from 'src/environments/environment';
import {DetalleImpuestoBienComponent} from '../detalle-impuesto-bien/detalle-impuesto-bien.component';
import {DialogCreacionEdicionListadoViviendasContribuyenteComponent} from './components/dialog/dialog.component';
import {UserService} from '@core/services/user/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-listar-viviendas-contribuyente',
  templateUrl: './listar-viviendas-contribuyente.component.html',
  styleUrls: ['./listar-viviendas-contribuyente.component.scss'],
})
export class ListarViviendasContribuyenteComponent implements OnInit {
  displayedColumns: string[] = [
    'CedulaCatrastal',
    'DireccionPredio',
    'Estrato',
    'Construccion',
    'Terreno',
    'Impuestos',
    ' '
  ];
  dataSource: Comercio[] = [];
  observableUser!: Subscription;
  dataUser: any;
  rol!: number;

  constructor(
    public dialog: MatDialog,
    private gestionBienesService: GestionBienesService,
    private gestionImpuestoService: GestionImpuestoService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.getDataUser();
  }

  getDataUser(): void {
    this.observableUser = this.userService.datosUsuario$.subscribe(response => {
      this.dataUser = response;
      const rolCustom = response?.responseDataUser?.roles.find((elem: { id: number; nombre: string }) => elem.id === 1)?.id;
      this.rol = rolCustom ? rolCustom : 2;
      this.getAllViviendas(response.numeroIdentificacion);
    });
  }

  getAllViviendas(numeroIdentificacion: string): void {
    this.gestionBienesService
      .getAllViviendasContribuyente(numeroIdentificacion)
      .subscribe((response: Comercio[]) => {
        this.dataSource = response;
      });
  }

  accionRegistro(registro?: any): void {
    const dialogRef = this.dialog.open(DialogCreacionEdicionListadoViviendasContribuyenteComponent, {
      width: '800px',
      panelClass: 'custom-modalbox',
      data: {
        headerDialog: `Vivienda del contribuyente`,
        parametros: {
          vivienda: registro,
          usuario: this.dataUser
        },
        accion: registro ? 'editar' : 'agregar',
        acceptDialog: registro ? 'Editar' : 'Registrar',
        cancelDialog: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.getAllViviendas(this.dataUser.numeroIdentificacion);
      }, 250);
    });
  }

  verDetalleImpuestos(bien: any): void {
    this.gestionBienesService.getDetalleVivienda(bien.cedulaCatrastal).subscribe(response => {
      this.gestionImpuestoService.getImpuestosBien(response.bien.id).subscribe(responseImp => {
        const dialogRef = this.dialog.open(DetalleImpuestoBienComponent, {
          width: '2000px',
          panelClass: 'custom-modalbox',
          data: {
            headerDialog: `Vivienda del contribuyente`,
            parametros: responseImp,
            cancelDialog: 'Cerrar'
          }
        });
        dialogRef.afterClosed().subscribe(result => {

        });
      });
    });
  }
}
