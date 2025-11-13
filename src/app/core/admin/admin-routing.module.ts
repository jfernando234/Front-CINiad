import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';
import { RecursosAdminComponent } from './recursos-admin/recursos-admin.component';

import { AuthGuard } from 'src/app/shared/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    // canActivate: [AuthGuard],  // comentado temporalmente
    // data: { roles: ['admin'] },
    children: [
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
      { path: 'usuarios', component: UsuariosAdminComponent },
      { path: 'recursos', component: RecursosAdminComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
