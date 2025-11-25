import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ActividadesService } from 'src/app/shared/services/actividades.service';
import { IActividad } from 'src/app/shared/models/actividades';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditarActividadesComponent } from './editar-actividades/editar-actividades.component';
import Swal from 'sweetalert2';

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

  constructor(private modalService: BsModalService, private actividadesService: ActividadesService, private router: Router) { }

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
    this.router.navigate(['admin/actividades/add']);
  }
  editarActividades(id: number) {
    const initialState = {
      id: id
    };
    this.router.navigate(['admin/actividades/editar', initialState]);
  }

  eliminarActividades(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar esta terapia?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamada al servicio para eliminar
        this.actividadesService.eliminarActividades(id).subscribe({
          next: () => {
            Swal.fire('Eliminado!', 'La terapia ha sido eliminada.', 'success');
            this.obtenerActividadesData();
          },
          error: (err) => {
            Swal.fire('Error', 'No se pudo eliminar la terapia.', 'error');
            console.error(err);
          }
        });
      }
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
