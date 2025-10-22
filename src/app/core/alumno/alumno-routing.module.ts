import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoComponent } from './alumno.component';
import { InicioAlumnoComponent } from './inicio-alumno/inicio-alumno.component';
import { MisCursosAlumnoComponent } from './mis-cursos-alumno/mis-cursos-alumno.component';
import { TareasAlumnoComponent } from './tareas-alumno/tareas-alumno.component';
import { MaterialesAlumnoComponent } from './materiales-alumno/materiales-alumno.component';
import { CalificacionesAlumnoComponent } from './calificaciones-alumno/calificaciones-alumno.component';
import { RecursosAlumnoComponent } from './recursos-alumno/recursos-alumno.component';
import { AuthGuard } from 'src/app/shared/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AlumnoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['alumno'] },
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioAlumnoComponent },
      { path: 'mis-cursos', component: MisCursosAlumnoComponent },
      { path: 'tareas', component: TareasAlumnoComponent },
      { path: 'materiales', component: MaterialesAlumnoComponent },
      { path: 'calificaciones', component: CalificacionesAlumnoComponent },
      { path: 'recursos', component: RecursosAlumnoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnoRoutingModule { }
