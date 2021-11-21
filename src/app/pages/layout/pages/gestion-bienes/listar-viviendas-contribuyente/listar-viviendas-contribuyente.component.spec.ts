import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarViviendasContribuyenteComponent } from './listar-viviendas-contribuyente.component';

describe('ListarViviendasContribuyenteComponent', () => {
  let component: ListarViviendasContribuyenteComponent;
  let fixture: ComponentFixture<ListarViviendasContribuyenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarViviendasContribuyenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarViviendasContribuyenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
