import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesAdminComponent } from './actividades-admin.component';
import { AddActividadesComponent } from './add-actividades/add-actividades.component';
import { EditarActividadesComponent } from './editar-actividades/editar-actividades.component';

const routes: Routes = [
  { path: '', component: ActividadesAdminComponent },
  { path: 'add', component: AddActividadesComponent },
  {path: 'editar', component: EditarActividadesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActividadesAdminRoutingModule { }
