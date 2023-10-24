import { PublicAnketQualityRequestInterface } from './../../types/anket/public-anket-quality-request.interface';
import { PublicAnketFactoringRequestInterface } from '../../types/anket/public-anket-factoring-request.interface';
import { DebtorInfoInterface } from './../../types/debtor/debtor-info.interface';
import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FactoringPublicService {
  constructor(private http: HttpClient) {}

  getCalculatedDatePayment(dateFrom: Date, daysCount: number, workDays: boolean): Observable<Date> {
    let url = `${environment.apiUrl}/public/calc/datepayment/${dateFrom}/${daysCount}/${workDays}`;
    return this.http.get<Date>(url)
  }

  getDebtors(): Observable<DebtorInfoInterface[]> {
    let url = `${environment.apiUrl}/public/debtors`;
    return this.http.get<DebtorInfoInterface[]>(url)
  }

  addAnketFactoring(data: PublicAnketFactoringRequestInterface): Observable<any> {
    let url = `${environment.apiUrl}/public/anket/factoring`;
    return this.http.post<any>(url, data)
  }

  addAnketQuality(data: PublicAnketQualityRequestInterface): Observable<any> {
    let url = `${environment.apiUrl}/public/anket/factoring`;
    return this.http.post<any>(url, data)
  }

  getFactoringPublic(): Observable<string> {
    let url = `${environment.apiUrl}/FactoringPublic`;
    return this.http.get<string>(url)
  }
}
