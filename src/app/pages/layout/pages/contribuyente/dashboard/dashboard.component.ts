import {Contribuyente} from '@core/models/contribuyente.model';
import {Component} from '@angular/core';
import {GestionContribuyentesService} from '@core/services/gestion-contribuyentes/gestion-contribuyentes.service';
import {Subscription} from 'rxjs';
import {UserService} from '@core/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  observableUser!: Subscription;
  displayedColumns: string[] = [
    'Tipo identificación',
    'Identificación',
    'Nombres',
    'Correo electronico',
    'Dirección',
    'Telefono',
    ' ',
  ];
  dataSource!: Contribuyente[];
  contribuyente: any;
  dataUser: any;
  rol!: number;

  constructor(private gestionContribuyentesService: GestionContribuyentesService, private userService: UserService) {
    this.getDataUser();
  }

  getDataUser(): void {
    this.observableUser = this.userService.datosUsuario$.subscribe(response => {
      this.dataUser = response;
      const rolCustom = response?.responseDataUser?.roles.find((elem: { id: number; nombre: string }) => elem.id === 1)?.id;
      this.rol = rolCustom ? rolCustom : 2;
      this.getDetalleContribuyentes(this.dataUser);
    });
  }

  getDetalleContribuyentes(dataUser: any): void {
    this.gestionContribuyentesService
      .getContribuyentesDetalle(dataUser.numeroIdentificacion)
      .subscribe((response: Contribuyente) => {
        this.contribuyente = response;
      });
  }
}
