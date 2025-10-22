import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';
import { RecursosAdminComponent } from './recursos-admin/recursos-admin.component';
import { MaterialesAdminComponent } from './materiales-admin/materiales-admin.component';
import { CursosAdminComponent } from './cursos-admin/cursos-admin.component';
import { ConfiguracionAdminComponent } from './configuracion-admin/configuracion-admin.component';


@NgModule({
  declarations: [
    DashboardAdminComponent,
    UsuariosAdminComponent,
    RecursosAdminComponent,
    MaterialesAdminComponent,
    CursosAdminComponent,
    ConfiguracionAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
