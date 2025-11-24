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
    return this.http.get<IActividad[]>(`${this.apiUrl}Actividades/ListarAllActividadess`);
  }
  obetenerActividadesId(actividadesId: number) {
    return this.http.get<IActividad>(`${this.apiUrl}Actividades/ObtenerActividadesId?ActividadesId=${actividadesId}`);
  }
  agregarActividades(actividad: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}Actividades/RegistrarActividades`, actividad);
  }
  editarActividades(actividadesId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}Actividades/ModificarActividades`, actividadesId);
  }
  eliminarActividades(actividadesId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}Actividades/EliminarActividades/${actividadesId}`, null);
  }
}
