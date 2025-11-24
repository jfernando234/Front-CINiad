import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-detalles',
  templateUrl: './add-detalles.component.html',
  styleUrls: ['./add-detalles.component.scss']
})
export class AddDetallesComponent {
  form!: FormGroup;

  public mostrarErrores = false;
  fotoPreview: string | ArrayBuffer | null = null;
  // Callback que el componente padre asignará
  onSave!: (detalle: any) => void;

  constructor(
    public bsModalRef: BsModalRef,
    public fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }
  guardarDetalle() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const detalle = {
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      fotoPreview: this.fotoPreview || null,
    };

    // Llamamos al callback del padre
    if (this.onSave) {
      this.onSave(detalle);
    }

    // Cerramos el modal
    this.bsModalRef.hide();
  }
  cancelar() { this.bsModalRef?.hide(); }
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
