import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecursosComponent } from './add-recursos.component';

describe('AddRecursosComponent', () => {
  let component: AddRecursosComponent;
  let fixture: ComponentFixture<AddRecursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecursosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
