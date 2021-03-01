import { UploadToHeapRequestInterface } from './../../types/duty/upload-to-heap-request.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DutyInterface } from '../../types/duty/duty.interface';
import { DutyFilterRequestInterface } from '../../types/duty/duty-filter-request.interface';
import { HeapDutyImportResultInterface } from '../../types/duty/heap-duty-import-result.interface';

@Injectable()
export class DutyService {
  constructor(private http: HttpClient) {}

  fetch(customerID: number, dateFrom: Date, dateTo: Date, freeDuty: boolean): Observable<DutyInterface[]> {
    const url = `${environment.apiUrl}/duty/${customerID}/${dateFrom}/${dateTo}/${freeDuty}`;
    return this.http.get<DutyInterface[]>(url);
  }

  getDutyByFilter(data: DutyFilterRequestInterface): Observable<DutyInterface[]> {
    const url = `${environment.apiUrl}/duty/filter`;
    return this.http.post<DutyInterface[]>(url, data);
  }

  importHeap(data: UploadToHeapRequestInterface[]): Observable<HeapDutyImportResultInterface[]> {
    const url = `${environment.apiUrl}/duty/import/heap`;
    return this.http.post<HeapDutyImportResultInterface[]>(url, data);
  }

  importLinkExist(linkIfExist: boolean, data: number[]): Observable<string[]> {
    const url = `${environment.apiUrl}/duty/import?linkIfExist=${linkIfExist}`;
    return this.http.post<string[]>(url, data);
  }
}
