import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramasAdminComponent } from './programas-admin.component';

describe('ProgramasAdminComponent', () => {
  let component: ProgramasAdminComponent;
  let fixture: ComponentFixture<ProgramasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramasAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
