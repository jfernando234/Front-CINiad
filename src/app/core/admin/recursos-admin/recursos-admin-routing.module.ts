import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecursosAdminComponent } from './recursos-admin.component';
import { AddRecursosComponent } from './add-recursos/add-recursos.component';

const routes: Routes = [
  { path: '', component: RecursosAdminComponent },
  { path: 'add', component: AddRecursosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecursosAdminRoutingModule { }
