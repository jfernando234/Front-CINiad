import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RecursosService } from 'src/app/shared/services/recursos.service';
import { EditarDetallesRecursosComponent } from './editar-detalles/editar-detalles.component';
import { IRecurso } from 'src/app/shared/models/recursos';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/shared/enviroments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-recursos',
  templateUrl: './editar-recursos.component.html',
  styleUrls: ['./editar-recursos.component.scss']
})
export class EditarRecursosComponent implements OnInit {
  form!: FormGroup;
  public mostrarErrores = false;
  Recurso!: IRecurso
  recursoId: any;
  detalles: any[] = [];
  imagenSubirFoto!: File;
  fotoPreview!: string | ArrayBuffer | null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private recursosService: RecursosService,
    public fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.recursoId = Number(params.get('id'));
    });
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      contenido: [''],
      imagen: ['']
    });
    this.obtenerRecurso();
  }
  obtenerRecurso() {
    this.recursosService.obetenerRecursosId(this.recursoId)
      .subscribe((data: IRecurso) => {
        if (data) {
          this.Recurso = data;

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

  guardarRecurso() {
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
    // archivo
    // === Enviar detalles como JSON ===
    if (this.form.get('contenido')?.value) {
      formData.append('detalles', this.form.get('contenido')!.value);
    }
    this.recursosService.editarRecursos(this.recursoId, formData).subscribe({
      next: (resp) => {
        Swal.fire('Exito', 'Recurso Editado con Exito', 'success')
        this.Cancelar();
      },
      error: (err) => {
        Swal.fire('Error', 'Error al Editar el Recurso', 'error')
      }
    });
  }
  agregarDetalle() {
    this.bsModalRef = this.modalService.show(EditarDetallesRecursosComponent, {
      class: 'modal-lg',
    });
    this.bsModalRef.content.onSave = (detalle: any) => {
      this.detalles.push(detalle);
    };
  }

  eliminarDetalle(i: number) {
    this.detalles.splice(i, 1);
  }
  /**valifaciones  */
  Cancelar() { this.router.navigate(['admin/recursos']); }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }
}
