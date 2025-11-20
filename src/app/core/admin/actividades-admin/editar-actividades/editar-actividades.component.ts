import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ActividadesService } from 'src/app/shared/services/actividades.service';

@Component({
  selector: 'app-editar-actividades',
  templateUrl: './editar-actividades.component.html',
  styleUrls: ['./editar-actividades.component.scss']
})
export class EditarActividadesComponent implements OnInit {
  form!: FormGroup;
  public mostrarErrores = false;
  fotoPreview: string | ArrayBuffer | null = null;
  actividadesId: any;
  constructor(public bsModalRef: BsModalRef, private actividadesService: ActividadesService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    const id = (this as any).usuarioId || this.actividadesId;
    if (id) {
      this.actividadesService.obetenerActividadesId(id).subscribe({
        next: (data) => {
          this.form.patchValue({ nombre: (data as any).nombre, descripcion: (data as any).descripcion });
          const img = (data as any).imgen || (data as any).imagen || (data as any).imagenBase64;
          if (img) { this.fotoPreview = img as any; }
        },
        error: (err) => console.error('Error fetching actividad', err)
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

  guardarActividad() {
    this.mostrarErrores = false;
    if (this.form.invalid) {
      this.mostrarErrores = true;
      this.form.markAllAsTouched();
      return;
    }
    const payload = this.form.value;
    this.actividadesService.editarActividades(payload as any).subscribe({
      next: () => this.bsModalRef?.hide(),
      error: (err) => console.error('Error al guardar actividad', err)
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

