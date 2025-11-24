import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProgramasService } from 'src/app/shared/services/programas.service';
import { AddDetallesProgramasComponent } from './add-detalles/add-detalles.component';

@Component({
  selector: 'app-add-programas',
  templateUrl: './add-programas.component.html',
  styleUrls: ['./add-programas.component.scss']
})
export class AddProgramasComponent implements OnInit {
  form!: FormGroup;
  public mostrarErrores = false;
  detalles: any[] = [];
  bsModalRef!: BsModalRef;
  constructor(private modalService: BsModalService,private router: Router, private programasService: ProgramasService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  crearPrograma() {
    this.mostrarErrores = false;
    if (this.form.invalid) {
      this.mostrarErrores = true;
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    formData.append('nombre', this.form.get('nombre')?.value);
    formData.append('descripcion', this.form.get('descripcion')?.value);
    formData.append('imagen', this.imagenSubirFoto); // archivo

    // === Enviar detalles como JSON ===
    formData.append('detalle', JSON.stringify(this.detalles));

    this.programasService.agregarProgramas(formData).subscribe({
      next: (resp) => {
        console.log('Terapia creada', resp);
      },
      error: (err) => {
        console.error('Error al crear terapia', err);
      }
    });
  }
  agregarDetalle() {
    this.bsModalRef = this.modalService.show(AddDetallesProgramasComponent, {
      class: 'modal-lg',
    });
    // Definimos un callback para recibir el detalle desde el modal
    this.bsModalRef.content.onSave = (detalle: any) => {
      // Agregamos el detalle al array
      this.detalles.push(detalle);
    };
  }
  eliminarDetalle(i: number) {
    this.detalles.splice(i, 1);
  }
  Cancelar() { this.router.navigate(['admin/programas']); }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }
  imagenSubirFoto!: File;
  fotoPreview!: string | ArrayBuffer | null;

  onFileSelected(event: any) {
    const file = event.target.files[0] as File;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fotoPreview = e.target!.result; // previsualización
        this.imagenSubirFoto = file; // archivo para enviar al backend
      };
      reader.readAsDataURL(file);
    } else {
      this.fotoPreview = null;
      this.imagenSubirFoto = undefined!;
    }
  }
}
