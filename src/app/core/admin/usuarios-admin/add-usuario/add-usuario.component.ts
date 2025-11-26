import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { IUsuario } from 'src/app/shared/models/usuarios';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.scss']
})
export class AddUsuarioComponent implements OnInit {

  form!: FormGroup;
  Usuario: IUsuario[] = [];
  public mostrarErrores = false;
  fotoPreview: string | ArrayBuffer | null = null;
  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  constructor(
    public bsModalRef: BsModalRef,
    private authservice: AuthService,
    public fb: FormBuilder
  ) { }

  /**Metodos */


  crearUsuario() {
    if (this.form.invalid) {
      this.isTouched()
      return;
    }
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;
    this.authservice.register(username, password).subscribe({
      next: (resp) => {
        Swal.fire('Exito', 'Usuario Creado con Exito', 'success')
        this.Cancelar();
      },
      error: (err) => {
        Swal.fire('Error', 'Error al Crear el Usuario', 'error')
      }
    });
  }
  Cancelar() {
    this.bsModalRef?.hide();
  }
  /**validaciones */
  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.fotoPreview = reader.result;
      reader.readAsDataURL(file);
    }
  }
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
