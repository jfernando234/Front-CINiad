
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
      { path: 'actividades-casa', component: ActividadesCasaComponent },
      { path: 'recursos', component: RecursosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
