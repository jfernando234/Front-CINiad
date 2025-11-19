import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTerapiasComponent } from './editar-terapias.component';

describe('EditarTerapiasComponent', () => {
  let component: EditarTerapiasComponent;
  let fixture: ComponentFixture<EditarTerapiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarTerapiasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTerapiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
