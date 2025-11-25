import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TerapiasService } from 'src/app/shared/services/terapias.service';
import { AddDetallesComponent } from './add-detalles/add-detalles.component';
import { environment } from 'src/app/shared/enviroments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-terapias',
  templateUrl: './add-terapias.component.html',
  styleUrls: ['./add-terapias.component.scss']
})

export class AddTerapiasComponent implements OnInit {
  form!: FormGroup;
  bsModalRef?: BsModalRef;
  public mostrarErrores = false;
  detalles: any[] = [];
  media = environment.apiURL;
  constructor(
    private router: Router,
    private terapiasService: TerapiasService,
    public fb: FormBuilder,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: ['']
    });
  }
  /**Metodos */
  crearTerapia() {
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
    if (this.detalles.length > 0) { formData.append('detalle', JSON.stringify(this.detalles)); }
    this.terapiasService.agregarTerapias(formData).subscribe({
      next: (resp) => {
        Swal.fire('Exito','Terapia Creada con Exito','success')
        this.cancelar();
      },
      error: (err) => {
        Swal.fire('Error','Error al crear la terapia','error')
      }
    });
  }

  agregarDetalle() {
    this.bsModalRef = this.modalService.show(AddDetallesComponent, {
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
  cancelar() { this.router.navigate(['admin/terapias']); }
  /**Validaciones */
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
