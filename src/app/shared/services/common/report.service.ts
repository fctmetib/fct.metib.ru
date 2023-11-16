import { environment } from 'src/environments/environment';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class ReportService {

  public reportData$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  getReport(data: any): Observable<any> {
    const url = `${environment.apiUrl}/report`;
    return this.http.post<any>(url, data);
  }
}
