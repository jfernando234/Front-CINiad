import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTerapiasComponent } from './add-terapias.component';
import { AddDetallesComponent } from './add-detalles/add-detalles.component';

const routes: Routes = [
  { path: '', component: AddTerapiasComponent },
  { path: 'add-detalles', component: AddDetallesComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddTerapiasRoutingModule { }
