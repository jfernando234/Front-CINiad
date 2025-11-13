import { Component, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginComponent } from 'src/app/autenticacion/login/login.component';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  // Datos para las secciones (podrías obtenerlos de un servicio)
  sections = [
    {
      title: 'Terapias',
      videos: [
        { id: '1', title: 'Terapia de Relajación' },
        { id: '2', title: 'Terapia Cognitiva' }
      ]
    },
    {
      title: 'Programas',
      videos: [
        { id: '4', title: 'Programa de Meditación' },
        { id: '5', title: 'Programa de Ejercicios' }
      ]
    },
    {
      title: 'Actividades en Casa',
      videos: [
        { id: '6', title: 'Yoga en Casa' },
        { id: '7', title: 'Ejercicios Respiratorios' }
      ]
    },
    {
      title: 'Recursos',
      videos: [
        { id: '8', title: 'Guía de Recursos' },
        { id: '9', title: 'Material de Apoyo' }
      ]
    },
    {
      title: 'Ayuda',
      videos: [
        { id: '10', title: 'Primeros Auxilios' },
        { id: '11', title: 'Soporte Emocional' }
      ]
    }
  ];
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.sections;
  }
  cambiar(){
    
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
