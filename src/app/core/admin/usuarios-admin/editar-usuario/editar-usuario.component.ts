import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

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
    this.usuarioService.obetenerUsuarioId(this.usuarioId);
  }


  /**Metodos */

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.fotoPreview = reader.result;
      reader.readAsDataURL(file);
    }
  }
  guardarUsuario() { }
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
}
