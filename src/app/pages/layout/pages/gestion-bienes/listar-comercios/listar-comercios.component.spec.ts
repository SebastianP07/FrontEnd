import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarComerciosComponent } from './listar-comercios.component';

describe('ListarComerciosComponent', () => {
  let component: ListarComerciosComponent;
  let fixture: ComponentFixture<ListarComerciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarComerciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarComerciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
