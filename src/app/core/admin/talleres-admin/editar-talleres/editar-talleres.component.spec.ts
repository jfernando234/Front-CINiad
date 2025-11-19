import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTalleresComponent } from './editar-talleres.component';

describe('EditarTalleresComponent', () => {
  let component: EditarTalleresComponent;
  let fixture: ComponentFixture<EditarTalleresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarTalleresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTalleresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
