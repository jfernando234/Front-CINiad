import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProgramasService } from 'src/app/shared/services/programas.service';

@Component({
  selector: 'app-editar-programas',
  templateUrl: './editar-programas.component.html',
  styleUrls: ['./editar-programas.component.scss']
})
export class EditarProgramasComponent implements OnInit {
  form!: FormGroup;
  public mostrarErrores = false;
  fotoPreview: string | ArrayBuffer | null = null;
  programasId: any;

  constructor(public bsModalRef: BsModalRef, private programasService: ProgramasService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    const id = (this as any).usuarioId || this.programasId;
    if (id) {
      this.programasService.obetenerProgramasId(id).subscribe({
        next: (data) => {
          this.form.patchValue({ nombre: (data as any).nombre, descripcion: (data as any).descripcion });
          const img = (data as any).imgen || (data as any).imagen || (data as any).imagenBase64;
          if (img) { this.fotoPreview = img as any; }
        },
        error: (err) => console.error('Error fetching programa', err)
      });
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.fotoPreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  guardarPrograma() {
    this.mostrarErrores = false;
    if (this.form.invalid) {
      this.mostrarErrores = true;
      this.form.markAllAsTouched();
      return;
    }
    const payload = this.form.value;
    this.programasService.editarProgramas(payload).subscribe({
      next: () => this.bsModalRef?.hide(),
      error: (err) => console.error('Error al guardar programa', err)
    });
  }
  Cancelar() { this.bsModalRef?.hide(); }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }
}


