import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@core/services/user/user.service';
import { GestionContribuyentesService } from '@core/services/gestion-contribuyentes/gestion-contribuyentes.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent {
  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private snackBar: MatSnackBar,
    private gestionContribuyentesService: GestionContribuyentesService, private router: Router) {
    this.buildForm();
  }

  buildForm(): void {
    this.userForm = this.formBuilder.group({
      username: new FormControl(
        // Valor por defecto
        '',
        // Conjunto de validaciones
        Validators.compose([
          Validators.required,
          // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      password: new FormControl(
        // Valor por defecto
        '',
        // Conjunto de validaciones
        Validators.compose([Validators.required, Validators.minLength(4)])
      ),
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, { duration: 2000 });
  }

  submitFormUserLogin(dataUser: any): void {
    dataUser.grant_type = 'password';
    this.userService.getDataUser(dataUser.username).subscribe({
      next: responseDataUser => {
        this.gestionContribuyentesService
          .getContribuyentesDetalle(responseDataUser.numeroIdentificacion)
          .subscribe((responseDetalleContribuyente) => {
            const dataUserCustom = {
              responseDataUser,
              ...responseDetalleContribuyente,
              // responseTokenUser
            };
            this.userService.agregarDatosUsuario(dataUserCustom);
            if (
              dataUserCustom.responseDataUser.roles.find(
                (elem: { id: number; nombre: string }) => elem.id === 1
              )
            ) {
              this.router.navigate(['/gestion-impuestos']);
            } else {
              this.router.navigate(['/impuestos']);
            }
          });
      },
      error: (error) => {
        this.openSnackBar('Usuario inválido.', 'X');
      }
    });
    // this.userService.getTokenUser(dataUser).subscribe(
    //   (responseTokenUser) => {

    //   },
    //   (error) => {
    //     console.error(error);
    //     this.openSnackBar('Usuario y/o contraseña incorrectos', 'X');
    //   }
    // );
  }
}
