import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AvatarService {
  constructor(private http: HttpClient) {}

  //TODO: нужно узнать, что передавать
  addAvatar(): Observable<string> {
    let url = `${environment.apiUrl}/avatar`;
    return this.http.post<string>(url, {})
  }

  //TODO: нужно узнать, что возвращается
  getAvatarByCode(code: string): Observable<any> {
    let url = `${environment.apiUrl}/avatar/${code}`;
    return this.http.post<any>(url, {})
  }

  getAvatar(): Observable<string> {
    let url = `${environment.apiUrl}/avatar/`;
    return this.http.get<string>(url)
  }
}
