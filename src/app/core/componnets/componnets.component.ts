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
  @Input() imageUrl: string = '';
  @Input() altText: string = '';
  @Input() itemId: number = 0;
  @Output() cardClick = new EventEmitter<void>();
  constructor(private router: Router

  ) { }
  onCardClick(id: number | undefined) {
    if (!id) {
      console.warn('El itemId es undefined');
      return;
    }
    this.router.navigate(['/detalle', id]);
  }

}
