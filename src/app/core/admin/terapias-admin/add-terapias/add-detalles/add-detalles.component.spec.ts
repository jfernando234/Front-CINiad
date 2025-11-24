import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDetallesComponent } from './add-detalles.component';

describe('AddDetallesComponent', () => {
  let component: AddDetallesComponent;
  let fixture: ComponentFixture<AddDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDetallesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
