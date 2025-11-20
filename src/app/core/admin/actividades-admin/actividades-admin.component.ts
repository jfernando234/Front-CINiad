import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { ActividadesService } from 'src/app/shared/services/actividades.service';
import { IActividad } from 'src/app/shared/models/actividades';
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
  isLoading = false;

  /* paginacion y datos */
  serialNumberArray: Array<number> = [];
  ActividadesList: IActividad[] = [];
  totalData = 0;
  pageNumberArray: Array<number> = [];
  currentPage = 1;
  pageSize = 10;
  displayList: any[] = [];

  constructor(private modalService: BsModalService, private actividadesService: ActividadesService) { }

  filtroData() {

  }
  refreshData() {
    // Lógica para refrescar los datos
  }
  ngOnInit() {
    this.obtenerActividadesData();
  }
  obtenerActividadesData(): void {
    this.isLoading = true;
    this.actividadesService.obtenerAllActividades().pipe(finalize(() => this.isLoading = false))
      .subscribe((data: IActividad[]) => {
        this.ActividadesList = data;
        this.totalData = data.length;
        this.calculateTotalPages();
        this.moveToPage(1);
      });
  }
  agregarActividades() {
    this.bsModalRef = this.modalService.show(AddActividadesComponent, {
      class: 'modal-lg',
    });
  }
  editarActividades(actividadId: number) {
    const initialState = {
      actividadesId: actividadId
    };
    this.bsModalRef = this.modalService.show(EditarActividadesComponent, { class: 'modal-lg', initialState }),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.refreshData();
        this.obtenerActividadesData();
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
    this.displayList = this.ActividadesList.slice(startIndex, endIndex);
    this.serialNumberArray = this.displayList.map((_, i) => startIndex + i + 1);
  }

  calculateTotalPages(): void {
    const totalPages = Math.ceil(this.totalData / this.pageSize);
    this.pageNumberArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}
