import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosContribuyenteComponent } from './datos-contribuyente.component';

describe('DatosContribuyenteComponent', () => {
  let component: DatosContribuyenteComponent;
  let fixture: ComponentFixture<DatosContribuyenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosContribuyenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosContribuyenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
