import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCursosProfesorComponent } from './mis-cursos-profesor.component';

describe('MisCursosProfesorComponent', () => {
  let component: MisCursosProfesorComponent;
  let fixture: ComponentFixture<MisCursosProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisCursosProfesorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisCursosProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
