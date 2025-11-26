import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { environment } from 'src/app/shared/enviroments/environment';
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
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.scss']
})
export class ContenidoComponent {
  contentData: any;
  isLoading = false;
  media = environment.apiURLmedia;

  // Id y tipo vienen por ruta
  contentId: number = 0;
  contentType: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private terapiasService: TerapiasService,
    private programasService: ProgramasService,
    private talleresService: TalleresService,
    private actividadesService: ActividadesService,
    private recursosService: RecursosService
  ) { }

  ngOnInit(): void {
    // Obtenemos parámetros de la ruta
    this.contentId = Number(this.route.snapshot.paramMap.get('id'));
    this.contentType = this.route.snapshot.paramMap.get('type') || '';

    if (!this.contentId || !this.contentType) {
      this.router.navigate(['/inicio']);
      return;
    }

    this.loadContent();
  }

  loadContent(): void {
    this.isLoading = true;

    const finalizeLoading = () => (this.isLoading = false);

    if (this.contentType === 'Terapia') {
      this.terapiasService.obetenerTerapiasId(this.contentId)
        .pipe(finalize(finalizeLoading))
        .subscribe((data: ITerapia) => this.contentData = data);

    } else if (this.contentType === 'Programa') {
      this.programasService.obetenerProgramasId(this.contentId)
        .pipe(finalize(finalizeLoading))
        .subscribe((data: IProgramas) => this.contentData = data);

    } else if (this.contentType === 'Taller') {
      this.talleresService.obetenerTalleresId(this.contentId)
        .pipe(finalize(finalizeLoading))
        .subscribe((data: ITaller) => this.contentData = data);

    } else if (this.contentType === 'Actividad') {
      this.actividadesService.obetenerActividadesId(this.contentId)
        .pipe(finalize(finalizeLoading))
        .subscribe((data: IActividad) => this.contentData = data);

    } else if (this.contentType === 'Recurso') {
      this.recursosService.obetenerRecursosId(this.contentId)
        .pipe(finalize(finalizeLoading))
        .subscribe((data: IRecurso) => this.contentData = data);

    } else {
      console.error('Tipo de contenido desconocido');
      this.router.navigate(['/inicio']);
    }
  }

  sanitizedContent(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.contentData?.contenido || '');
  }

  getImageUrl(path?: string): string {
    return path ? this.media + path : 'assets/img/default-content.jpg';
  }

  goBack(): void {
    this.router.navigate(['/inicio']);
  }
}
