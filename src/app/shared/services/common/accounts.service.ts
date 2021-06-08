import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getUserCertificates, Certificate } from 'crypto-pro';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AccountsService {
  constructor(private http: HttpClient) {}

  getAccounts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/accounts`);
  }
}
