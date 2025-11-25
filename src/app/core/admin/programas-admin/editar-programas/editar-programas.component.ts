import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProgramasService } from 'src/app/shared/services/programas.service';
import Swal from 'sweetalert2';
import { EditarDetallesProgramasComponent } from './editar-detalles/editar-detalles.component';
import { IProgramas } from 'src/app/shared/models/programas';
import { environment } from 'src/app/shared/enviroments/environment';

@Component({
  selector: 'app-editar-programas',
  templateUrl: './editar-programas.component.html',
  styleUrls: ['./editar-programas.component.scss']
})
export class EditarProgramasComponent implements OnInit {
  form!: FormGroup;
  public mostrarErrores = false;
  imagenSubirFoto!: File;
  fotoPreview!: string | ArrayBuffer | null;
  programasId: any;
  Programa!: IProgramas
  detalles: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private programasService: ProgramasService,
    public fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.programasId = Number(params.get('id'));
    });
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    this.obtenerPrograma();

  }

  obtenerPrograma() {
    this.programasService.obetenerProgramasId(this.programasId)
      .subscribe((data: IProgramas) => {
        if (data) {
          this.Programa = data;

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
    // archivo
    // === Enviar detalles como JSON ===
    if (this.detalles.length > 0) { formData.append('detalle', JSON.stringify(this.detalles)); }
    this.programasService.editarProgramas(this.programasId, formData).subscribe({
      next: (resp) => {
        Swal.fire('Exito', 'Programa Editado con Exito', 'success')
        this.Cancelar();
      },
      error: (err) => {
        Swal.fire('Error', 'Error al Editar el Programa', 'error')
      }
    });
  }

  agregarDetalle() {
    this.bsModalRef = this.modalService.show(EditarDetallesProgramasComponent, {
      class: 'modal-lg',
    });
    this.bsModalRef.content.onSave = (detalle: any) => {
      this.detalles.push(detalle);
    };
  }

  eliminarDetalle(i: number) {
    this.detalles.splice(i, 1);
  }
  Cancelar() { this.router.navigate(['admin/programas']) }
  /**valifaciones */
  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }
}


