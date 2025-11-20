import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TalleresService } from 'src/app/shared/services/talleres.service';

@Component({
  selector: 'app-editar-talleres',
  templateUrl: './editar-talleres.component.html',
  styleUrls: ['./editar-talleres.component.scss']
})
export class EditarTalleresComponent implements OnInit {
  form!: FormGroup;
  public mostrarErrores = false;
  fotoPreview: string | ArrayBuffer | null = null;
  talleresId: any;

  constructor(public bsModalRef: BsModalRef, private talleresService: TalleresService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    if (this.talleresId) {
      this.talleresService.obetenerTalleresId(this.talleresId);
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.fotoPreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  guardarTaller() { }
  Cancelar() { this.bsModalRef?.hide(); }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }
}


