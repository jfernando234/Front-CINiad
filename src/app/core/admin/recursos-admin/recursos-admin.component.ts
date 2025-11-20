import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { RecursosService } from 'src/app/shared/services/recursos.service';
import { IRecurso } from 'src/app/shared/models/recursos';
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

  /* paginacion y datos */
  serialNumberArray: Array<number> = [];
  RecursosList: IRecurso[] = [];
  totalData = 0;
  pageNumberArray: Array<number> = [];
  currentPage = 1;
  pageSize = 10;
  displayList: any[] = [];

  constructor(private modalService: BsModalService, private recursosService: RecursosService) { }

  ngOnInit() {
    this.obtenerRecursosData();
  }
  obtenerRecursosData(): void {
    this.isLoading = true;
    this.recursosService.obtenerAllRecursos().pipe(finalize(() => this.isLoading = false))
      .subscribe((data: IRecurso[]) => {
        this.RecursosList = data;
        this.totalData = data.length;
        this.calculateTotalPages();
        this.moveToPage(1);
      });
  }

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
  editarRecursos(recursoId: number) {
    const initialState = {
      recursosId: recursoId
    };
    this.bsModalRef = this.modalService.show(EditarRecursosComponent, { class: 'modal-lg', initialState }),
      this.bsModalRef.onHidden?.subscribe(() => {
          this.refreshData();
          this.obtenerRecursosData();
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
      this.displayList = this.RecursosList.slice(startIndex, endIndex);
      this.serialNumberArray = this.displayList.map((_, i) => startIndex + i + 1);
    }

    calculateTotalPages(): void {
      const totalPages = Math.ceil(this.totalData / this.pageSize);
      this.pageNumberArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    }
}
