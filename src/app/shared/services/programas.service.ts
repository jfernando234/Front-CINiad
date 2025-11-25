import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroments/environment';
import { Observable } from 'rxjs';
import { IProgramas } from '../models/programas';

@Injectable({
  providedIn: 'root'
})
export class ProgramasService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient) { }

  obtenerAllProgramas(): Observable<IProgramas[]> {
    return this.http.get<IProgramas[]>(`${this.apiUrl}programas`);
  }
  obetenerProgramasId(programasId: number) {
    return this.http.get<IProgramas>(`${this.apiUrl}programas/${programasId}`);
  }
  agregarProgramas(programa: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}programas`, programa);
  }
  editarProgramas(programasId: number,programa: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}programas/${programasId}`, programa);
  }
  eliminarProgramas(programasId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}programas/${programasId}`);
  }
}
