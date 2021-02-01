import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
export class CryptoService {
  private KEY: string;

  constructor() {
    this.KEY = environment.cryptoPrivateKey;
  }

  encrypt(data) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.KEY).toString();
    } catch (e) {
      console.log(e);
    }
  }

  decrypt(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.KEY);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
