import { environment } from 'src/environments/environment';
import { IpInterface } from '../../types/common/ip.interface';
import { map } from 'rxjs/operators';

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
  constructor(private http: HttpClient) {}

  getIP(): Observable<string> {
    return this.http.get<string>('https://jsonip.com')
  }

  getCaptcha(): Observable<any> {
    const url = environment.apiUrl + '/captcha';
    return this.http.get(url, { observe: 'response', responseType: 'arraybuffer' });
  }
}
