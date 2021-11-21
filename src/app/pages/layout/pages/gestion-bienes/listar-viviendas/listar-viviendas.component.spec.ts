import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarViviendasComponent } from './listar-viviendas.component';

describe('ListarViviendasComponent', () => {
  let component: ListarViviendasComponent;
  let fixture: ComponentFixture<ListarViviendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarViviendasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarViviendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
