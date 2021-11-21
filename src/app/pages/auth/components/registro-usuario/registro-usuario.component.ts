import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GestionContribuyentesService } from '@core/services/gestion-contribuyentes/gestion-contribuyentes.service';
import { UserService } from '@core/services/user/user.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss']
})
export class RegistroUsuarioComponent {
  @Output() accionRegistro: EventEmitter<string> = new EventEmitter();
  userFormReg!: FormGroup;
  tiposIdentificacion = [
    {
      id: 'cc',
      nombre: 'CC'
    },
    {
      id: 'nit',
      nombre: 'NIT'
    }
  ];

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private gestionContribuyentesService: GestionContribuyentesService, private _snackBar: MatSnackBar) {
    this.buildForms();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 50000 });
  }

  buildForms(): void {
    this.userFormReg = this.formBuilder.group({
      tipoIdentificacion: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      numeroIdentificacion: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      primerApellido: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      segundoApellido: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      primerNombre: new FormControl(
        // Valor por defecto
        '',
        // Conjunto de validaciones
        Validators.compose([Validators.required])
      ),
      segundoNombre: new FormControl(
        // Valor por defecto
        '',
        // Conjunto de validaciones
        Validators.compose([Validators.required])
      ),
      correoElectronico: new FormControl(
        // Valor por defecto
        '',
        // Conjunto de validaciones
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      telefono: new FormControl(
        // Valor por defecto
        '',
        // Conjunto de validaciones
        Validators.compose([Validators.required])
      ),
      direccion: new FormControl(
        // Valor por defecto
        '',
        // Conjunto de validaciones
        Validators.compose([Validators.required])
      ),
      password: new FormControl(
        // Valor por defecto
        '',
        // Conjunto de validaciones
        Validators.compose([Validators.required])
      ),
    });
  }

  resetForm(): void {
    this.userFormReg.reset();
    setTimeout(() => {
      this.userFormReg.markAsUntouched();
    }, 1000);
  }

  submitFormUserReg(dataUser: any): void {
    this.userService.crearUsuario(dataUser).subscribe({
      next: (response) => {
        const contribuyente = {
          correoElectronico: dataUser.correoElectronico,
          direccionNotificacion: dataUser.direccion,
          numeroIdentificacion: dataUser.numeroIdentificacion,
          primerApellido: dataUser.primerApellido,
          primerNombre: dataUser.primerNombre,
          segundoApellido: dataUser.segundoApellido,
          segundoNombre: dataUser.segundoNombre,
          telefonoPrincipal: dataUser.telefono,
          tipoIdentificacion: dataUser.tipoIdentificacion
        };
        const usuario = `${dataUser.primerApellido.toLowerCase()}_${dataUser.primerNombre.toLowerCase()}`;
        this.gestionContribuyentesService.agregarContribuyente(contribuyente).subscribe({
          next: (response) => {
            this.accionRegistro.emit();
            this.resetForm();
            this.openSnackBar(`Usuario ${usuario} creado con exito`, 'X');
          },
          error: (error) => {
            this.openSnackBar('Error al crear el contribuyente.', 'X');
            console.error(error);
          }
        });
      },
      error: (error) => {
        this.openSnackBar('Error al crear el usuario.', 'X');
        console.error(error);
      }
    })

  }
}
