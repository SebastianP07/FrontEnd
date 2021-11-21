import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVerImpuestosComponent } from './dialog-ver-impuestos.component';

describe('DialogVerImpuestosComponent', () => {
  let component: DialogVerImpuestosComponent;
  let fixture: ComponentFixture<DialogVerImpuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogVerImpuestosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVerImpuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
