import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesAlumnoComponent } from './materiales-alumno.component';

describe('MaterialesAlumnoComponent', () => {
  let component: MaterialesAlumnoComponent;
  let fixture: ComponentFixture<MaterialesAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialesAlumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialesAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
