import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVehiculosContribuyenteComponent } from './listar-vehiculos-contribuyente.component';

describe('ListarVehiculosContribuyenteComponent', () => {
  let component: ListarVehiculosContribuyenteComponent;
  let fixture: ComponentFixture<ListarVehiculosContribuyenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarVehiculosContribuyenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarVehiculosContribuyenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
