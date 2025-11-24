import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTerapiasRoutingModule } from './add-terapias-routing.module';
import { AddDetallesComponent } from './add-detalles/add-detalles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    AddTerapiasRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class AddTerapiasModule { }
