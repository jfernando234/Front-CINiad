import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramasAdminRoutingModule } from './programas-admin-routing.module';
import { EditarProgramasComponent } from './editar-programas/editar-programas.component';
import { AddProgramasComponent } from './add-programas/add-programas.component';
import { AddDetallesProgramasComponent } from './add-programas/add-detalles/add-detalles.component';
import { EditarDetallesProgramasComponent } from './editar-programas/editar-detalles/editar-detalles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    EditarProgramasComponent,
    AddProgramasComponent,
    AddDetallesProgramasComponent,
    EditarDetallesProgramasComponent
  ],
  imports: [
    CommonModule,
    ProgramasAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class ProgramasAdminModule { }
