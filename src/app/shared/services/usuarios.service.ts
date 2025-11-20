import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroments/environment';
import { IUsuario, ListUsuario } from '../models/usuarios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient) { }

  obtenerAllUsuarios(): Observable<ListUsuario[]> {
    return this.http.get<ListUsuario[]>(`${this.apiUrl}Usuario/ListarAllUsuarios`);
  }
  obetenerUsuarioId(usuarioId: number) {
    return this.http.get<IUsuario>(`${this.apiUrl}Usuario/ObtenerUsuarioId?usuarioId=${usuarioId}`);
  }
  agregarUsuario(usuario: IUsuario): Observable<any> {
    return this.http.post(`${this.apiUrl}Usuario/RegistrarUsuario`, usuario);
  }
  editarUsuario(usuarioId: IUsuario): Observable<any> {
    return this.http.put(`${this.apiUrl}Usuario/ModificarUsuario`, usuarioId);
  }

  eliminarUsuario(usuarioId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}Usuario/EliminarUsuario/${usuarioId}`, null);
  }
}
