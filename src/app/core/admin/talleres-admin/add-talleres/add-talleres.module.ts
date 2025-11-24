import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTalleresRoutingModule } from './add-talleres-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AddTalleresRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class AddTalleresModule { }
