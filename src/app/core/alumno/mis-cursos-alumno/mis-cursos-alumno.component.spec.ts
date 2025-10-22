import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCursosAlumnoComponent } from './mis-cursos-alumno.component';

describe('MisCursosAlumnoComponent', () => {
  let component: MisCursosAlumnoComponent;
  let fixture: ComponentFixture<MisCursosAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisCursosAlumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisCursosAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
