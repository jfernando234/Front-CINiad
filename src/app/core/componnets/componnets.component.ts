import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-componnets',
  templateUrl: './componnets.component.html',
  styleUrls: ['./componnets.component.scss']
})
export class ComponnetsComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @Input() altText: string = '';
   @Input() itemId: number = 0;
  @Output() cardClick = new EventEmitter<void>();
  constructor(private router: Router

  ){}
  onCardClick(): void {
    this.router.navigate(['/detalle', this.itemId]);
  }

}
