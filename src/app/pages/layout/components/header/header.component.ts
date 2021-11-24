import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {UserService} from '@core/services/user/user.service';
import {Subscription} from 'rxjs';
import {DialogDatosUsuarioComponent} from './components/dialog-datos-usuario/dialog-datos-usuario.component';
import {GestionContribuyentesService} from "@core/services/gestion-contribuyentes/gestion-contribuyentes.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  observableUser!: Subscription;
  dataUser: any;
  rol!: number;

  constructor(public dialog: MatDialog, private userService: UserService, private router: Router,
              private gestionContribuyentesService: GestionContribuyentesService) {
  }

  ngOnInit(): void {
    this.observableUser = this.userService.datosUsuario$.subscribe(response => {
      this.dataUser = response;
      const rolCustom = response?.responseDataUser?.roles.find((elem: { id: number; nombre: string }) => elem.id === 1)?.id;
      this.rol = rolCustom ? rolCustom : 2;
    });
  }

  ngOnDestroy(): void {
    this.observableUser.unsubscribe();
  }

  abirDatosUsuario(): void {
    this.gestionContribuyentesService.getContribuyentesDetalle(this.dataUser.numeroIdentificacion).subscribe({
      next: (response) => {
        const dialogRef = this.dialog.open(DialogDatosUsuarioComponent, {
          width: '600px',
          panelClass: 'custom-modalbox',
          data: {
            headerDialog: 'Datos del usuario',
            data: {
              ...this.dataUser,
              ...response
            },
            cancelDialog: 'Cerrar'
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result === 'cerrar sesion') {
            this.router.navigate(['/auth']);
          }
        });
      },
      error: (error) => console.log
    });

  }

}
