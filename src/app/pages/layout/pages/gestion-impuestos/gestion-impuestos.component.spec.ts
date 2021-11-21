import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionImpuestosComponent } from './gestion-impuestos.component';

describe('GestionImpuestosComponent', () => {
  let component: GestionImpuestosComponent;
  let fixture: ComponentFixture<GestionImpuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionImpuestosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionImpuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
