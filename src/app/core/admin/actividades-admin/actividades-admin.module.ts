import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadesAdminRoutingModule } from './actividades-admin-routing.module';
import { ActividadesAdminComponent } from './actividades-admin.component';
import { AddActividadesComponent } from './add-actividades/add-actividades.component';
import { EditarActividadesComponent } from './editar-actividades/editar-actividades.component';
import { EditarDetallesActividadesComponent } from './editar-actividades/editar-detalles/editar-detalles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AddActividadesComponent,
    EditarActividadesComponent,
    EditarDetallesActividadesComponent
  ],
  imports: [
    CommonModule,
    ActividadesAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class ActividadesAdminModule { }
