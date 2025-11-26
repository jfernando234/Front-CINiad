import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TerapiasService } from 'src/app/shared/services/terapias.service';
import { EditarDetallesComponent } from './editar-detalles/editar-detalles.component';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ITerapia } from 'src/app/shared/models/terapias';
import { environment } from 'src/app/shared/enviroments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-terapias',
  templateUrl: './editar-terapias.component.html',
  styleUrls: ['./editar-terapias.component.scss']
})
export class EditarTerapiasComponent implements OnInit {
  form!: FormGroup;
  public mostrarErrores = false;
  bsModalRef!: BsModalRef;
  Terapia!: ITerapia;
  terapiaId: any;
  imagenSubirFoto!: File;
  fotoPreview!: string | ArrayBuffer | null;
  detalles: any[] = [];
  isLoading = false
  totalData = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public modalService: BsModalService,
    private terapiasService: TerapiasService,
    public fb: FormBuilder,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.terapiaId = Number(params.get('id'));
    });

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      contenido: [''],
      imagen: ['']
    });
    this.obtenerTerapia();
  }
  obtenerTerapia(): void {
    this.isLoading = true;

    this.terapiasService.obetenerTerapiasId(this.terapiaId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((data: ITerapia) => {
        if (data) {
          this.Terapia = data;

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
    const formData = new FormData();
    formData.append('nombre', this.form.get('nombre')?.value);
    formData.append('descripcion', this.form.get('descripcion')?.value);
    if (this.imagenSubirFoto) { formData.append('file', this.imagenSubirFoto); }
    // archivo
    // === Enviar detalles como JSON ===
    if (this.form.get('contenido')?.value) {
      formData.append('detalles', this.form.get('contenido')!.value);
    }
    this.terapiasService.editarTerapias(this.terapiaId, formData).subscribe({
      next: (resp) => {
        Swal.fire('Exito', 'Terapia Editado con Exito', 'success')
        this.Cancelar();
      },
      error: (err) => {
        Swal.fire('Error', 'Error al Editar la terapia', 'error')
      }
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
  Cancelar() { this.router.navigate(['admin/terapias']); }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }
}
