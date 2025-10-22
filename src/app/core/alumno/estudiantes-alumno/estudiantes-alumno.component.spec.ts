import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesAlumnoComponent } from './estudiantes-alumno.component';

describe('EstudiantesAlumnoComponent', () => {
  let component: EstudiantesAlumnoComponent;
  let fixture: ComponentFixture<EstudiantesAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudiantesAlumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudiantesAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
