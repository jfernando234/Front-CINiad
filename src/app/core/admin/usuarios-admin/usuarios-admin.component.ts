import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.scss']
})
export class UsuariosAdminComponent {

  bsModalRef?: BsModalRef;


  /**varriables ngmodel */
  public nombreUsuario = '';

  public serialNumberArray: Array<number> = [];
  public pageNumberArray: Array<number> = [];
  isLoading = false;
  listUsuarios: any[] = [];

  constructor(private modalService: BsModalService,) { }


  filtroData() {

  }
  refreshData() {
    // Lógica para refrescar los datos
  }
  agregarUsuarios() {
    this.bsModalRef = this.modalService.show(AddUsuarioComponent, {
      class: 'modal-lg',
    });
  }
  editarUsuario(usuarioId: number) {
    const initialState = {
      usuarioId: usuarioId
    };
    this.bsModalRef = this.modalService.show(EditarUsuarioComponent, { class: 'modal-lg', initialState  }),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.refreshData();
      });
  }
}
