import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddRecursosComponent } from './add-recursos/add-recursos.component';
import { EditarRecursosComponent } from './editar-recursos/editar-recursos.component';

@Component({
  selector: 'app-recursos-admin',
  templateUrl: './recursos-admin.component.html',
  styleUrls: ['./recursos-admin.component.scss']
})
export class RecursosAdminComponent {
  bsModalRef?: BsModalRef;
  isLoading = false;
  constructor(private modalService: BsModalService) { }

  filtroData() {

  }
  refreshData() {
    // Lógica para refrescar los datos
  }
  agregarRecursos() {
    this.bsModalRef = this.modalService.show(AddRecursosComponent, {
      class: 'modal-lg',
    });
  }
  editarRecursos(usuarioId: number) {
    const initialState = {
      usuarioId: usuarioId
    };
    this.bsModalRef = this.modalService.show(EditarRecursosComponent, { class: 'modal-lg', initialState }),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.refreshData();
      });
  }
}
