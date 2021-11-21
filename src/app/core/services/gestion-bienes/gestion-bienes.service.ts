import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Impuesto } from './../../models/impuesto.model';

@Injectable({
  providedIn: 'root',
})
export class GestionBienesService {
  constructor(private readonly http: HttpClient) { }

  getTiposBienes(): Observable<any> {
    return this.http.get(`${environment.pathBienes}/bien/tiposBien`);
  }

  getAllVehiculos(): Observable<any> {
    return this.http.get(`${environment.pathBienes}/vehiculo/listar`);
  }

  getAllViviendas(): Observable<any> {
    return this.http.get(`${environment.pathBienes}/vivienda/listar`);
  }

  getAllComercios(): Observable<any> {
    return this.http.get(`${environment.pathBienes}/comercio/listar`);
  }

  getAllVehiculosContribuyente(numeroIdentificacion: string): Observable<any> {
    return this.http.get(
      `${environment.pathBienes}/vehiculo/contribuyente/${numeroIdentificacion}`
    );
  }

  getAllViviendasContribuyente(numeroIdentificacion: string): Observable<any> {
    return this.http.get(
      `${environment.pathBienes}/vivienda/contribuyente/${numeroIdentificacion}`
    );
  }

  getAllComerciosContribuyente(numeroIdentificacion: string): Observable<any> {
    return this.http.get(
      `${environment.pathBienes}/comercio/contribuyente/${numeroIdentificacion}`
    );
  }

  editarImpuesto(impuesto: Impuesto): Observable<any> {
    return this.http.put(`${environment.pathImpuesto}/impuesto`, impuesto);
  }

  agregarImpuesto(impuesto: Impuesto): Observable<any> {
    return this.http.post(
      `${environment.pathImpuesto}/impuesto/registrar`,
      impuesto
    );
  }

  editarVehiculoContribuyente(datosVehiculo: any): Observable<any> {
    return this.http.put(
      `${environment.pathBienes}/vehiculo/editar/${datosVehiculo.placa}`,
      datosVehiculo
    );
  }

  getDetalleVehiculo(placa: string): Observable<any> {
    return this.http.get(
      `${environment.pathBienes}/vehiculo/detalle/${placa}`
    );
  }

  agregarVehiculo(datosVehiculo: any): Observable<any> {
    return this.http.post(
      `${environment.pathBienes}/vehiculo/registrar`,
      datosVehiculo
    );
  }

  editarViviendaContribuyente(datosVivienda: any): Observable<any> {
    return this.http.put(
      `${environment.pathBienes}/vivienda/editar/${datosVivienda.cedulaCatrastal}`,
      datosVivienda
    );
  }

  getDetalleVivienda(cedulaCatrastal: string): Observable<any> {
    return this.http.get(
      `${environment.pathBienes}/vivienda/detalle/${cedulaCatrastal}`
    );
  }

  agregarVivienda(datosVivienda: any): Observable<any> {
    return this.http.post(
      `${environment.pathBienes}/vivienda/registrar`,
      datosVivienda
    );
  }


  editarComercioContribuyente(datosComercio: any): Observable<any> {
    return this.http.put(
      `${environment.pathBienes}/comercio/editar/${datosComercio.nit}`,
      datosComercio
    );
  }

  getDetalleComercio(nit: string): Observable<any> {
    return this.http.get(
      `${environment.pathBienes}/comercio/detalle/${nit}`
    );
  }

  agregarComercio(datosComercio: any): Observable<any> {
    return this.http.post(
      `${environment.pathBienes}/comercio/registrar`,
      datosComercio
    );
  }
}
