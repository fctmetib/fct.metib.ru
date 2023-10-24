import { DebtorInterface } from './../types/debtor-interface';
import { DemandDataBaseInterface } from './../types/demand-data-base.interface';
import { DemandDraftInterface } from './../types/demand-draft.interface';
import { CreateDemandMessageRequestInterface } from './../types/requests/create-demand-message-request.interface';
import { SaveDemandRequestInterface } from './../types/requests/save-demand-request.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DemandInterface } from '../types/demand.interface';
import { CreateDemandEDSRequestInterface } from '../types/requests/create-demand-eds-request.interface';

@Injectable()
export class DemandService {
  constructor(private http: HttpClient) {}

  //#region REST

  fetch(): Observable<DemandInterface<any>[]> {
    const url = `${environment.apiUrl}/demand`;
    return this.http.get<DemandInterface<any>[]>(url);
  }

  add<T>(data: SaveDemandRequestInterface<T>): Observable<DemandInterface<T>> {
    const url = `${environment.apiUrl}/demand`;
    return this.http.post<DemandInterface<T>>(url, data);
  }

  getDemandById(id: number): Observable<DemandInterface<any>> {
    const url = `${environment.apiUrl}/demand/${id}`;
    return this.http.get<DemandInterface<any>>(url);
  }

  getDemandDraftById(id: number): Observable<DemandInterface<any>> {
    const url = `${environment.apiUrl}/demand/draft/${id}`;
    return this.http.get<DemandInterface<any>>(url);
  }

  //#endregion

  getDigitalSignatureRequest(data: CreateDemandEDSRequestInterface): Observable<any> {
    const url = `${environment.apiUrl}/demand/document/DigitalSignatureRequest`;
    return this.http.post<any>(url, data, {responseType: 'arraybuffer' as 'json'});
  }

  getDemandByFilter(filter: string): Observable<DemandDataBaseInterface[]> {
    const url = `${environment.apiUrl}/demand?filter=${filter}`;
    return this.http.get<DemandDataBaseInterface[]>(url);
  }

  prepareDemandByType(type: string): Observable<DemandDataBaseInterface> {
    const url = `${environment.apiUrl}/demand/prepare/${type}`;
    return this.http.get<DemandDataBaseInterface>(url);
  }

  addDemandDocumentById(
    identifier: string
  ): Observable<DemandDataBaseInterface> {
    const url = `${environment.apiUrl}/demand/document/${identifier}`;
    return this.http.post<DemandDataBaseInterface>(url, {});
  }

  getDocumentByIdByDemandId(id: number, identifier: string): Observable<any> {
    const url = `${environment.apiUrl}/demand/${id}/document/${identifier}`;
    return this.http.get<any>(url);
  }

  addById<T>(
    id: number,
    data: SaveDemandRequestInterface<T>
  ): Observable<DemandInterface<T>> {
    const url = `${environment.apiUrl}/demand/${id}`;
    return this.http.post<DemandInterface<T>>(url, data);
  }

  addMessageByDemandId(
    id: number,
    data: CreateDemandMessageRequestInterface
  ): Observable<any> {
    const url = `${environment.apiUrl}/demand/${id}/message`;
    return this.http.post<any>(url, data);
  }

  cancelByDemandId(id: number): Observable<any> {
    const url = `${environment.apiUrl}/demand/${id}/cancel`;
    return this.http.post<any>(url, {});
  }

  getDrafts(): Observable<DemandDraftInterface<any>[]> {
    const url = `${environment.apiUrl}/demand/draft`;
    return this.http.get<DemandDraftInterface<any>[]>(url);
  }

  getDraftById(id: number): Observable<DemandDraftInterface<any>> {
    const url = `${environment.apiUrl}/demand/draft/${id}`;
    return this.http.get<DemandDraftInterface<any>>(url);
  }

  addDraftById(
    id: number,
    data: DemandDataBaseInterface
  ): Observable<DemandDraftInterface<any>> {
    const url = `${environment.apiUrl}/demand/draft/${id}`;
    return this.http.post<DemandDraftInterface<any>>(url, data);
  }

  deleteDraftById(id: number): Observable<DemandDraftInterface<any>> {
    const url = `${environment.apiUrl}/demand/draft/${id}`;
    return this.http.delete<DemandDraftInterface<any>>(url);
  }

  getDebtors(): Observable<DebtorInterface[]> {
    const url = `${environment.apiUrl}/public/debtors`;
    return this.http.get<DebtorInterface[]>(url);
  }
}
