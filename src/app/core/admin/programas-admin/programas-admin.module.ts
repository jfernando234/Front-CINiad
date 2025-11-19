import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramasAdminRoutingModule } from './programas-admin-routing.module';
import { EditarProgramasComponent } from './editar-programas/editar-programas.component';
import { AddProgramasComponent } from './add-programas/add-programas.component';


@NgModule({
  declarations: [
    EditarProgramasComponent,
    AddProgramasComponent
  ],
  imports: [
    CommonModule,
    ProgramasAdminRoutingModule
  ]
})
export class ProgramasAdminModule { }
