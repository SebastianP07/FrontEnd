import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contribuyente } from '@core/models/contribuyente.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GestionContribuyentesService {
  constructor(private readonly http: HttpClient) {}

  getContribuyentes(): Observable<any> {
    return this.http.get(
      `${environment.pathContribuyente}/contribuyente/listar`
    );
  }

  getContribuyentesDetalle(numeroIdentificacion: string): Observable<any> {
    return this.http.get(
      `${environment.pathContribuyente}/contribuyente/detalle/${numeroIdentificacion}`
    );
  }

  editarContribuyente(contribuyente: Contribuyente): Observable<any> {
    return this.http.put(
      `${environment.pathContribuyente}/contribuyente/editar/${contribuyente.numeroIdentificacion}`,
      contribuyente
    );
  }

  agregarContribuyente(contribuyente: Contribuyente): Observable<any> {
    return this.http.post(
      `${environment.pathContribuyente}/contribuyente/registrar`,
      contribuyente
    );
  }
}
