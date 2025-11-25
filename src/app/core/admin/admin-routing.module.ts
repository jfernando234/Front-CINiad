import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

import { AuthGuard } from 'src/app/shared/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    // canActivate: [AuthGuard],  // comentado temporalmente
    // data: { roles: ['admin'] },
    children: [
      { path: '', redirectTo: 'terapias', pathMatch: 'full' },
      { path: 'usuarios', loadChildren: () => import('./usuarios-admin/usuarios-admin.module').then(m => m.UsuariosAdminModule) },
      { path: 'terapias', loadChildren: () => import('./terapias-admin/terapias-admin.module').then(m => m.TerapiasAdminModule) },
      { path: 'programas', loadChildren: () => import('./programas-admin/programas-admin.module').then(m => m.ProgramasAdminModule) },
      { path: 'talleres', loadChildren: () => import('./talleres-admin/talleres-admin.module').then(m => m.TalleresAdminModule) },
      { path: 'actividades', loadChildren: () => import('./actividades-admin/actividades-admin.module').then(m => m.ActividadesAdminModule) },
      { path: 'recursos', loadChildren: () => import('./recursos-admin/recursos-admin.module').then(m => m.RecursosAdminModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
