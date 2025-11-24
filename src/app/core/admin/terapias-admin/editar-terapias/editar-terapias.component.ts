import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TerapiasService } from 'src/app/shared/services/terapias.service';
import { EditarDetallesComponent } from './editar-detalles/editar-detalles.component';

@Component({
  selector: 'app-editar-terapias',
  templateUrl: './editar-terapias.component.html',
  styleUrls: ['./editar-terapias.component.scss']
})
export class EditarTerapiasComponent implements OnInit {
  form!: FormGroup;
  public mostrarErrores = false;
  bsModalRef!: BsModalRef;
  terapiasId: any;
  imagenSubirFoto!: File;
  fotoPreview!: string | ArrayBuffer | null;
  detalles: any[] = [];
  constructor(public modalService: BsModalService, private terapiasService: TerapiasService, public fb: FormBuilder,) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0] as File;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fotoPreview = e.target!.result;
        this.imagenSubirFoto = file;
      };
      reader.readAsDataURL(file);
    } else {
      this.fotoPreview = null;
      this.imagenSubirFoto = undefined!;
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

  agregarDetalle() {
    this.bsModalRef = this.modalService.show(EditarDetallesComponent, {
      class: 'modal-lg',
    });
    this.bsModalRef.content.onSave = (detalle: any) => {
      this.detalles.push(detalle);
    };
  }

  eliminarDetalle(i: number) {
    this.detalles.splice(i, 1);
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
