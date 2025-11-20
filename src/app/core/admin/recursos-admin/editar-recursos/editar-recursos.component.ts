import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RecursosService } from 'src/app/shared/services/recursos.service';

@Component({
  selector: 'app-editar-recursos',
  templateUrl: './editar-recursos.component.html',
  styleUrls: ['./editar-recursos.component.scss']
})
export class EditarRecursosComponent implements OnInit {
  form!: FormGroup;
  public mostrarErrores = false;
  fotoPreview: string | ArrayBuffer | null = null;
  recursosId: any;

  constructor(public bsModalRef: BsModalRef, private recursosService: RecursosService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    const id = (this as any).usuarioId || this.recursosId;
    if (id) {
      this.recursosService.obetenerRecursosId(id).subscribe({
        next: (data) => {
          this.form.patchValue({ nombre: (data as any).nombre, descripcion: (data as any).descripcion });
          const img = (data as any).imgen || (data as any).imagen || (data as any).imagenBase64;
          if (img) { this.fotoPreview = img as any; }
        },
        error: (err) => console.error('Error fetching recurso', err)
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

  guardarRecurso() {
    this.mostrarErrores = false;
    if (this.form.invalid) {
      this.mostrarErrores = true;
      this.form.markAllAsTouched();
      return;
    }
    const payload = this.form.value;
    this.recursosService.editarRecursos(payload as any).subscribe({
      next: () => this.bsModalRef?.hide(),
      error: (err) => console.error('Error al guardar recurso', err)
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
