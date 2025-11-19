import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosAdminRoutingModule } from './usuarios-admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosAdminComponent } from './usuarios-admin.component';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AddUsuarioComponent,
    EditarUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsuariosAdminRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class UsuariosAdminModule { }
