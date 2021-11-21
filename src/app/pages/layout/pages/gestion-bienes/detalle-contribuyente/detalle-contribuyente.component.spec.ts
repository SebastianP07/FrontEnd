import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleContribuyenteComponent } from './detalle-contribuyente.component';

describe('DetalleContribuyenteComponent', () => {
  let component: DetalleContribuyenteComponent;
  let fixture: ComponentFixture<DetalleContribuyenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleContribuyenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleContribuyenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
