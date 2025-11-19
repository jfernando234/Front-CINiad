import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditarTerapiasComponent } from './editar-terapias/editar-terapias.component';
import { AddTerapiasComponent } from './add-terapias/add-terapias.component';

@Component({
  selector: 'app-terapias-admin',
  templateUrl: './terapias-admin.component.html',
  styleUrls: ['./terapias-admin.component.scss']
})
export class TerapiasAdminComponent {

  bsModalRef?: BsModalRef;
  isLoading = false;
  constructor(private modalService: BsModalService) { }

  filtroData() {

  }
  refreshData() {
    // Lógica para refrescar los datos
  }
  agregarTerapias() {
    this.bsModalRef = this.modalService.show(AddTerapiasComponent, {
      class: 'modal-lg',
    });
  }
  editarTerapias(usuarioId: number) {
    const initialState = {
      usuarioId: usuarioId
    };
    this.bsModalRef = this.modalService.show(EditarTerapiasComponent, { class: 'modal-lg', initialState }),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.refreshData();
      });
  }
}

