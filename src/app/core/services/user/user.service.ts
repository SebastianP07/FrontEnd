import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatosUsuario } from '@core/models/usuario.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private datosUsuario!: any;
  private usuario = new BehaviorSubject<any>(undefined);
  datosUsuario$ = this.usuario.asObservable();

  constructor(private readonly http: HttpClient) { }

  agregarDatosUsuario(datosUsuario: any): void {
    this.datosUsuario = datosUsuario;
    localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
    this.usuario.next(this.datosUsuario);
  }

  eliminarDatosUsuario(): void {
    this.datosUsuario = undefined;
    this.usuario.next(this.datosUsuario);
  }

  actualizarDataUsuario(detalleContribuyente: any): void {
    debugger
    let storage = localStorage.getItem('datosUsuario');
    if (storage) {
      let storageDatosUsuario = JSON.parse(storage);
      const datosUsuarioCustom = {
        ...this.datosUsuario,
        responseDataUser: storageDatosUsuario.responseDataUser,
        correoElectronico: detalleContribuyente.correoElectronico,
        direccionNotificacion: detalleContribuyente.direccionNotificacion,
        numeroIdentificacion: detalleContribuyente.numeroIdentificacion,
        primerApellido: detalleContribuyente.primerApellido,
        primerNombre: detalleContribuyente.primerNombre,
        segundoApellido: detalleContribuyente.segundoApellido,
        segundoNombre: detalleContribuyente.segundoNombre,
        telefonoPrincipal: detalleContribuyente.telefonoPrincipal,
        tipoIdentificacion: detalleContribuyente.tipoIdentificacion,
      };
      this.usuario.next(datosUsuarioCustom);
    }
  }

  getTokenUser(datosUsuario: DatosUsuario): Observable<any> {
    const body = new HttpParams()
      .set('username', datosUsuario.username)
      .set('password', datosUsuario.password)
      .set('grant_type', 'password');
    return this.http.post(`${environment.pathSeguridad}/oauth/token`, body);
  }

  getDataUser(username: string): Observable<any> {
    return this.http.get(
      `${environment.pathUsuarios}/buscar-username?username=${username}`
    );
  }

  crearUsuario(dataUser: any): Observable<any> {
    const usuario = {
      email: dataUser.correoElectronico,
      enabled: true,
      numeroIdentificacion: dataUser.numeroIdentificacion,
      password: dataUser.password,
      roles: [
        {
          "id": 2,
          "nombre": "ROLE_USER"
        }
      ],
      username: `${dataUser.primerApellido.toLowerCase()}_${dataUser.primerNombre.toLowerCase()}`
    };
    return this.http.post(`${environment.pathUsuarios}`, usuario);
  }
}
