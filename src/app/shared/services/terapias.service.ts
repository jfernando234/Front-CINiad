import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroments/environment';
import { ITerapia } from '../models/terapias';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerapiasService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient) { }

  obtenerAllTerapias(): Observable<ITerapia[]> {
    return this.http.get<ITerapia[]>(`${this.apiUrl}Terapias/ListarAllTerapiass`);
  }
  obetenerTerapiasId(terapiasId: number) {
    return this.http.get<ITerapia>(`${this.apiUrl}Terapias/ObtenerTerapiasId?TerapiasId=${terapiasId}`);
  }
  agregarTerapias(terapia: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}Terapias/RegistrarTerapias`, terapia);
  }
  editarTerapias(terapiasId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}Terapias/ModificarTerapias`, terapiasId);
  }
  eliminarTerapias(terapiasId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}Terapias/EliminarTerapias/${terapiasId}`, null);
  }
}

