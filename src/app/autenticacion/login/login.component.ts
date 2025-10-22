import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Role } from 'src/app/shared/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public username = '';
  public password ='';
  errorMessage = '';

  @Output() onDistribucionFinalizada = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    public bsModalRef: BsModalRef,
    private router: Router
  ) { }

  login() {
    let user;
    if (this.username === 'admin') {
      user = { id: 1, nombre: 'Admin', rol: 'admin' as Role };
    } else if (this.username === 'profesor') {
      user = { id: 2, nombre: 'Profesor', rol: 'profesor' as Role };
    } else if (this.username === 'alumno') {
      user = { id: 3, nombre: 'Alumno', rol: 'alumno' as Role };
    } else {
      this.errorMessage = 'Usuario o contraseña incorrecta';
      return;
    }

    this.authService.login(user);

    // Emitir evento al completar login
    this.onDistribucionFinalizada.emit();

    // Cerrar modal
    this.bsModalRef.hide();

    // Redirigir según rol
    switch (user.rol) {
      case 'admin': this.router.navigate(['/admin']); break;
      case 'profesor': this.router.navigate(['/profesor']); break;
      case 'alumno': this.router.navigate(['/alumno']); break;
    }
  }
}
