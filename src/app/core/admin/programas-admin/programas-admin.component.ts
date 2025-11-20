import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { ProgramasService } from 'src/app/shared/services/programas.service';
import { IProgramas } from 'src/app/shared/models/programas';
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

  /* paginacion y datos */
  serialNumberArray: Array<number> = [];
  ProgramasList: IProgramas[] = [];
  totalData = 0;
  pageNumberArray: Array<number> = [];
  currentPage = 1;
  pageSize = 10;
  displayList: any[] = [];

  constructor(private modalService: BsModalService, private programasService: ProgramasService) { }

  ngOnInit() {
    this.obtenerProgramasData();
  }
  obtenerProgramasData(): void {
    this.isLoading = true;
    this.programasService.obtenerAllProgramas().pipe(finalize(() => this.isLoading = false))
      .subscribe((data: IProgramas[]) => {
        this.ProgramasList = data;
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
  agregarProgramas() {
    this.bsModalRef = this.modalService.show(AddProgramasComponent, {
      class: 'modal-lg',
    });
  }
  editarProgramas(programaId: number) {
    const initialState = {
      programasId: programaId
    };
    this.bsModalRef = this.modalService.show(EditarProgramasComponent, { class: 'modal-lg', initialState }),
      this.bsModalRef.onHidden?.subscribe(() => {
          this.refreshData();
          this.obtenerProgramasData();
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
      this.displayList = this.ProgramasList.slice(startIndex, endIndex);
      this.serialNumberArray = this.displayList.map((_, i) => startIndex + i + 1);
    }

    calculateTotalPages(): void {
      const totalPages = Math.ceil(this.totalData / this.pageSize);
      this.pageNumberArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    }
}
