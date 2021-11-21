import { TestBed, inject } from '@angular/core/testing';

import { CryptoService } from './crypto.service';

describe('CryptoService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptoService]
    });
  });

  it('should be created', inject([CryptoService], (service: CryptoService) => {
    expect(service).toBeTruthy();
  }));

  it('should parse items', inject([CryptoService], (service: CryptoService) => {
    expect(service.parseItem(null)).toBeNull();
    expect(service.parseItem(undefined)).toBeNull();
  }));

  it('should be generateChecksumAndCypher', inject([CryptoService], (service: CryptoService) => {
    const json = {
      signedToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.IntcImFcIjpcImFcIn0i.1Va8C6FKoXurcLzaTVsmLRsEfskJXaSRuUHEcwiMusM',
      checkSum: 'f1dcada8ac5b9d60a313d753a90487cf'
    };
    expect(service.generateChecksumAndCypher('{\"a\":\"a\"}', 'accessToken123')).toEqual(json);
  }));
});
