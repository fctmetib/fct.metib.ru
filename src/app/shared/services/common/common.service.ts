import { environment } from 'src/environments/environment';

import { Observable, Observer, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
  constructor(private http: HttpClient) {}

  getIP(): Observable<string> {
    let url = `${environment.apiUrl}/test/ip`;
    // 'https://jsonip.com'
    return this.http.get<string>(url)
  }

  getCaptcha(): Observable<any> {
    const url = environment.apiUrl + '/captcha';
    return this.http.get(url, { observe: 'response', responseType: 'arraybuffer' });
  }

  getBase64(file): Observable<Uint8Array[]>{
    return Observable.create((observer: Observer<Uint8Array[]>) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        observer.next(e.target.result);
        observer.complete();
      };
      reader.readAsArrayBuffer(file);
    })
  }
}
