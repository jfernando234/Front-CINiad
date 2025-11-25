import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroments/environment';
import { Observable } from 'rxjs';
import { IActividad } from '../models/actividades';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient) { }

  obtenerAllActividades(): Observable<IActividad[]> {
    return this.http.get<IActividad[]>(`${this.apiUrl}actividades`);
  }
  obetenerActividadesId(actividadesId: number) {
    return this.http.get<IActividad>(`${this.apiUrl}actividades/${actividadesId}`);
  }
  agregarActividades(actividad: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}actividades`, actividad);
  }
  editarActividades(actividadesId: number,actividad: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}actividades/${actividadesId}`, actividad);
  }
  eliminarActividades(actividadesId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}actividades/${actividadesId}`);
  }
}
