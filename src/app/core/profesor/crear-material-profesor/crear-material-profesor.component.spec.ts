import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMaterialProfesorComponent } from './crear-material-profesor.component';

describe('CrearMaterialProfesorComponent', () => {
  let component: CrearMaterialProfesorComponent;
  let fixture: ComponentFixture<CrearMaterialProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearMaterialProfesorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearMaterialProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
