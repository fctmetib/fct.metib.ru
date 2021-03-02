import { ClientRequestStateInterface } from './../../../../shared/types/client/client-request-state.interface';
import { ClientRequestSendingInitRequestInterface } from './../../../../shared/types/client/client-request-sending-init-request.interface';
import { ConfirmRequestInterface } from './../../../../shared/types/common/confirm-request.interface';
import { ClientRequestInterface } from './../../../../shared/types/client/client-request.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RequestsResponseInterface } from '../types/requestResponse.interface';
import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';
import { ClientShipmentInterface } from 'src/app/shared/types/client/client-shipment.interface';

@Injectable()
export class RequestsService {
  constructor(private http: HttpClient) {}

  //#region REST

  fetch(): Observable<RequestsResponseInterface[]> {
    const url = `${environment.apiUrl}/request`;
    return this.http.get<RequestsResponseInterface[]>(url);
  }

  add(data: ClientRequestInterface): Observable<RequestsResponseInterface> {
    const url = `${environment.apiUrl}/request`;
    return this.http.post<RequestsResponseInterface>(url, data);
  }

  update(requestID: number, data: ClientRequestInterface): Observable<RequestsResponseInterface> {
    const url = `${environment.apiUrl}/request/${requestID}`;
    return this.http.post<RequestsResponseInterface>(url, data);
  }

  delete(requestID: number): Observable<{}> {
    const url = `${environment.apiUrl}/request/${requestID}`;
    return this.http.delete<{}>(url);
  }

  //#endregion

  getFreeDocuments(): Observable<FileModeInterface[]> {
    const url = `${environment.apiUrl}/request/freedocuments`;
    return this.http.get<FileModeInterface[]>(url);
  }

  parseRequest(): Observable<ClientShipmentInterface[]> {
    const url = `${environment.apiUrl}/request/send/parse`;
    return this.http.post<ClientShipmentInterface[]>(url, {});
  }

  addFreeduty(data: number[]): Observable<RequestsResponseInterface[]> {
    const url = `${environment.apiUrl}/request`;
    return this.http.post<RequestsResponseInterface[]>(url, data);
  }

  getRequestByIdAndParams(
    requestID: number,
    includeShipments: boolean,
    includeDocuments: boolean,
    includeFiles: boolean
  ): Observable<RequestsResponseInterface[]> {
    const url = `${environment.apiUrl}/request/${requestID}?includeShipments=${includeShipments}&includeDocuments=${includeDocuments}&includeFiles=${includeFiles}`;
    return this.http.get<RequestsResponseInterface[]>(url);
  }

  getStatesOfRequest(requestID: number): Observable<ClientRequestStateInterface[]> {
    const url = `${environment.apiUrl}/request/${requestID}/states`;
    return this.http.get<ClientRequestStateInterface[]>(url);
  }

  getRequestsWithFilter(dateFrom: Date): Observable<RequestsResponseInterface[]> {
    const url = `${environment.apiUrl}/request/filter/${dateFrom}`;
    return this.http.get<RequestsResponseInterface[]>(url);
  }

  // TODO: скорее всего возвращаются файлы
  getDocumentsOfRequest(requestID: number): Observable<any[]> {
    const url = `${environment.apiUrl}/request/${requestID}/documents`;
    return this.http.get<any[]>(url);
  }


}
