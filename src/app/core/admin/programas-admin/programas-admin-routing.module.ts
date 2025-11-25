import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramasAdminComponent } from './programas-admin.component';
import { AddProgramasComponent } from './add-programas/add-programas.component';
import { EditarProgramasComponent } from './editar-programas/editar-programas.component';

const routes: Routes = [
  { path: '', component: ProgramasAdminComponent },
  { path: 'add', component: AddProgramasComponent },
  { path: 'editar', component: EditarProgramasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramasAdminRoutingModule { }
