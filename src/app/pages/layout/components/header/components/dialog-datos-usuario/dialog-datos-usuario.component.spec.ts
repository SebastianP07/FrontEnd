import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDatosUsuarioComponent } from './dialog-datos-usuario.component';

describe('DialogDatosUsuarioComponent', () => {
  let component: DialogDatosUsuarioComponent;
  let fixture: ComponentFixture<DialogDatosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDatosUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDatosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
