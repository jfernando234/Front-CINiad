import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss']
})
export class NosotrosComponent {
  programaList!: any;
  constructor(

  ) { }
  onSubmitJoin() {

  }
  // Método para navegar a secciones
  scrollToSection(sectionId: string): void {
    console.log('[NosotrosComponent] scrollToSection called:', sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      // Scroll suave con offset para el header fijo
      const offset = 120; // Ajusta según la altura de tu header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Enfocar el elemento para accesibilidad (asegurar que pueda recibir focus)
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1');
      }
      element.focus({ preventScroll: true });
    } else {
      console.warn('[NosotrosComponent] no se encontró el elemento con id:', sectionId);
    }
  }

}
