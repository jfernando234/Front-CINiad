import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TalleresAdminComponent } from './talleres-admin.component';
import { AddTalleresComponent } from './add-talleres/add-talleres.component';
import { EditarTalleresComponent } from './editar-talleres/editar-talleres.component';

const routes: Routes = [
  { path: '', component: TalleresAdminComponent },
  { path: 'add', component: AddTalleresComponent },
  { path: 'editar', component: EditarTalleresComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TalleresAdminRoutingModule { }
