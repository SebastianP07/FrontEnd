import { TestBed } from '@angular/core/testing';

import { GestionContribuyentesService } from './gestion-contribuyentes.service';

describe('GestionContribuyentesService', () => {
  let service: GestionContribuyentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionContribuyentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
