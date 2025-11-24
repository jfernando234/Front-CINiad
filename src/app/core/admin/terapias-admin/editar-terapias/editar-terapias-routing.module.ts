import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarTerapiasComponent } from './editar-terapias.component';

const routes: Routes = [
  {path: '',component: EditarTerapiasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarTerapiasRoutingModule { }
