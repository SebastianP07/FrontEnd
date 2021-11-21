import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleImpuestoBienComponent } from './detalle-impuesto-bien.component';

describe('DetalleImpuestoBienComponent', () => {
  let component: DetalleImpuestoBienComponent;
  let fixture: ComponentFixture<DetalleImpuestoBienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleImpuestoBienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleImpuestoBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
