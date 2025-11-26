// services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginResponse, RegisterRequest, UserPublic } from '../models/login';
import { environment } from '../enviroments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiURL + 'auth/';
  private currentUserSubject = new BehaviorSubject<UserPublic | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient,private router:Router) {
    // Cargar usuario desde localStorage al inicializar
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  // REGISTER - usa JSON
  register(username: string, password: string): Observable<UserPublic> {
    const data = { username, password };
    return this.http.post<UserPublic>(`${this.apiUrl}register`, data);
  }

  // LOGIN - usa x-www-form-urlencoded
  login(username: string, password: string): Observable<LoginResponse> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<LoginResponse>(`${this.apiUrl}login`, body.toString(), { headers })
      .pipe(
        tap(response => {
          // Guardar token
          localStorage.setItem('access_token', response.access_token);

          // Guardar usuario
          const user: UserPublic = {
            id: response.id,
            username: response.username
          };
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/inicio'])
  }

  getCurrentUser(): UserPublic | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

}
