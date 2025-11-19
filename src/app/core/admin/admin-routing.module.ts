import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RecursosAdminComponent } from './recursos-admin/recursos-admin.component';

import { AuthGuard } from 'src/app/shared/auth/auth.guard';
import { TerapiasAdminComponent } from './terapias-admin/terapias-admin.component';
import { ProgramasAdminComponent } from './programas-admin/programas-admin.component';
import { TalleresAdminComponent } from './talleres-admin/talleres-admin.component';
import { ActividadesAdminComponent } from './actividades-admin/actividades-admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    // canActivate: [AuthGuard],  // comentado temporalmente
    // data: { roles: ['admin'] },
    children: [
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
      { path: 'usuarios', loadChildren: () => import('./usuarios-admin/usuarios-admin.module').then(m => m.UsuariosAdminModule) },
      { path: 'terapias',  component: TerapiasAdminComponent },
      { path: 'programas', component: ProgramasAdminComponent },
      { path: 'talleres',  component: TalleresAdminComponent },
      { path: 'actividades',  component: ActividadesAdminComponent },
      { path: 'recursos',  component: RecursosAdminComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
