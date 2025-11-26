import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss']
})
export class NosotrosComponent {
  nombre: string = '';
  correo: string = '';
  mensaje: string = '';
  asunto: string = '';
  programaList = [
    {
      title: 'Terapia CINiad',
      description: '',
      imageUrl: 'assets/img/terapias.jpeg',
      altText: 'Niño en terapia de lenguaje',
      tallerId: 1
    },
    {
      title: 'Programas CINiad',
      description: '',
      imageUrl: 'assets/img/programas.jpeg',
      altText: 'Niño haciendo ejercicios psicomotrices',
      tallerId: 2,
    },
    {
      title: 'Talleres CINiad',
      description: '',
      imageUrl: 'assets/img/taller.jpeg',
      altText: 'Niño recibiendo apoyo escolar',
      tallerId: 3
    },
    {
      title: 'Actividades CINiad',
      description: '',
      imageUrl: 'assets/img/actividadaes.jpeg',
      altText: 'Niño en actividad de integración sensorial',
      tallerId: 4
    },
    {
      title: 'Recursos CINiad',
      description: '',
      imageUrl: 'assets/img/recursos.jpeg',
      altText: 'Niño en actividad de integración sensorial',
      tallerId: 4
    }
  ];
  constructor(

  ) { }

  onSubmitJoin() {

  }
  // Método para navegar a secciones
  scrollToSection(sectionId: string): void {

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
  solicitud() {
    // Evitar que el formulario recargue la página
    event?.preventDefault();

    // Validar que no estén vacíos
    if (!this.nombre || !this.correo || !this.mensaje) {
      alert('Por favor completa todos los campos.');
      return;
    }

    // Mensaje para WhatsApp
    const texto = `Hola, mi nombre es ${this.nombre}, mi correo es ${this.correo}. ${this.mensaje}`;
    const numero = '+51975741001'; // reemplaza con tu número de WhatsApp con código país
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

    // Abrir WhatsApp
    window.open(url, '_blank');
  }
  enviarcorreo(event: Event) {
    event.preventDefault(); // Evitar recargar página

    if (!this.nombre || !this.correo || !this.asunto || !this.mensaje) {
      alert('Por favor completa todos los campos');
      return;
    }

    const texto = `Hola, mi nombre es ${this.nombre}, mi correo es ${this.correo}. Asunto: ${this.asunto}. Mensaje: ${this.mensaje}`;
    const numero = '+51975741001'; // tu número de WhatsApp con código país
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

    window.open(url, '_blank');
  }
  ubicacionOlivos() {
    const direccionOlivos = 'Av. Marañón Mz. 07 Lote 17, Los Olivos, Lima, Perú';
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccionOlivos)}`;
    window.open(url, '_blank');
  }
  ubicacionBrena() {
    const direccionBrena = 'Jr. Pozuso 112, Breña, Lima, Perú';
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccionBrena)}`;
    window.open(url, '_blank');
  }
}

