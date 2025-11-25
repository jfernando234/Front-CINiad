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
    return this.http.get<IRecurso[]>(`${this.apiUrl}recursos`);
  }
  obetenerRecursosId(recursosId: number): Observable<IRecurso>  {
    return this.http.get<IRecurso>(`${this.apiUrl}recursos/${recursosId}`);
  }
  agregarRecursos(recurso: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}recursos`, recurso);
  }
  editarRecursos(recursosId: number,recurso: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}recursos/${recursosId}`, recurso);
  }
  eliminarRecursos(recursosId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}recursos/${recursosId}`);
  }
}
