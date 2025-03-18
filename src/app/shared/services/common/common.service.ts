import {environment} from 'src/environments/environment';

import {map, Observable, Observer, of} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BankInterface} from '../../types/common/bank.interface';
import {DomSanitizer} from '@angular/platform-browser';

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
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
  }

  getIdCenters(code): Observable<any[]> {
    let url = `${environment.apiUrl}/caluga/identificationPoints?code=${code}`;
    return this.http.get<any[]>(url);
  }

  getPosts(): Observable<PostInterface[]> {
    let url = `${environment.apiUrl}/public/posts`;
    return this.http.get<PostInterface[]>(url);
  }

  getRegions(): Observable<RegionInterface[]> {
    let url = `${environment.apiUrl}/public/regions`;
    return this.http.get<RegionInterface[]>(url);
  }

  getCountries(): Observable<RegionInterface[]> {
    let url = `${environment.apiUrl}/v1/public/countries`;
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

  getCaptcha(): Observable<{ image: any; code: string }> {
    const url = environment.apiUrl + '/v1/captcha';
    return this.http.get(url, {
      observe: 'response',
      responseType: 'arraybuffer',
    }).pipe(
      map((resp: HttpResponse<ArrayBuffer>) => {
        const uint8View = new Uint8Array(resp.body);
        const STRING_CHAR = String.fromCharCode.apply(null, uint8View);
        const base64String = btoa(STRING_CHAR);
        const image = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ` + base64String);

        // Извлекаем код из заголовков ответа
        const contentDisposition = resp.headers.get('x-captcha-code');
        let code = '';
        if (contentDisposition) {
          const fileName = contentDisposition.split('=').pop();
          code = fileName ? fileName.split('.')[0] : '';
        }

        return { image, code };
      })
    );
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

  updatePassword(data): Observable<any> {
    const url = environment.apiUrl + '/user/password/change';
    return this.http.post(url, data);
  }
}
