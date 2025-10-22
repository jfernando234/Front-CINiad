import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosAlumnoComponent } from './recursos-alumno.component';

describe('RecursosAlumnoComponent', () => {
  let component: RecursosAlumnoComponent;
  let fixture: ComponentFixture<RecursosAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursosAlumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursosAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
