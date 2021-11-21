import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '@core/services/user/user.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionContribuyentesService } from '@core/services/gestion-contribuyentes/gestion-contribuyentes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  headerDialog: string;
  data: any;
  cancelDialog: string;
}

@Component({
  selector: 'app-dialog-datos-usuario',
  templateUrl: './dialog-datos-usuario.component.html',
  styleUrls: ['./dialog-datos-usuario.component.scss']
})
export class DialogDatosUsuarioComponent implements OnInit {
  dataUser!: any;
  userForm!: FormGroup;
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
  tipoIdentificacionSeleccionado = 'cc';

  constructor(
    public dialogRef: MatDialogRef<DialogDatosUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private gestionContribuyentesService: GestionContribuyentesService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.buildForm();
  }

  buildForm(): void {
    const dataUser = this.dialogData.data;
    this.userForm = this.formBuilder.group({
      tipoIdentificacion: new FormControl(
        'CC',
        Validators.compose([Validators.required])
      ),
      numeroIdentificacion: new FormControl(
        dataUser.numeroIdentificacion,
        Validators.compose([Validators.required])
      ),
      primerApellido: new FormControl(
        dataUser.primerApellido,
        Validators.compose([Validators.required])
      ),
      segundoApellido: new FormControl(
        dataUser.segundoApellido,
        Validators.compose([Validators.required])
      ),
      primerNombre: new FormControl(
        dataUser.primerNombre,
        Validators.compose([Validators.required])
      ),
      segundoNombre: new FormControl(
        dataUser.segundoNombre,
        Validators.compose([Validators.required])
      ),
      correoElectronico: new FormControl(
        dataUser.correoElectronico,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      telefono: new FormControl(
        dataUser.telefonoPrincipal,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+$'),
        ])
      ),
      direccion: new FormControl(
        dataUser.direccionNotificacion,
        Validators.compose([Validators.required])
      ),
    });
    this.userForm.get('tipoIdentificacion')?.disable();
    this.userForm.get('numeroIdentificacion')?.disable();
    this.userForm.get('primerApellido')?.disable();
    this.userForm.get('segundoApellido')?.disable();
    this.userForm.get('primerNombre')?.disable();
    this.userForm.get('segundoNombre')?.disable();
  }

  ngOnInit(): void {
    this.dataUser = this.dialogData.data;
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, { duration: 2000 });
  }

  submitFormuser(data: any): void {
    const dataUserCustom = {
      correoElectronico: data.correoElectronico,
      direccionNotificacion: data.direccion,
      telefonoPrincipal: data.telefono,
      numeroIdentificacion: this.dataUser.numeroIdentificacion,
      primerApellido: this.dataUser.primerApellido,
      primerNombre: this.dataUser.primerNombre,
      segundoApellido: this.dataUser.segundoApellido,
      segundoNombre: this.dataUser.segundoNombre,
      tipoIdentificacion: this.dataUser.tipoIdentificacion
    };
    this.gestionContribuyentesService.editarContribuyente(dataUserCustom).subscribe(response => {
      this.dialogRef.close();
      this.openSnackBar('Usuario actualizado con éxito', 'X');
      this.actualizacionDatosUsuario(dataUserCustom.numeroIdentificacion);
    });
  }

  cerrarSesion(): void {
    localStorage.removeItem('datosUsuario');
    this.userService.eliminarDatosUsuario();
    this.dialogRef.close('cerrar sesion');
    this.router.navigate(['/auth']);
  }

  actualizacionDatosUsuario(numeroIdentificacion: any): void {
    this.gestionContribuyentesService.getContribuyentesDetalle(numeroIdentificacion).subscribe(responseDataUser => {
      this.userService.actualizarDataUsuario(responseDataUser);
    });
  }

}
