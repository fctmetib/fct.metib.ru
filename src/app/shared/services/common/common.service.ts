import { environment } from 'src/environments/environment';

import { Observable, Observer, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BankInterface } from '../../types/common/bank.interface';

export interface PostInterface {
  ID: number;
  Identifier: string;
  Title: string;
  TitleIn: string;
  TitleTo: string;
}

export interface RegionInterface {
  Code: string;
  ID: number;
  Identifier: string;
  Title: string;
}

@Injectable()
export class CommonService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostInterface[]> {
    let url = `${environment.apiUrl}/public/posts`;
    return this.http.get<PostInterface[]>(url);
  }
  getRegions(): Observable<RegionInterface[]> {
    let url = `${environment.apiUrl}/public/regions`;
    return this.http.get<RegionInterface[]>(url);
  }
  getCountries(): Observable<RegionInterface[]> {
    let url = `${environment.apiUrl}/public/countries`;
    return this.http.get<RegionInterface[]>(url);
  }

  getBankByBIK(bik: string): Observable<BankInterface[]> {
    let url = `${environment.apiUrl}/public/banks?bic=${bik}`;
    return this.http.get<BankInterface[]>(url);
  }

  getBankByName(name: string): Observable<BankInterface[]> {
    let url = `${environment.apiUrl}/public/banks?name=${name}`;
    return this.http.get<BankInterface[]>(url);
  }

  getIP(): Observable<string> {
    let url = `${environment.apiUrl}/test/ip`;
    // 'https://jsonip.com'
    return this.http.get<string>(url);
  }

  getCaptcha(): Observable<any> {
    const url = environment.apiUrl + '/captcha';
    return this.http.get(url, {
      observe: 'response',
      responseType: 'arraybuffer',
    });
  }

  getBase64(file): Observable<Uint8Array[]> {
    return Observable.create((observer: Observer<Uint8Array[]>) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        observer.next(e.target.result);
        observer.complete();
      };
      reader.readAsArrayBuffer(file);
    });
  }
}
