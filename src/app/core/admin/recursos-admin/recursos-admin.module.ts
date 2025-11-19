import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecursosAdminRoutingModule } from './recursos-admin-routing.module';
import { AddRecursosComponent } from './add-recursos/add-recursos.component';
import { EditarRecursosComponent } from './editar-recursos/editar-recursos.component';


@NgModule({
  declarations: [
    AddRecursosComponent,
    EditarRecursosComponent
  ],
  imports: [
    CommonModule,
    RecursosAdminRoutingModule
  ]
})
export class RecursosAdminModule { }
