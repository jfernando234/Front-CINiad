import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { RecursosService } from 'src/app/shared/services/recursos.service';
import { IRecurso } from 'src/app/shared/models/recursos';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditarRecursosComponent } from './editar-recursos/editar-recursos.component';
import Swal from 'sweetalert2';

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

  constructor(private modalService: BsModalService, private recursosService: RecursosService, private router: Router) { }

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
    this.router.navigate(['admin/recursos/add']);
  }
  editarRecursos(id: number) {
    const initialState = {
      id: id
    };
    this.router.navigate(['admin/recursos/editar', initialState]);
  }
  eliminarRecursos(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este Recurso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamada al servicio para eliminar
        this.recursosService.eliminarRecursos(id).subscribe({
          next: () => {
            Swal.fire('Eliminado!', 'La Recurso ha sido eliminada.', 'success');
            this.obtenerRecursosData();
          },
          error: (err) => {
            Swal.fire('Error', 'No se pudo eliminar la Recurso.', 'error');
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
    this.displayList = this.RecursosList.slice(startIndex, endIndex);
    this.serialNumberArray = this.displayList.map((_, i) => startIndex + i + 1);
  }

  calculateTotalPages(): void {
    const totalPages = Math.ceil(this.totalData / this.pageSize);
    this.pageNumberArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}
