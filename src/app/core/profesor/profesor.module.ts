import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesorRoutingModule } from './profesor-routing.module';
import { DashboardProfesorComponent } from './dashboard-profesor/dashboard-profesor.component';
import { MisCursosProfesorComponent } from './mis-cursos-profesor/mis-cursos-profesor.component';
import { CrearMaterialProfesorComponent } from './crear-material-profesor/crear-material-profesor.component';
import { ActividadesProfesorComponent } from './actividades-profesor/actividades-profesor.component';
import { EstudiantesProfesorComponent } from './estudiantes-profesor/estudiantes-profesor.component';
import { CalificacionesProfesorComponent } from './calificaciones-profesor/calificaciones-profesor.component';


@NgModule({
  declarations: [
    DashboardProfesorComponent,
    MisCursosProfesorComponent,
    CrearMaterialProfesorComponent,
    ActividadesProfesorComponent,
    EstudiantesProfesorComponent,
    CalificacionesProfesorComponent
  ],
  imports: [
    CommonModule,
    ProfesorRoutingModule
  ]
})
export class ProfesorModule { }
