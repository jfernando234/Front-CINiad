import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { finalize } from 'rxjs';
import { IUsuario } from 'src/app/shared/models/usuarios';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.scss']
})
export class UsuariosAdminComponent {

  bsModalRef?: BsModalRef;
  isLoading = false;

  /**varriables ngmodel */
  public nombreUsuario = '';


  /**variables para data y paginacion */
  serialNumberArray: Array<number> = [];
  usuariosList: IUsuario[] = [];
  totalData = 0;
  pageNumberArray: Array<number> = [];
  currentPage = 1;
  pageSize = 10;
  displayList: any[] = [];
  constructor(private modalService: BsModalService, private usuarioService: UsuariosService) { }

  ngOnInit() {


  }
  obtenerUsuariosData(): void {
    this.usuarioService.obtenerAllUsuarios().pipe(finalize(() => this.isLoading = false))
      .subscribe((data: IUsuario[]) => {
        this.usuariosList = data;
        this.totalData = data.length;
        this.calculateTotalPages();
        this.moveToPage(1);
      })
  }
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
    this.bsModalRef = this.modalService.show(EditarUsuarioComponent, { class: 'modal-lg', initialState }),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.refreshData();
      });
  }
  /**Metodos de paginacion  */
  getMoreData(direction: 'next' | 'previous'): void {
    if (direction === 'next' && this.currentPage < this.pageNumberArray.length) {
      this.moveToPage(this.currentPage + 1);
    } else if (direction === 'previous' && this.currentPage > 1) {
      this.moveToPage(this.currentPage - 1);
    }
  }

  moveToPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayList = this.usuariosList.slice(startIndex, endIndex);

    // Opcional: actualizar números de serie
    this.serialNumberArray = this.displayList.map((_, i) => startIndex + i + 1);
  }

  calculateTotalPages(): void {
    const totalPages = Math.ceil(this.totalData / this.pageSize);
    this.pageNumberArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}
