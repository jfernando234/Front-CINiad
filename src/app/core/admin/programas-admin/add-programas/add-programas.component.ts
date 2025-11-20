import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProgramasService } from 'src/app/shared/services/programas.service';

@Component({
  selector: 'app-add-programas',
  templateUrl: './add-programas.component.html',
  styleUrls: ['./add-programas.component.scss']
})
export class AddProgramasComponent implements OnInit {
  form!: FormGroup;
  public mostrarErrores = false;
  fotoPreview: string | ArrayBuffer | null = null;

  constructor(public bsModalRef: BsModalRef, private programasService: ProgramasService, public fb: FormBuilder) { }

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

  crearPrograma() {
    this.mostrarErrores = false;
    if (this.form.invalid) {
      this.mostrarErrores = true;
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.value;
    this.programasService.agregarProgramas(payload).subscribe({
      next: () => this.bsModalRef?.hide(),
      error: (err) => console.error('Error al crear programa', err)
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
