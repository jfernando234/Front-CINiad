import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroments/environment';
import { Observable } from 'rxjs';
import { ITaller } from '../models/talleres';

@Injectable({
  providedIn: 'root'
})
export class TalleresService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient) { }

  obtenerAllTalleres(): Observable<ITaller[]> {
    return this.http.get<ITaller[]>(`${this.apiUrl}Talleres/ListarAllTalleress`);
  }
  obetenerTalleresId(tallerId: number) {
    return this.http.get<ITaller>(`${this.apiUrl}Talleres/ObtenerTalleresId?TalleresId=${tallerId}`);
  }
  agregarTalleres(taller: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}Talleres/RegistrarTalleres`, taller);
  }
  editarTalleres(tallerId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}Talleres/ModificarTalleres`, tallerId);
  }
  eliminarTalleres(tallerId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}Talleres/EliminarTalleres/${tallerId}`, null);
  }
}
