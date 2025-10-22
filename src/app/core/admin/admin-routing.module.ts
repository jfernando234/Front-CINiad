import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';
import { RecursosAdminComponent } from './recursos-admin/recursos-admin.component';
import { MaterialesAdminComponent } from './materiales-admin/materiales-admin.component';
import { CursosAdminComponent } from './cursos-admin/cursos-admin.component';
import { ConfiguracionAdminComponent } from './configuracion-admin/configuracion-admin.component';
import { AuthGuard } from 'src/app/shared/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardAdminComponent },
      { path: 'usuarios', component: UsuariosAdminComponent },
      { path: 'recursos', component: RecursosAdminComponent },
      { path: 'materiales', component: MaterialesAdminComponent },
      { path: 'cursos', component: CursosAdminComponent },
      { path: 'configuracion', component: ConfiguracionAdminComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
