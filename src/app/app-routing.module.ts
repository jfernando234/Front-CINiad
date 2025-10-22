
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './core/inicio/inicio.component';
import { ActividadesCasaComponent } from './core/actividades-casa/actividades-casa.component';
import { RecursosComponent } from './core/recursos/recursos.component';


const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    component: InicioComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'actividades-casa', component: ActividadesCasaComponent },
      { path: 'recursos', component: RecursosComponent }
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./core/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'profesor',
    loadChildren: () => import('./core/profesor/profesor.module').then(m => m.ProfesorModule)
  },
  {
    path: 'alumno',
    loadChildren: () => import('./core/alumno/alumno.module').then(m => m.AlumnoModule)
  },
  { path: '**', redirectTo: 'inicio' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
