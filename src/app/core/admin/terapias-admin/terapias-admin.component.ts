import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditarTerapiasComponent } from './editar-terapias/editar-terapias.component';
import { Router } from '@angular/router';
import { ITerapia } from 'src/app/shared/models/terapias';
import { TerapiasService } from 'src/app/shared/services/terapias.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-terapias-admin',
  templateUrl: './terapias-admin.component.html',
  styleUrls: ['./terapias-admin.component.scss']
})
export class TerapiasAdminComponent {

  bsModalRef?: BsModalRef;
  isLoading = false;

  /**variables para data y paginacion */
  serialNumberArray: Array<number> = [];
  TerapiasList: ITerapia[] = [];
  totalData = 0;
  pageNumberArray: Array<number> = [];
  currentPage = 1;
  pageSize = 10;
  displayList: any[] = [];
  constructor(private modalService: BsModalService, private terapiasService: TerapiasService,
    private router: Router
  ) { }

  ngOnInit() {
    this.obtenerTerapiasData();
  }
  obtenerTerapiasData(): void {
    this.terapiasService.obtenerAllTerapias().pipe(finalize(() => this.isLoading = false))
      .subscribe((data: ITerapia[]) => {
        this.TerapiasList = data;
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
  agregarTerapias() {
    this.router.navigate(['admin/terapias/add']);
  }
  editarTerapias(terapiaId: number) {
    const initialState = {
      terapiasId: terapiaId
    };
    this.router.navigate(['admin/terapias/editar',initialState]);
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
    this.displayList = this.TerapiasList.slice(startIndex, endIndex);

    // Opcional: actualizar números de serie
    this.serialNumberArray = this.displayList.map((_, i) => startIndex + i + 1);
  }

  calculateTotalPages(): void {
    const totalPages = Math.ceil(this.totalData / this.pageSize);
    this.pageNumberArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

}

