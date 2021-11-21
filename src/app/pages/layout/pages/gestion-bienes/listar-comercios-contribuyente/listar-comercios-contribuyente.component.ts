import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Comercio} from '@core/models/comercio.model';
import {GestionBienesService} from '@core/services/gestion-bienes/gestion-bienes.service';
import {GestionImpuestoService} from '@core/services/gestion-impuestos/gestion-impuestos.service';
import {environment} from 'src/environments/environment';
import {DetalleImpuestoBienComponent} from '../detalle-impuesto-bien/detalle-impuesto-bien.component';
import {DialogCreacionEdicionListadoComercioContribuyenteComponent} from './components/dialog/dialog.component';
import {Subscription} from 'rxjs';
import {UserService} from '@core/services/user/user.service';

@Component({
  selector: 'app-listar-comercios-contribuyente',
  templateUrl: './listar-comercios-contribuyente.component.html',
  styleUrls: ['./listar-comercios-contribuyente.component.scss'],
})
export class ListarComerciosContribuyenteComponent implements OnInit {
  displayedColumns: string[] = [
    'Nit',
    'NombreEstablecimientoComercial',
    'CodigoActividad',
    'BaseGravableActividad',
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
      this.getAllComercios(response.numeroIdentificacion);
    });
  }

  getAllComercios(numeroIdentificacion: string): void {
    this.gestionBienesService
      .getAllComerciosContribuyente(numeroIdentificacion)
      .subscribe((response: Comercio[]) => {
        this.dataSource = response;
      });
  }

  accionRegistro(registro?: any): void {
    const dialogRef = this.dialog.open(DialogCreacionEdicionListadoComercioContribuyenteComponent, {
      width: '800px',
      panelClass: 'custom-modalbox',
      data: {
        headerDialog: `Comercio del contribuyente`,
        parametros: registro,
        accion: registro ? 'editar' : 'agregar',
        acceptDialog: registro ? 'Editar' : 'Registrar',
        cancelDialog: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.getAllComercios(this.dataUser.numeroIdentificacion);
      }, 250);
    });
  }

  verDetalleImpuestos(comercio: any): void {
    this.gestionBienesService.getDetalleComercio(comercio.nit).subscribe(response => {
      this.gestionImpuestoService.getImpuestosBien(response.bien.id).subscribe((responseImp: any) => {
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
