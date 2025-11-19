import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RecursosAdminComponent } from './recursos-admin/recursos-admin.component';
import { TerapiasAdminComponent } from './terapias-admin/terapias-admin.component';
import { ProgramasAdminComponent } from './programas-admin/programas-admin.component';
import { TalleresAdminComponent } from './talleres-admin/talleres-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ActividadesAdminComponent } from './actividades-admin/actividades-admin.component';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';


@NgModule({
  declarations: [
    RecursosAdminComponent,
    TerapiasAdminComponent,
    ProgramasAdminComponent,
    TalleresAdminComponent,
    ActividadesAdminComponent,
    UsuariosAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
