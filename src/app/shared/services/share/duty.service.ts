import { UploadToHeapRequestInterface } from './../../types/duty/upload-to-heap-request.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Duty } from '../../types/duty/duty';
import { DutyFilterRequestInterface } from '../../types/duty/duty-filter-request.interface';
import { HeapDutyImportResultInterface } from '../../types/duty/heap-duty-import-result.interface';
import { ConfirmRequestInterface } from '../../types/common/confirm-request.interface';
import { ClientRequestSendingInitReq } from '../../types/client/client-request-sending-init.req';
import { ClientRequestInterface } from '../../types/client/client-request.interface';

@Injectable()
export class DutyService {
  constructor(private http: HttpClient) {}

  fetch(data: DutyFilterRequestInterface): Observable<Duty[]> {
    const url = `${environment.apiUrl}/duty/filter`;
    return this.http.post<Duty[]>(url, data);
  }

  importHeap(
    data: UploadToHeapRequestInterface[]
  ): Observable<HeapDutyImportResultInterface[]> {
    const url = `${environment.apiUrl}/duty/import/heap`;
    return this.http.post<HeapDutyImportResultInterface[]>(url, data);
  }

  importLinkExist(linkIfExist: boolean, data: number[]): Observable<string[]> {
    const url = `${environment.apiUrl}/duty/import?linkIfExist=${linkIfExist}`;
    return this.http.post<string[]>(url, data);
  }

  createRequestsByDutyIds(
    data: number[]
  ): Observable<ClientRequestInterface[]> {
    const url = `${environment.apiUrl}/v1/freeduty`;
    return this.http.post<ClientRequestInterface[]>(url, data);
  }
}
