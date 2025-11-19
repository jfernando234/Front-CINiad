import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTalleresComponent } from './add-talleres.component';

describe('AddTalleresComponent', () => {
  let component: AddTalleresComponent;
  let fixture: ComponentFixture<AddTalleresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTalleresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTalleresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
