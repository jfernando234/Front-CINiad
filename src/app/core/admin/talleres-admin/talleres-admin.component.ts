import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { TalleresService } from 'src/app/shared/services/talleres.service';
import { ITaller } from 'src/app/shared/models/talleres';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditarTalleresComponent } from './editar-talleres/editar-talleres.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-talleres-admin',
  templateUrl: './talleres-admin.component.html',
  styleUrls: ['./talleres-admin.component.scss']
})
export class TalleresAdminComponent {
  bsModalRef?: BsModalRef;
  isLoading = false;
  /* paginacion y datos */
  serialNumberArray: Array<number> = [];
  TalleresList: ITaller[] = [];
  totalData = 0;
  pageNumberArray: Array<number> = [];
  currentPage = 1;
  pageSize = 10;
  displayList: any[] = [];

  constructor(private modalService: BsModalService, private talleresService: TalleresService, private router: Router) { }

  ngOnInit() {
    this.obtenerTalleresData();
  }
  obtenerTalleresData(): void {
    this.isLoading = true;
    this.talleresService.obtenerAllTalleres().pipe(finalize(() => this.isLoading = false))
      .subscribe((data: ITaller[]) => {
        this.TalleresList = data;
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
  agregarTalleres() {
    this.router.navigate(['admin/talleres/add']);
  }
  editarTalleres(id: number) {
    const initialState = {
      id: id
    };
    this.router.navigate(['admin/talleres/editar', initialState]);
  }
  eliminarTaller(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este Taller?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamada al servicio para eliminar
        this.talleresService.eliminarTalleres(id).subscribe({
          next: () => {
            Swal.fire('Eliminado!', 'La terapia ha sido eliminada.', 'success');
            this.obtenerTalleresData();
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
    this.displayList = this.TalleresList.slice(startIndex, endIndex);
    this.serialNumberArray = this.displayList.map((_, i) => startIndex + i + 1);
  }

  calculateTotalPages(): void {
    const totalPages = Math.ceil(this.totalData / this.pageSize);
    this.pageNumberArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}
