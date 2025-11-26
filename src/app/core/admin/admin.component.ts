import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(public authService: AuthService) { }
  get userName(): string {
    return this.authService.getCurrentUser()?.username || 'Usuario';
  }
  sidebarCollapsed = false;
  sidebarOpen = false; // para móvil

  toggleSidebar() {
    if (window.innerWidth < 768) {
      // en móvil, solo abrir/cerrar
      this.sidebarOpen = !this.sidebarOpen;
    } else {
      // en desktop, retraer/expandir
      this.sidebarCollapsed = !this.sidebarCollapsed;
    }
  }
}
