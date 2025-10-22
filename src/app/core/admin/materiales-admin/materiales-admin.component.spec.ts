import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesAdminComponent } from './materiales-admin.component';

describe('MaterialesAdminComponent', () => {
  let component: MaterialesAdminComponent;
  let fixture: ComponentFixture<MaterialesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialesAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
