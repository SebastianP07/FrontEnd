import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() {
  }

  encrypt(data: any): string {
    const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), environment.STORAGE);
    return cipherText.toString();
  }

  decrypt(cipherText: string): any{
    const bytes = CryptoJS.AES.decrypt(cipherText, environment.STORAGE);
    return this.parseItem(bytes.toString(CryptoJS.enc.Utf8));
  }

  parseItem(item: any): any{
    if (item === null || item === undefined) {
      return null;
    }
    return JSON.parse(item);
  }

  base64url(source: CryptoJS.lib.WordArray): any{
    let encodedSource = CryptoJS.enc.Base64.stringify(source);
    encodedSource = encodedSource.replace(/=+$/, '');
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');
    return encodedSource;
  }

  generateChecksumAndCypher(content: any, accessToken: string): { signedToken: string, checkSum: string } {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };
    const stringHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    const encodedHeader = this.base64url(stringHeader);
    const stringData = CryptoJS.enc.Utf8.parse(JSON.stringify(content));
    const encodedData = this.base64url(stringData);
    const token = `${encodedHeader}.${encodedData}`;
    const signature = CryptoJS.HmacSHA256(token, accessToken);
    const signatureResult = this.base64url(signature);
    const signedToken = `${token}.${signatureResult}`;
    const generatedCheckSum = CryptoJS.MD5(signedToken).toString();
    return {signedToken, checkSum: generatedCheckSum};
  }
}
