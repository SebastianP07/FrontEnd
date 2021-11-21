import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Impuesto } from './../../models/impuesto.model';

@Injectable({
  providedIn: 'root'
})
export class GestionImpuestoService {

  constructor(private readonly http: HttpClient) { }

  getImpuestos(): Observable<any> {
    return this.http.get(`${environment.pathImpuesto}/impuesto`);
  }

  getImpuestosContribuyente(identificacion: string): Observable<any> {
    return this.http.get(`${environment.pathImpuesto}/impuesto/listarImpuestosContribuyenbte/${identificacion}`);
  }

  editarContribuyente(impuesto: Impuesto): Observable<any> {
    return this.http.put(`${environment.pathImpuesto}/impuesto/editar/${impuesto.id}`, impuesto);
  }

  agregarContribuyente(impuesto: Impuesto): Observable<any> {
    return this.http.post(`${environment.pathImpuesto}/impuesto/registrar`, impuesto);
  }

  getImpuestosBien(id: string): Observable<any> {
    return this.http.get(`${environment.pathImpuesto}/impuesto/listarImpuestosBien/${id}`);
  }

  asignarImpuestoBienes(impuesto: any): Observable<any> {
    return this.http.post(`${environment.pathImpuesto}/impuesto/asignarImpuestoBienes`, impuesto);
  }
}
