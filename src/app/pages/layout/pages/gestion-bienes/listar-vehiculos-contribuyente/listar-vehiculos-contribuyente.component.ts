import {Vehiculo} from './../../../../../core/models/Vehiculo.model';
import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {GestionBienesService} from '@core/services/gestion-bienes/gestion-bienes.service';
import {DialogCreacionEdicionListadoVehiculosCOntribuyenteComponent} from './components/dialog/dialog.component';
import {GestionImpuestoService} from '@core/services/gestion-impuestos/gestion-impuestos.service';
import {DetalleImpuestoBienComponent} from '../detalle-impuesto-bien/detalle-impuesto-bien.component';
import {Subscription} from 'rxjs';
import {UserService} from '@core/services/user/user.service';

@Component({
  selector: 'app-listar-vehiculos-contribuyente',
  templateUrl: './listar-vehiculos-contribuyente.component.html',
  styleUrls: ['./listar-vehiculos-contribuyente.component.scss'],
})
export class ListarVehiculosContribuyenteComponent implements OnInit {
  displayedColumns: string[] = [
    'Placa',
    'Marca',
    'Linea',
    'Modelo',
    'Uso',
    'Impuestos',
    ' '
  ];
  dataSource: Vehiculo[] = [];
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
      this.getAllVehiculos(response.numeroIdentificacion);
    });
  }

  getAllVehiculos(numeroIdentificacion: string): void {
    this.gestionBienesService
      .getAllVehiculosContribuyente(numeroIdentificacion)
      .subscribe((response: Vehiculo[]) => {
        this.dataSource = response;
      });
  }

  accionRegistro(registro?: any): void {
    const dialogRef = this.dialog.open(DialogCreacionEdicionListadoVehiculosCOntribuyenteComponent, {
      width: '800px',
      panelClass: 'custom-modalbox',
      data: {
        headerDialog: `Vehiculo del contribuyente`,
        parametros: {
          vehiculo: registro,
          usuario: this.dataUser
        },
        accion: registro ? 'editar' : 'agregar',
        acceptDialog: registro ? 'Editar' : 'Registrar',
        cancelDialog: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.getAllVehiculos(this.dataUser.numeroIdentificacion);
      }, 250);
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
