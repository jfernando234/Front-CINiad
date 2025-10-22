import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasAlumnoComponent } from './tareas-alumno.component';

describe('TareasAlumnoComponent', () => {
  let component: TareasAlumnoComponent;
  let fixture: ComponentFixture<TareasAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareasAlumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TareasAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
