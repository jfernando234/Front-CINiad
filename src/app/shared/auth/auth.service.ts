// services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role, User } from '../models/login';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  constructor(private router: Router) {}
  login(user: User) {
    this.currentUserSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/inicio']);
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(roles: Role[]): boolean {
    const user = this.currentUser;
    if (!user) return false;
    return roles.includes(user.rol);
  }
}
