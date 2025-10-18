import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesCasaComponent } from './actividades-casa.component';

describe('ActividadesCasaComponent', () => {
  let component: ActividadesCasaComponent;
  let fixture: ComponentFixture<ActividadesCasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadesCasaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadesCasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
