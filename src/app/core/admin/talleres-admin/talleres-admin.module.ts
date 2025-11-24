import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TalleresAdminRoutingModule } from './talleres-admin-routing.module';
import { EditarTalleresComponent } from './editar-talleres/editar-talleres.component';
import { AddTalleresComponent } from './add-talleres/add-talleres.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AddDetallesTalleresComponent } from './add-talleres/add-detalles/add-detalles.component';


@NgModule({
  declarations: [
    EditarTalleresComponent,
    AddTalleresComponent,
    AddDetallesTalleresComponent
  ],
  imports: [
    CommonModule,
    TalleresAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class TalleresAdminModule { }
