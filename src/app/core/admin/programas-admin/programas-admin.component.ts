import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ProgramasService } from 'src/app/shared/services/programas.service';
import { IProgramas } from 'src/app/shared/models/programas';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditarProgramasComponent } from './editar-programas/editar-programas.component';
import Swal from 'sweetalert2';

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

  constructor(private modalService: BsModalService, private programasService: ProgramasService, private router: Router) { }

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
    this.router.navigate(['admin/programas/add']);
  }
  editarProgramas(id: number) {
    const initialState = {
      id: id
    };
    this.router.navigate(['admin/programas/editar', initialState]);
  }

  eliminarProgramas(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar esta Programa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamada al servicio para eliminar
        this.programasService.eliminarProgramas(id).subscribe({
          next: () => {
            Swal.fire('Eliminado!', 'Programa ha sido eliminada.', 'success');
            this.obtenerProgramasData();
          },
          error: (err) => {
            Swal.fire('Error', 'No se pudo eliminar el Programa.', 'error');
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
    this.displayList = this.ProgramasList.slice(startIndex, endIndex);
    this.serialNumberArray = this.displayList.map((_, i) => startIndex + i + 1);
  }

  calculateTotalPages(): void {
    const totalPages = Math.ceil(this.totalData / this.pageSize);
    this.pageNumberArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}
