import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ReportService {
  constructor(private http: HttpClient) {}

  addReport(data: string): Observable<any> {
    const url = `${environment.apiUrl}/report`;
    return this.http.post<any>(url, data);
  }

  getReport(): Observable<string> {
    const url = `${environment.apiUrl}/Report`;
    return this.http.get<string>(url);
  }
}
