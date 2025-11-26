import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActividadesService } from 'src/app/shared/services/actividades.service';
import Swal from 'sweetalert2';
import { EditarDetallesActividadesComponent } from './editar-detalles/editar-detalles.component';
import { IActividad } from 'src/app/shared/models/actividades';
import { IProgramas } from 'src/app/shared/models/programas';
import { environment } from 'src/app/shared/enviroments/environment';

@Component({
  selector: 'app-editar-actividades',
  templateUrl: './editar-actividades.component.html',
  styleUrls: ['./editar-actividades.component.scss']
})
export class EditarActividadesComponent implements OnInit {
  form!: FormGroup;
  public mostrarErrores = false;
  actividadesId: any;
  detalles: any[] = [];
  imagenSubirFoto!: File;
  fotoPreview!: string | ArrayBuffer | null;
  Programa!: IProgramas
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private actividadesService: ActividadesService,
    public fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.actividadesId = Number(params.get('id'));
    });
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      contenido: ['']
    });
    this.actividadesService.obetenerActividadesId(this.actividadesId)
      .subscribe((data: IActividad) => {
        if (data) {
          this.Programa = data;

          // Actualiza solo los campos de texto
          this.form.patchValue({
            nombre: data.nombre,
            descripcion: data.descripcion,
            detalles: data.contenido
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
  guardarPrograma() {
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
    // === Enviar detalles como JSON ===
    if (this.form.get('contenido')?.value) {
      formData.append('detalles', this.form.get('contenido')!.value);
    }
    this.actividadesService.editarActividades(this.actividadesId, formData).subscribe({
      next: (resp) => {
        Swal.fire('Exito', 'Actividad Editada con Exito', 'success')
        this.Cancelar();
      },
      error: (err) => {
        Swal.fire('Error', 'Error al Editar la Actividad', 'error')
      }
    });
  }

  agregarDetalle() {
    this.bsModalRef = this.modalService.show(EditarDetallesActividadesComponent, {
      class: 'modal-lg',
    });
    this.bsModalRef.content.onSave = (detalle: any) => {
      this.detalles.push(detalle);
    };
  }

  eliminarDetalle(i: number) {
    this.detalles.splice(i, 1);
  }
  Cancelar() { this.router.navigate(['admin/actividades']) }
  //**valifaciones  */
  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }
}

