import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsEventCallback } from 'ngx-bootstrap/component-loader/listen-options.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TalleresService } from 'src/app/shared/services/talleres.service';
import { AddDetallesTalleresComponent } from './add-detalles/add-detalles.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-talleres',
  templateUrl: './add-talleres.component.html',
  styleUrls: ['./add-talleres.component.scss']
})
export class AddTalleresComponent implements OnInit {
  form!: FormGroup;
  public mostrarErrores = false;
  imagenSubirFoto!: File;
  fotoPreview!: string | ArrayBuffer | null;

  detalles: any[] = [];
  bsModalRef!: BsModalRef
  constructor(private router: Router, private talleresService: TalleresService, public fb: FormBuilder, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      contenido: [''],
      imagen: ['']
    });
  }
  crearTaller() {
    this.mostrarErrores = false;
    if (this.form.invalid) {
      this.mostrarErrores = true;
      this.form.markAllAsTouched();
      return;
    }
    const formData = new FormData();

    formData.append('nombre', this.form.get('nombre')?.value);
    formData.append('descripcion', this.form.get('descripcion')?.value);
    formData.append('file', this.imagenSubirFoto);

    // === Enviar detalles como JSON ===
    if (this.form.get('contenido')?.value) {
      formData.append('detalles', this.form.get('contenido')!.value);
    }

    this.talleresService.agregarTalleres(formData).subscribe({
      next: (resp) => {
        Swal.fire('Exito', 'Taller Creado con Exito', 'success')
        this.Cancelar();
      },
      error: (err) => {
        Swal.fire('Error', 'Error al Crear la Taller', 'error')
      }
    });
  }
  agregarDetalle() {
    this.bsModalRef = this.modalService.show(AddDetallesTalleresComponent, {
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
  Cancelar() { this.router.navigate(['admin/talleres']); }
  /***valifaciones  */
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
