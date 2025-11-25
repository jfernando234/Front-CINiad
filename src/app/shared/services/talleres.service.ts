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
    return this.http.get<ITaller[]>(`${this.apiUrl}talleres`);
  }
  obetenerTalleresId(tallerId: number):  Observable<ITaller> {
    return this.http.get<ITaller>(`${this.apiUrl}talleres/${tallerId}`);
  }
  agregarTalleres(taller: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}talleres`, taller);
  }
  editarTalleres(tallerId: number,taller: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}talleres/${tallerId}`, taller);
  }
  eliminarTalleres(tallerId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}talleres/${tallerId}`);
  }
}
