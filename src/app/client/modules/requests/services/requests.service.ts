import { ClientRequestStateInterface } from 'src/app/shared/types/client/client-request-state.interface';
import { ClientRequestSendingInitRequestInterface } from 'src/app/shared/types/client/client-request-sending-init-request.interface';
import { ConfirmRequestInterface } from 'src/app/shared/types/common/confirm-request.interface';
import { ClientRequestInterface } from 'src/app/shared/types/client/client-request.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RequestsResponseInterface } from '../types/requestResponse.interface';
import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';
import { ClientShipmentInterface } from 'src/app/shared/types/client/client-shipment.interface';
import { RequestEventsInterface } from '../types/request-events.interface';

@Injectable()
export class RequestsService {

  constructor(private http: HttpClient) { }

  //#region REST

  public fetch(): Observable<RequestsResponseInterface[]> {
    const url = `${environment.apiUrl}/v1/requests`;
    return this.http.get<RequestsResponseInterface[]>(url);
  }

  public add(data: ClientRequestInterface): Observable<RequestsResponseInterface> {
    const url = `${environment.apiUrl}/v1/requests`;
    return this.http.post<RequestsResponseInterface>(url, data);
  }

  public update(
    requestID: number,
    data: ClientRequestInterface
  ): Observable<RequestsResponseInterface> {
    const url = `${environment.apiUrl}/v1/requests/${requestID}`;
    return this.http.post<RequestsResponseInterface>(url, data);
  }

  public delete(requestIDs: number[]): Observable<{}> {
    const url = `${environment.apiUrl}/v1/requests`;
    return this.http.delete<{}>(url, {
      body: requestIDs
    });
  }

  //#endregion

  public getFreeDocuments(): Observable<FileModeInterface[]> {
    const url = `${environment.apiUrl}/v1/requests/freedocuments`;
    return this.http.get<FileModeInterface[]>(url);
  }

  public parseRequest(): Observable<ClientShipmentInterface[]> {
    const url = `${environment.apiUrl}/v1/requests/send/parse`;
    return this.http.post<ClientShipmentInterface[]>(url, {});
  }

  public addFreeduty(data: number[]): Observable<RequestsResponseInterface[]> {
    const url = `${environment.apiUrl}/v1/requests`;
    return this.http.post<RequestsResponseInterface[]>(url, data);
  }

  public getRequestByIdAndParams(
    requestID: number,
    includeShipments: boolean,
    includeDocuments: boolean,
    includeFiles: boolean
  ): Observable<RequestsResponseInterface> {
    const url = `${environment.apiUrl}/v1/requests/${requestID}?includeShipments=${includeShipments}&includeDocuments=${includeDocuments}&includeFiles=${includeFiles}`;
    return this.http.get<RequestsResponseInterface>(url);
  }

  public getStatesOfRequest(
    requestID: number
  ): Observable<ClientRequestStateInterface[]> {
    const url = `${environment.apiUrl}/v1/requests/${requestID}/states`;
    return this.http.get<ClientRequestStateInterface[]>(url);
  }

  public getRequestsWithFilter(
    dateFrom: Date
  ): Observable<RequestsResponseInterface[]> {
    const url = `${environment.apiUrl}/v1/requests/filter/${dateFrom}`;
    return this.http.get<RequestsResponseInterface[]>(url);
  }

  // TODO: скорее всего возвращаются файлы
  public getDocumentsOfRequest(requestID: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/request/${requestID}/documents`);
  }

  public send(
    data: number[]
  ): Observable<ClientRequestSendingInitRequestInterface> {
    return this.http.post<ClientRequestSendingInitRequestInterface>(`${environment.apiUrl}/v1/requests/send`, data);
  }

  public getRequestEvents(requestID: number): Observable<RequestEventsInterface[]> {
    return this.http.get<RequestEventsInterface[]>(`${environment.apiUrl}/v1/requests/${requestID}/states`)
  }
}
