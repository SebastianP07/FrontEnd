import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@core/services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnDestroy {
  observableUser!: Subscription;
  selected = new FormControl(0);

  constructor(private userService: UserService, private router: Router) {
    this.validarDatosUsuario();
  }

  ngOnDestroy(): void {
    this.observableUser.unsubscribe();
  }

  validarDatosUsuario(): void {
    this.observableUser = this.userService.datosUsuario$.subscribe(
      (response) => {
        if (response) {
          if (response.rol === 1) {
            this.router.navigate(['/gestion-impuestos']);
          } else {
            this.router.navigate(['/contribuyente/dashboard']);
          }
        }
      }
    );
  }

  mostrarInicioSesion(): void {
    this.selected.setValue(0);
  }
}
