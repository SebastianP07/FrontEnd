import { inject, TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';
import { CryptoService } from '../crypto/crypto.service';

describe('StorageService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StorageService,
        CryptoService
      ]
    });

    let store = {};
    let sessionStore = {};

    spyOn(localStorage, 'clear').and.callFake(() => {
      store = {};
    });
    spyOn(sessionStorage, 'clear').and.callFake(() => {
      sessionStore = {};
    });
  });

  it('should be created', inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy();
  }));

  it('should save to session storage', inject([StorageService], (service: StorageService) => {
    expect(service.getFromSession('mine')).toBeNull();
    service.saveToSession('mine', 'myvalue');
    expect(service.getFromSession('mine')).toBe('myvalue');
    service.saveToSession('mine', 'myvalue');
    expect(service.getFromSession('mine')).toBeTruthy();
    service.saveToSession('mine', null);
    expect(service.getFromSession('mine')).toBeNull();
  }));

  it('should save to local storage', inject([StorageService], (service: StorageService) => {
    expect(service.getFromLocal('mine')).toBeNull();
    service.saveToLocal('mine', 'myvalue');
    expect(service.getFromLocal('mine')).toBe('myvalue');
    service.saveToLocal('mine', 'myvalue');
    expect(service.getFromLocal('mine')).toBeTruthy();
    service.saveToLocal('mine', null);
    expect(service.getFromLocal('mine')).toBeNull();
  }));
});

