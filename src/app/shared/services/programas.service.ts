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
    return this.http.get<IProgramas[]>(`${this.apiUrl}Programas/ListarAllProgramass`);
  }
  obetenerProgramasId(programasId: number) {
    return this.http.get<IProgramas>(`${this.apiUrl}Programas/ObtenerProgramasId?ProgramasId=${programasId}`);
  }
  agregarProgramas(programa: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}Programas/RegistrarProgramas`, programa);
  }
  editarProgramas(programasId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}Programas/ModificarProgramas`, programasId);
  }
  eliminarProgramas(programasId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}Programas/EliminarProgramas/${programasId}`, null);
  }
}
