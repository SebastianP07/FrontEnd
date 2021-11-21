import {Injectable} from '@angular/core';
import { CryptoService } from '../crypto/crypto.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private readonly crypto: CryptoService) {
  }

  getFromSession(key: string): any{
    const ct = sessionStorage.getItem(btoa(key));
    if (ct === null) {
      return null;
    }
    return this.crypto.decrypt(ct);
  }

  saveToSession(key: string, value: any): any {
    if (!value) {
      sessionStorage.removeItem(btoa(key));
    } else {
      sessionStorage.setItem(btoa(key), this.crypto.encrypt(value));
    }
  }

  getFromLocal(key: string): any {
    const ct = localStorage.getItem(btoa(key));
    if (ct === null) {
      return null;
    }
    return this.crypto.decrypt(ct);
  }

  saveToLocal(key: string, value: any): any {
    if (!value) {
      localStorage.removeItem(btoa(key));
    } else {
      localStorage.setItem(btoa(key), this.crypto.encrypt(value));
    }
  }
}
