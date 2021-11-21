import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarComerciosContribuyenteComponent } from './listar-comercios-contribuyente.component';

describe('ListarComerciosContribuyenteComponent', () => {
  let component: ListarComerciosContribuyenteComponent;
  let fixture: ComponentFixture<ListarComerciosContribuyenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarComerciosContribuyenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarComerciosContribuyenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
