// guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: any): boolean {
    const user = this.authService.currentUser;
    const requiredRoles = route.data?.['roles'] as string[];

    // Si no hay usuario, redirigir al inicio
    if (!user) {
      this.router.navigate(['/inicio']);
      return false;
    }

    // Si hay roles requeridos, verificar que el usuario tenga uno de ellos
    if (requiredRoles && !requiredRoles.includes(user.rol)) {
      // Redirigir según el rol del usuario
      switch (user.rol) {
        case 'admin':
          this.router.navigate(['/admin']);
          break;
        default:
          this.router.navigate(['/inicio']);
      }
      return false;
    }

    return true;
  }
}
