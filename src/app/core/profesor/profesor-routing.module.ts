import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfesorComponent } from './profesor.component';
import { DashboardProfesorComponent } from './dashboard-profesor/dashboard-profesor.component';
import { MisCursosProfesorComponent } from './mis-cursos-profesor/mis-cursos-profesor.component';
import { CrearMaterialProfesorComponent } from './crear-material-profesor/crear-material-profesor.component';
import { ActividadesProfesorComponent } from './actividades-profesor/actividades-profesor.component';
import { EstudiantesProfesorComponent } from './estudiantes-profesor/estudiantes-profesor.component';
import { CalificacionesProfesorComponent } from './calificaciones-profesor/calificaciones-profesor.component';
import { AuthGuard } from 'src/app/shared/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ProfesorComponent,
    canActivate: [AuthGuard],
    data: { roles: ['profesor'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardProfesorComponent },
      { path: 'mis-cursos', component: MisCursosProfesorComponent },
      { path: 'crear-material', component: CrearMaterialProfesorComponent },
      { path: 'actividades', component: ActividadesProfesorComponent },
      { path: 'estudiantes', component: EstudiantesProfesorComponent },
      { path: 'calificaciones', component: CalificacionesProfesorComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesorRoutingModule { }
