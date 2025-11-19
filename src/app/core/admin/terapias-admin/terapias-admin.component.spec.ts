import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerapiasAdminComponent } from './terapias-admin.component';

describe('TerapiasAdminComponent', () => {
  let component: TerapiasAdminComponent;
  let fixture: ComponentFixture<TerapiasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerapiasAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerapiasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
