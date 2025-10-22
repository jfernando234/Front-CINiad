import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionesAlumnoComponent } from './calificaciones-alumno.component';

describe('CalificacionesAlumnoComponent', () => {
  let component: CalificacionesAlumnoComponent;
  let fixture: ComponentFixture<CalificacionesAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalificacionesAlumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificacionesAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
