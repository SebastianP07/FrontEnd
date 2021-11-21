import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionBienesComponent } from './gestion-bienes.component';

describe('GestionBienesComponent', () => {
  let component: GestionBienesComponent;
  let fixture: ComponentFixture<GestionBienesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionBienesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionBienesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
