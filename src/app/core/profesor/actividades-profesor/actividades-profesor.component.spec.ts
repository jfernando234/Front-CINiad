import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesProfesorComponent } from './actividades-profesor.component';

describe('ActividadesProfesorComponent', () => {
  let component: ActividadesProfesorComponent;
  let fixture: ComponentFixture<ActividadesProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadesProfesorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadesProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
