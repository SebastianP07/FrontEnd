import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreacionEdicionComponent } from './dialog.component';

describe('DialogCreacionEdicionComponent', () => {
  let component: DialogCreacionEdicionComponent;
  let fixture: ComponentFixture<DialogCreacionEdicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreacionEdicionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreacionEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
