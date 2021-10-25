import { Injectable } from '@angular/core';
import { getUserCertificates, Certificate } from 'crypto-pro';
import { from, Observable } from 'rxjs';

@Injectable()
export class CryptoProService {
  constructor() {}

  getCertificates(): Observable<Certificate[]> {
    try {
      return from(getUserCertificates());
    } catch (error) {
    }
  }
}
