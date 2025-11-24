import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTalleresComponent } from './add-talleres.component';
import { AddDetallesTalleresComponent } from './add-detalles/add-detalles.component';

const routes: Routes = [
  { path: '', component: AddTalleresComponent},
  { path: 'add-detalles', component: AddDetallesTalleresComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddTalleresRoutingModule { }
