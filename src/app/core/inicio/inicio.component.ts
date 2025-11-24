import { Component, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { LoginComponent } from 'src/app/autenticacion/login/login.component';
import { IActividad } from 'src/app/shared/models/actividades';
import { IProgramas } from 'src/app/shared/models/programas';
import { IRecurso } from 'src/app/shared/models/recursos';
import { ITaller } from 'src/app/shared/models/talleres';
import { ITerapia } from 'src/app/shared/models/terapias';
import { ActividadesService } from 'src/app/shared/services/actividades.service';
import { ProgramasService } from 'src/app/shared/services/programas.service';
import { RecursosService } from 'src/app/shared/services/recursos.service';
import { TalleresService } from 'src/app/shared/services/talleres.service';
import { TerapiasService } from 'src/app/shared/services/terapias.service';
export interface Product {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  altText: string;
  price?: number;
  category?: string;
}
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})

export class InicioComponent implements OnInit {
  isLoading = false
  TerapiasList: any;
  programaList: any
  tallerList: any;
  actividadList: any;
  recursoList: any;

  products: Product[] = [
    {
      id: 1,
      title: 'Terapia Ocupacional',
      description: 'Desarrollo de habilidades motoras y de la vida diaria a través de actividades lúdicas y funcionales.',
      imageUrl: 'assets/images/terapia-ocupacional.jpg',
      altText: 'Niño realizando actividades de terapia ocupacional',
      price: 850,
      category: 'Terapia'
    }
  ]
  constructor(
    private sanitizer: DomSanitizer,
    private terapiasService: TerapiasService,
    private talleresService: TalleresService,
    private recursosService: RecursosService,
    private programasServices: ProgramasService,
    private actividadServices: ActividadesService
  ) { }

  ngOnInit(): void {
    this.loadAllData();
  }
  loadAllData(): void {
    this.isLoading = true;

    // Cargar todos los datos en paralelo
    this.terapiasService.obtenerAllTerapias().pipe(finalize(() => this.isLoading = false))
      .subscribe((data: ITerapia[]) => {
        this.TerapiasList = data;
      })
    this.programasServices.obtenerAllProgramas().pipe(finalize(() => this.isLoading = false))
      .subscribe((data: IProgramas[]) => {
        this.programaList = data;
      })
    this.talleresService.obtenerAllTalleres().pipe(finalize(() => this.isLoading = false))
      .subscribe((data: ITaller[]) => {
        this.tallerList = data;
      })
    this.actividadServices.obtenerAllActividades().pipe(finalize(() => this.isLoading = false))
      .subscribe((data: IActividad[]) => {
        this.actividadList = data;
      })
    this.recursosService.obtenerAllRecursos().pipe(finalize(() => this.isLoading = false))
      .subscribe((data: IRecurso[]) => {
        this.recursoList = data;
      })
  }

  openCardDetail(item: number) {

  }
  cambiar() {

  }
  // Método para navegar a secciones
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  getSafeUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

}
