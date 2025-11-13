
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './core/inicio/inicio.component';
import { AdminComponent } from './core/admin/admin.component';


/*const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    component: InicioComponent,
    children: [
      { path: '', component: InicioComponent }
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./core/admin/admin.module').then(m => m.AdminModule)
  },
  { path: '**', redirectTo: 'inicio' }
];*/
/** para trabajar en el admin  */
const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./core/admin/admin.module').then(m => m.AdminModule)
  },
  { path: '**', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
