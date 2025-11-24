import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TerapiasService } from 'src/app/shared/services/terapias.service';
import { AddDetallesComponent } from './add-detalles/add-detalles.component';

@Component({
  selector: 'app-add-terapias',
  templateUrl: './add-terapias.component.html',
  styleUrls: ['./add-terapias.component.scss']
})

export class AddTerapiasComponent implements OnInit {
  form!: FormGroup;
  bsModalRef?: BsModalRef;
  public mostrarErrores = false;
  fotoPreview: string | ArrayBuffer | null = null;
  detalles: any[] = [];
  constructor(
    private router: Router,
    private terapiasService: TerapiasService,
    public fb: FormBuilder,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
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

    const payload = this.form.value;
    this.terapiasService.agregarTerapias(payload).subscribe({
      next: () => this.router.navigate(['admin/terapias']),
      error: (err) => console.error('Error al crear terapia', err)
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
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.fotoPreview = reader.result;
      reader.readAsDataURL(file);
    }
  }
}
