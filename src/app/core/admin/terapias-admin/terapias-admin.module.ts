import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerapiasAdminRoutingModule } from './terapias-admin-routing.module';
import { AddTerapiasComponent } from './add-terapias/add-terapias.component';
import { EditarTerapiasComponent } from './editar-terapias/editar-terapias.component';


@NgModule({
  declarations: [
    AddTerapiasComponent,
    EditarTerapiasComponent
  ],
  imports: [
    CommonModule,
    TerapiasAdminRoutingModule
  ]
})
export class TerapiasAdminModule { }
