import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerapiasAdminRoutingModule } from './terapias-admin-routing.module';
import { AddTerapiasComponent } from './add-terapias/add-terapias.component';
import { EditarTerapiasComponent } from './editar-terapias/editar-terapias.component';
import { AddDetallesComponent } from './add-terapias/add-detalles/add-detalles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditarDetallesComponent } from './editar-terapias/editar-detalles/editar-detalles.component';


@NgModule({
  declarations: [
    AddTerapiasComponent,
    EditarTerapiasComponent,
    AddDetallesComponent,
    EditarDetallesComponent,
  ],
  imports: [
    CommonModule,
    TerapiasAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class TerapiasAdminModule { }
