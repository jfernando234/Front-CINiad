import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarTerapiasRoutingModule } from './editar-terapias-routing.module';
import { DetalleTerapiaComponent } from './detalle-terapia/detalle-terapia.component';
import { EditarDetallesComponent } from './editar-detalles/editar-detalles.component';
import { AddDetallesComponent } from './add-detalles/add-detalles.component';


@NgModule({
  declarations: [
    DetalleTerapiaComponent,
    EditarDetallesComponent,
    AddDetallesComponent
  ],
  imports: [
    CommonModule,
    EditarTerapiasRoutingModule
  ]
})
export class EditarTerapiasModule { }
