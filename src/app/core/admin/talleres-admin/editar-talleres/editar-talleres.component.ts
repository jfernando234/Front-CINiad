import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { environment } from 'src/app/shared/enviroments/environment';
import { ITaller } from 'src/app/shared/models/talleres';
import { TalleresService } from 'src/app/shared/services/talleres.service';
import Swal from 'sweetalert2';
import { EditarDetallesTalleresComponent } from './editar-detalles/editar-detalles.component';

@Component({
  selector: 'app-editar-talleres',
  templateUrl: './editar-talleres.component.html',
  styleUrls: ['./editar-talleres.component.scss']
})
export class EditarTalleresComponent implements OnInit {
  form!: FormGroup;
  public mostrarErrores = false;
  talleresId: any;
  isLoading = false
  Taller!: ITaller
  imagenSubirFoto!: File;
  fotoPreview!: string | ArrayBuffer | null;
  detalles: any[] = [];
  constructor(
    private router: Router,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    public bsModalRef: BsModalRef,
    private talleresService: TalleresService,
    public fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.talleresId = Number(params.get('id'));
    });
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: ['']
    });
    this.obtenerTaller();
  }
  obtenerTaller(): void {
    this.isLoading = true;

    this.talleresService.obetenerTalleresId(this.talleresId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((data: ITaller) => {
        if (data) {
          this.Taller = data;

          // Actualiza solo los campos de texto
          this.form.patchValue({
            nombre: data.nombre,
            descripcion: data.descripcion
          });

          // Prepara la imagen para mostrar en preview
          this.fotoPreview = data.media_url
            ? environment.apiURLmedia + data.media_url // URL completa de la imagen
            : 'assets/img/user.jpg';
        }
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

  guardarTaller() {
    this.mostrarErrores = false;
    if (this.form.invalid) {
      this.mostrarErrores = true;
      this.form.markAllAsTouched();
      return;
    }
    const formData = new FormData();
    formData.append('nombre', this.form.get('nombre')?.value);
    formData.append('descripcion', this.form.get('descripcion')?.value);
    if (this.imagenSubirFoto) { formData.append('file', this.imagenSubirFoto); }

    // === Enviar detalles como JSON ===
    if (this.detalles.length > 0) { formData.append('detalle', JSON.stringify(this.detalles)); }

    this.talleresService.editarTalleres(this.talleresId,formData).subscribe({
      next: (resp) => {
        Swal.fire('Exito', 'Taller Editado con Exito', 'success')
        this.Cancelar();
      },
      error: (err) => {
        Swal.fire('Error', 'Error al Editar el Taller', 'error')
      }
    });
  }
  agregarDetalle() {
    this.bsModalRef = this.modalService.show(EditarDetallesTalleresComponent, {
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


  /***valifaciones */
  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }
}


