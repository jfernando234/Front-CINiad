import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { finalize } from 'rxjs';
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

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit, AfterViewInit, OnDestroy {
  isLoading = false;
  TerapiasList: any;
  programaList: any;
  tallerList: any;
  actividadList: any;
  recursoList: any;

  // Flags para controlar qué datos ya se cargaron
  private datosCargados: any = {
    terapias: false,
    programas: false,
    talleres: false,
    actividades: false,
    recursos: false
  };

  private observer: IntersectionObserver;

  constructor(
    private sanitizer: DomSanitizer,
    private terapiasService: TerapiasService,
    private talleresService: TalleresService,
    private recursosService: RecursosService,
    private programasServices: ProgramasService,
    private actividadServices: ActividadesService
  ) {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.cargarDatosPorSeccion(entry.target.id);
        }
      });
    }, {
      rootMargin: '50px',
      threshold: 0.1
    });
  }

  ngOnInit(): void {
    this.loadDatosIniciales();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.observarSecciones();
    });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  observarSecciones(): void {
    const sections = ['programas', 'talleres', 'actividades', 'recursos'];

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      const key = this.getKeyFromSectionId(sectionId);
      if (element && !this.datosCargados[key]) {
        this.observer.observe(element);
      }
    });
  }

  private getKeyFromSectionId(sectionId: string): string {
    const mapping: any = {
      'programas': 'programas',
      'talleres': 'talleres',
      'actividades': 'actividades',
      'recursos': 'recursos'
    };
    return mapping[sectionId];
  }

  private cargarDatosPorSeccion(sectionId: string): void {
    const key = this.getKeyFromSectionId(sectionId);

    switch (key) {
      case 'programas':
        this.cargarProgramasSiNecesario();
        break;
      case 'talleres':
        this.cargarTalleresSiNecesario();
        break;
      case 'actividades':
        this.cargarActividadesSiNecesario();
        break;
      case 'recursos':
        this.cargarRecursosSiNecesario();
        break;
    }

    // Dejar de observar una vez cargada
    const element = document.getElementById(sectionId);
    if (element) {
      this.observer.unobserve(element);
    }
  }

  loadDatosIniciales(): void {
    this.isLoading = true;
    this.terapiasService.obtenerAllTerapias()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((data: ITerapia[]) => {
        this.TerapiasList = data;
        this.datosCargados.terapias = true;
      });
  }

  cargarProgramasSiNecesario(): void {
    if (!this.datosCargados.programas && !this.programaList) {
      this.isLoading = true;
      this.programasServices.obtenerAllProgramas()
        .pipe(finalize(() => this.isLoading = false))
        .subscribe((data: IProgramas[]) => {
          this.programaList = data;
          this.datosCargados.programas = true;
        });
    }
  }

  cargarTalleresSiNecesario(): void {
    if (!this.datosCargados.talleres && !this.tallerList) {
      this.isLoading = true;
      this.talleresService.obtenerAllTalleres()
        .pipe(finalize(() => this.isLoading = false))
        .subscribe((data: ITaller[]) => {
          this.tallerList = data;
          this.datosCargados.talleres = true;
        });
    }
  }

  cargarActividadesSiNecesario(): void {
    if (!this.datosCargados.actividades && !this.actividadList) {
      this.isLoading = true;
      this.actividadServices.obtenerAllActividades()
        .pipe(finalize(() => this.isLoading = false))
        .subscribe((data: IActividad[]) => {
          this.actividadList = data;
          this.datosCargados.actividades = true;
        });
    }
  }

  cargarRecursosSiNecesario(): void {
    if (!this.datosCargados.recursos && !this.recursoList) {
      this.isLoading = true;
      this.recursosService.obtenerAllRecursos()
        .pipe(finalize(() => this.isLoading = false))
        .subscribe((data: IRecurso[]) => {
          this.recursoList = data;
          this.datosCargados.recursos = true;
        });
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      this.cargarDatosPorSeccion(sectionId);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getSafeUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

  openCardDetail(item: number) {
    // Tu implementación
  }

  cambiar() {
    // Tu implementación
  }
}
