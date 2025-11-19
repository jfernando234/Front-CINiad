import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProgramasComponent } from './editar-programas.component';

describe('EditarProgramasComponent', () => {
  let component: EditarProgramasComponent;
  let fixture: ComponentFixture<EditarProgramasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarProgramasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarProgramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
