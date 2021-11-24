import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GestionContribuyentesService } from '@core/services/gestion-contribuyentes/gestion-contribuyentes.service';
import { UserService } from '@core/services/user/user.service';

@Component({
  selector: 'app-datos-contribuyente',
  templateUrl: './datos-contribuyente.component.html',
  styleUrls: ['./datos-contribuyente.component.scss']
})
export class DatosContribuyenteComponent implements OnInit {
  userForm!: FormGroup;
  dataUser: any;
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

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar,
    private gestionContribuyentesService: GestionContribuyentesService,
    private router: Router, private userService: UserService) {
    this.userService.datosUsuario$.subscribe(response => {
      this.dataUser = response;
      this.buildForm();
    })
  }

  ngOnInit(): void {
  }

  buildForm(): void {
    this.userForm = this.formBuilder.group({
      tipoIdentificacion: new FormControl(
        'CC',
        Validators.compose([Validators.required])
      ),
      numeroIdentificacion: new FormControl(
        (this.dataUser?.numeroIdentificacion) ? this.dataUser.numeroIdentificacion : '',
        Validators.compose([Validators.required])
      ),
      primerApellido: new FormControl(
        this.dataUser.primerApellido,
        Validators.compose([Validators.required])
      ),
      segundoApellido: new FormControl(
        this.dataUser.segundoApellido,
        Validators.compose([Validators.required])
      ),
      primerNombre: new FormControl(
        this.dataUser.primerNombre,
        Validators.compose([Validators.required])
      ),
      segundoNombre: new FormControl(
        this.dataUser.segundoNombre,
        Validators.compose([Validators.required])
      ),
      correoElectronico: new FormControl(
        this.dataUser.correoElectronico,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      telefono: new FormControl(
        this.dataUser.telefonoPrincipal,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+$'),
        ])
      ),
      direccion: new FormControl(
        this.dataUser.direccionNotificacion,
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
      this.openSnackBar('Usuario actualizado con éxito', 'X');
      this.actualizacionDatosUsuario(dataUserCustom.numeroIdentificacion);
    });
  }

  actualizacionDatosUsuario(numeroIdentificacion: any): void {
    this.gestionContribuyentesService.getContribuyentesDetalle(numeroIdentificacion).subscribe(responseDataUser => {
      this.userService.actualizarDataUsuario(responseDataUser);
    });
  }

}
