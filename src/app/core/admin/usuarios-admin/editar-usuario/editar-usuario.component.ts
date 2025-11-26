import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IUsuario } from 'src/app/shared/models/usuarios';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent {
  form!: FormGroup;
  usuarioId: any;
  public mostrarErrores = false;
  fotoPreview: string | ArrayBuffer | null = null;
  Usuario!: IUsuario;
  constructor(
    public bsModalRef: BsModalRef,
    private usuarioService: UsuariosService,
    public fb: FormBuilder
  ) { }
  ngOnInit(): void {

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      edad: ['', Validators.required],
      telefono: ['', Validators.required],

    });
    this.usuarioService.obetenerUsuarioId(this.usuarioId).subscribe(proveedor => {
      this.Usuario = proveedor;
      this.form.patchValue({
        nombre: this.Usuario.nombreUsuario,
        apellidos: this.Usuario.apellidos,
        edad: this.Usuario.edad,
        telefono: this.Usuario.telefono
      });
    })
  }


  /**Metodos */
  guardarUsuario() {
    if (this.form.invalid) {
      this.isTouched()
      return;
    }
    const Usuario: IUsuario = {
      nombreUsuario: this.form.value.nombre,
      apellidos: this.form.value.apellidos,
      edad: this.form.value.edad,
      telefono: this.form.value.telefono,
    };

    this.usuarioService.editarUsuario(Usuario).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, 'Usuario Editado correctamente', 'success');
          this.bsModalRef.hide();
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      });
  }
  Cancelar() {

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
