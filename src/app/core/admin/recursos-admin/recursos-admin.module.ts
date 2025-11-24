import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecursosAdminRoutingModule } from './recursos-admin-routing.module';
import { AddRecursosComponent } from './add-recursos/add-recursos.component';
import { EditarRecursosComponent } from './editar-recursos/editar-recursos.component';
import { AddDetallesRecursosComponent } from './add-recursos/add-detalles/add-detalles.component';
import { EditarDetallesRecursosComponent } from './editar-recursos/editar-detalles/editar-detalles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AddRecursosComponent,
    EditarRecursosComponent,
    AddDetallesRecursosComponent,
    EditarDetallesRecursosComponent
  ],
  imports: [
    CommonModule,
    RecursosAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class RecursosAdminModule { }
