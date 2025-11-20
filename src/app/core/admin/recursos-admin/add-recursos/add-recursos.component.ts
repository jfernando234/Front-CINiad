import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RecursosService } from 'src/app/shared/services/recursos.service';

@Component({
  selector: 'app-add-recursos',
  templateUrl: './add-recursos.component.html',
  styleUrls: ['./add-recursos.component.scss']
})
export class AddRecursosComponent implements OnInit {
  form!: FormGroup;
  public mostrarErrores = false;
  fotoPreview: string | ArrayBuffer | null = null;

  constructor(public bsModalRef: BsModalRef, private recursosService: RecursosService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.fotoPreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  crearRecurso() {
    this.mostrarErrores = false;
    if (this.form.invalid) {
      this.mostrarErrores = true;
      this.form.markAllAsTouched();
      return;
    }
    const payload = this.form.value;
    this.recursosService.agregarRecursos(payload).subscribe({
      next: () => this.bsModalRef?.hide(),
      error: (err) => console.error('Error al crear recurso', err)
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
