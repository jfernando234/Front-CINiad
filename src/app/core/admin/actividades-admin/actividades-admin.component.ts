import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddActividadesComponent } from './add-actividades/add-actividades.component';
import { EditarActividadesComponent } from './editar-actividades/editar-actividades.component';

@Component({
  selector: 'app-actividades-admin',
  templateUrl: './actividades-admin.component.html',
  styleUrls: ['./actividades-admin.component.scss']
})
export class ActividadesAdminComponent {
  bsModalRef?: BsModalRef;
  isLoading =false;
  constructor(private modalService: BsModalService) { }

  filtroData() {

  }
  refreshData() {
    // Lógica para refrescar los datos
  }
  agregarActividades() {
    this.bsModalRef = this.modalService.show(AddActividadesComponent, {
      class: 'modal-lg',
    });
  }
  editarActividades(usuarioId: number) {
    const initialState = {
      usuarioId: usuarioId
    };
    this.bsModalRef = this.modalService.show(EditarActividadesComponent, { class: 'modal-lg', initialState }),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.refreshData();
      });
  }
}
