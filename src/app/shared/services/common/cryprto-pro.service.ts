import { Injectable } from '@angular/core';
import { getUserCertificates, Certificate } from 'crypto-pro';


@Injectable()
export class CryptoProService {
  constructor() {}

  getCertificates() {
    (async () => {
      let certificates: Certificate[];

      try {
        certificates = await getUserCertificates();
      } catch(error) {
        // ...
      }
    })();
  }
}
