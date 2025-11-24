import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroments/environment';
import { Observable } from 'rxjs';
import { IRecurso } from '../models/recursos';

@Injectable({
  providedIn: 'root'
})
export class RecursosService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient) { }

  obtenerAllRecursos(): Observable<IRecurso[]> {
    return this.http.get<IRecurso[]>(`${this.apiUrl}Recursos/ListarAllRecursoss`);
  }
  obetenerRecursosId(recursosId: number) {
    return this.http.get<IRecurso>(`${this.apiUrl}Recursos/ObtenerRecursosId?RecursosId=${recursosId}`);
  }
  agregarRecursos(recurso: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}Recursos/RegistrarRecursos`, recurso);
  }
  editarRecursos(recursosId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}Recursos/ModificarRecursos`, recursosId);
  }
  eliminarRecursos(recursosId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}Recursos/EliminarRecursos/${recursosId}`, null);
  }
}
