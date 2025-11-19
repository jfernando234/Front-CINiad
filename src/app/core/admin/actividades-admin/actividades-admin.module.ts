import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadesAdminRoutingModule } from './actividades-admin-routing.module';
import { AddActividadesComponent } from './add-actividades/add-actividades.component';
import { EditarActividadesComponent } from './editar-actividades/editar-actividades.component';


@NgModule({
  declarations: [
    AddActividadesComponent,
    EditarActividadesComponent
  ],
  imports: [
    CommonModule,
    ActividadesAdminRoutingModule
  ]
})
export class ActividadesAdminModule { }
