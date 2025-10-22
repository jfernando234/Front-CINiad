import { Component } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { LoginComponent } from '../autenticacion/login/login.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  constructor(
    private modalService: BsModalService,
    public authService: AuthService,
    private router: Router
  ) { }

  login() {
    const modalRef = this.modalService.show(LoginComponent);

    // Escuchar cuando se completa el login
    if (modalRef.content) {
      modalRef.content.onDistribucionFinalizada.subscribe(() => {
        // El login se completó exitosamente
        console.log('Login completado desde el modal');
      });
    }
  }
  navigateTo(path: string) {
    this.router.navigate([path]);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/inicio']);
  }

  // Redirigir al dashboard según el rol
  goToDashboard() {
    const user = this.authService.currentUser;
    if (user) {
      switch (user.rol) {
        case 'admin':
          this.router.navigate(['/admin']);
          break;
        case 'profesor':
          this.router.navigate(['/profesor']);
          break;
        case 'alumno':
          this.router.navigate(['/alumno']);
          break;
      }
    }
  }
}
