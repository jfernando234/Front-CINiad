import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/shared/enviroments/environment';

@Component({
  selector: 'app-componnets',
  templateUrl: './componnets.component.html',
  styleUrls: ['./componnets.component.scss']
})
export class ComponnetsComponent {
  media = environment.apiURLmedia;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl?: string = '';
  @Input() altText?: string = '';
  @Input() itemId: number = 0;
  @Output() cardClicked = new EventEmitter<number>(); // ⚠️ Emite un número
  @Input() type: string = '';
  constructor(private router: Router) { }
  onCardClick() {
    if (!this.itemId || !this.type) return;
    // Redirige a ContenidoComponent pasando tipo e id
    //window.location.href = `/detalle/${this.type}/${this.itemId}`;
    // O usando Angular Router:
    this.router.navigate(['/detalle', this.type, this.itemId]);
  }

}
