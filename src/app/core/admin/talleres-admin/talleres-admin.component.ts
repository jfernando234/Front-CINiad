import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddTalleresComponent } from './add-talleres/add-talleres.component';
import { EditarTalleresComponent } from './editar-talleres/editar-talleres.component';

@Component({
  selector: 'app-talleres-admin',
  templateUrl: './talleres-admin.component.html',
  styleUrls: ['./talleres-admin.component.scss']
})
export class TalleresAdminComponent {
  bsModalRef?: BsModalRef;
  isLoading = false;
  constructor(private modalService: BsModalService) { }

  filtroData() {

  }
  refreshData() {
    // Lógica para refrescar los datos
  }
  agregarTalleres() {
    this.bsModalRef = this.modalService.show(AddTalleresComponent, {
      class: 'modal-lg',
    });
  }
  editarTalleres(usuarioId: number) {
    const initialState = {
      usuarioId: usuarioId
    };
    this.bsModalRef = this.modalService.show(EditarTalleresComponent, { class: 'modal-lg', initialState }),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.refreshData();
      });
  }
}
