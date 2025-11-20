import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TerapiasService } from 'src/app/shared/services/terapias.service';

@Component({
  selector: 'app-add-terapias',
  templateUrl: './add-terapias.component.html',
  styleUrls: ['./add-terapias.component.scss']
})

export class AddTerapiasComponent implements OnInit {
  form!: FormGroup;
  public mostrarErrores = false;
  fotoPreview: string | ArrayBuffer | null = null;

  constructor(public bsModalRef: BsModalRef, private terapiasService: TerapiasService, public fb: FormBuilder) { }

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

  Cancelar() { this.bsModalRef?.hide(); }

  crearTerapia() {
    this.mostrarErrores = false;
    if (this.form.invalid) {
      this.mostrarErrores = true;
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.value;
    this.terapiasService.agregarTerapias(payload).subscribe({
      next: () => this.bsModalRef?.hide(),
      error: (err) => console.error('Error al crear terapia', err)
    });
  }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }
}
