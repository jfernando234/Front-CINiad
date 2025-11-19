import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddProgramasComponent } from './add-programas/add-programas.component';
import { EditarProgramasComponent } from './editar-programas/editar-programas.component';

@Component({
  selector: 'app-programas-admin',
  templateUrl: './programas-admin.component.html',
  styleUrls: ['./programas-admin.component.scss']
})
export class ProgramasAdminComponent {
  bsModalRef?: BsModalRef;
  isLoading = false;
  constructor(private modalService: BsModalService) { }

  filtroData() {

  }
  refreshData() {
    // Lógica para refrescar los datos
  }
  agregarProgramas() {
    this.bsModalRef = this.modalService.show(AddProgramasComponent, {
      class: 'modal-lg',
    });
  }
  editarProgramas(usuarioId: number) {
    const initialState = {
      usuarioId: usuarioId
    };
    this.bsModalRef = this.modalService.show(EditarProgramasComponent, { class: 'modal-lg', initialState }),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.refreshData();
      });
  }
}
