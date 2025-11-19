import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TalleresAdminRoutingModule } from './talleres-admin-routing.module';
import { EditarTalleresComponent } from './editar-talleres/editar-talleres.component';
import { AddTalleresComponent } from './add-talleres/add-talleres.component';


@NgModule({
  declarations: [
    EditarTalleresComponent,
    AddTalleresComponent
  ],
  imports: [
    CommonModule,
    TalleresAdminRoutingModule
  ]
})
export class TalleresAdminModule { }
