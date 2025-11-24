import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponnetsComponent } from './componnets.component';

describe('ComponnetsComponent', () => {
  let component: ComponnetsComponent;
  let fixture: ComponentFixture<ComponnetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponnetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponnetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
