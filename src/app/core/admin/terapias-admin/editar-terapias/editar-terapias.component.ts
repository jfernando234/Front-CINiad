import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TerapiasService } from 'src/app/shared/services/terapias.service';

@Component({
  selector: 'app-editar-terapias',
  templateUrl: './editar-terapias.component.html',
  styleUrls: ['./editar-terapias.component.scss']
})
export class EditarTerapiasComponent implements OnInit {
  form!: FormGroup;
  public mostrarErrores = false;
  fotoPreview: string | ArrayBuffer | null = null;
  terapiasId: any;

  constructor(public bsModalRef: BsModalRef, private terapiasService: TerapiasService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    const id = (this as any).usuarioId || this.terapiasId;
    if (id) {
      this.terapiasService.obetenerTerapiasId(id).subscribe({
        next: (data) => {
          this.form.patchValue({ nombre: (data as any).nombre, descripcion: (data as any).descripcion });
          const img = (data as any).imgen || (data as any).imagen || (data as any).imagenBase64;
          if (img) {
            try {
              // if img is string (base64 or url)
              this.fotoPreview = img as any;
            } catch (e) {
              console.warn('Unable to set preview image', e);
            }
          }
        },
        error: (err) => console.error('Error fetching terapia', err)
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

  guardarTerapia() {
    this.mostrarErrores = false;
    if (this.form.invalid) {
      this.mostrarErrores = true;
      this.form.markAllAsTouched();
      return;
    }
    const payload = this.form.value;
    this.terapiasService.editarTerapias(payload).subscribe({
      next: () => this.bsModalRef?.hide(),
      error: (err) => console.error('Error al guardar terapia', err)
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
