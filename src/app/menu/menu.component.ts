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
  menuOpen = false;

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

      });
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    this.authService.logout();
    this.menuOpen = false;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  goToDashboard() {
    // Verificar autenticación antes de navegar
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/inicio']);
    }
  }
}
