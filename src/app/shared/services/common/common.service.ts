import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
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
}
