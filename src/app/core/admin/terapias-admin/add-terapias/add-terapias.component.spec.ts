import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTerapiasComponent } from './add-terapias.component';

describe('AddTerapiasComponent', () => {
  let component: AddTerapiasComponent;
  let fixture: ComponentFixture<AddTerapiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTerapiasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTerapiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
