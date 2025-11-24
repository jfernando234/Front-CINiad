import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TerapiasAdminComponent } from './terapias-admin.component';
import { AddTerapiasComponent } from './add-terapias/add-terapias.component';
import { EditarTerapiasComponent } from './editar-terapias/editar-terapias.component';

const routes: Routes = [
  { path: '', component: TerapiasAdminComponent },
  { path: 'add', component: AddTerapiasComponent },
  { path: 'editar', component: EditarTerapiasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerapiasAdminRoutingModule { }
