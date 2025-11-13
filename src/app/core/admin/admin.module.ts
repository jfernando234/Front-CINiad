import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';
import { RecursosAdminComponent } from './recursos-admin/recursos-admin.component';


@NgModule({
  declarations: [
    UsuariosAdminComponent,
    RecursosAdminComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
