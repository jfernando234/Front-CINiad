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
    return this.http.get<ITerapia[]>(`${this.apiUrl}terapias`);
  }
  obetenerTerapiasId(terapiasId: number):  Observable<ITerapia>{
    return this.http.get<ITerapia>(`${this.apiUrl}terapias/${terapiasId}`);
  }
  agregarTerapias(terapia: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}terapias`, terapia);
  }
  editarTerapias(terapiasId: number,terapia: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}terapias/${terapiasId}`, terapia);
  }
  eliminarTerapias(terapiasId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}terapias/${terapiasId}`);
  }
}

