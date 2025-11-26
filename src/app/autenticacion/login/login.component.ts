import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public username = '';
  public password = '';
  errorMessage = '';
  loading = false;

  @Output() onDistribucionFinalizada = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    public bsModalRef: BsModalRef,
    private router: Router
  ) { }

  login() {
    this.errorMessage = '';
    this.loading = true;

    // Validar campos requeridos
    if (!this.username || !this.password) {
      this.errorMessage = 'Usuario y contraseña son requeridos';
      this.loading = false;
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.loading = false;
        // Emitir evento de login completado
        this.onDistribucionFinalizada.emit();
        // Cerrar modal
        this.bsModalRef.hide();
        // Redirigir según el usuario o a dashboard por defecto
        this.router.navigate(['/admin']);
        localStorage.setItem('access_token', response.access_token);
      },
      error: (err) => {
        this.loading = false;
        console.error('Login error', err);

        if (err.status === 401) {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        } else if (err.status === 0) {
          this.errorMessage = 'Error de conexión con el servidor';
        } else {
          this.errorMessage = 'Error al iniciar sesión';
        }
      }
    });
  }
}
