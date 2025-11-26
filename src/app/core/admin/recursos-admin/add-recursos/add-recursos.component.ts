import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RecursosService } from 'src/app/shared/services/recursos.service';
import { AddDetallesRecursosComponent } from './add-detalles/add-detalles.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-recursos',
  templateUrl: './add-recursos.component.html',
  styleUrls: ['./add-recursos.component.scss']
})
export class AddRecursosComponent implements OnInit {
  form!: FormGroup;
  public mostrarErrores = false;
  imagenSubirFoto!: File;
  fotoPreview!: string | ArrayBuffer | null;
  detalles: any[] = [];
  bsModalRef?: BsModalRef;
  constructor(private modalService: BsModalService, private router: Router, private recursosService: RecursosService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      contenido: [''],
      imagen: ['']
    });
  }

  crearRecurso() {
    this.mostrarErrores = false;
    if (this.form.invalid) {
      this.mostrarErrores = true;
      this.form.markAllAsTouched();
      return;
    }
    const formData = new FormData();

    formData.append('nombre', this.form.get('nombre')?.value);
    formData.append('descripcion', this.form.get('descripcion')?.value);
    formData.append('file', this.imagenSubirFoto); // archivo

    // === Enviar detalles como JSON ===
    if (this.form.get('contenido')?.value) {
      formData.append('detalles', this.form.get('contenido')!.value);
    }
    this.recursosService.agregarRecursos(formData).subscribe({
      next: (resp) => {
        Swal.fire('Exito', 'Recurso Creado con Exito', 'success')
        this.Cancelar();
      },
      error: (err) => {
        Swal.fire('Error', 'Error al crear el Recurso', 'error')
      }
    });
  }
  agregarDetalle() {
    this.bsModalRef = this.modalService.show(AddDetallesRecursosComponent, {
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
  Cancelar() { this.router.navigate(['admin/recursos']); }

  /**validaciones */
  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }
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
