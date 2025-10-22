import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { InicioAlumnoComponent } from './inicio-alumno/inicio-alumno.component';
import { MisCursosAlumnoComponent } from './mis-cursos-alumno/mis-cursos-alumno.component';
import { TareasAlumnoComponent } from './tareas-alumno/tareas-alumno.component';
import { MaterialesAlumnoComponent } from './materiales-alumno/materiales-alumno.component';
import { EstudiantesAlumnoComponent } from './estudiantes-alumno/estudiantes-alumno.component';
import { CalificacionesAlumnoComponent } from './calificaciones-alumno/calificaciones-alumno.component';
import { RecursosAlumnoComponent } from './recursos-alumno/recursos-alumno.component';


@NgModule({
  declarations: [
    InicioAlumnoComponent,
    MisCursosAlumnoComponent,
    TareasAlumnoComponent,
    MaterialesAlumnoComponent,
    EstudiantesAlumnoComponent,
    CalificacionesAlumnoComponent,
    RecursosAlumnoComponent
  ],
  imports: [
    CommonModule,
    AlumnoRoutingModule
  ]
})
export class AlumnoModule { }
