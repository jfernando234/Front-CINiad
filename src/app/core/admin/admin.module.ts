import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TerapiasAdminComponent } from './terapias-admin/terapias-admin.component';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TalleresAdminComponent } from './talleres-admin/talleres-admin.component';
import { RecursosAdminComponent } from './recursos-admin/recursos-admin.component';
import { ProgramasAdminComponent } from './programas-admin/programas-admin.component';
import { ActividadesAdminComponent } from './actividades-admin/actividades-admin.component';


@NgModule({
  declarations: [
    TerapiasAdminComponent,
    UsuariosAdminComponent,
    TalleresAdminComponent,
    RecursosAdminComponent,
    ProgramasAdminComponent,
    ActividadesAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
