import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DemandDataBaseInterface } from '../types/demand-data-base.interface';
import { DemandInterface } from '../types/demand.interface';
import { SaveDemandRequestInterface } from '../types/requests/save-demand-request.interface';
import { DemandDraftInterface } from '../types/demand-draft.interface';

@Injectable()
export class DemandService {
  constructor(private http: HttpClient) {}

  public prepareDemandByType(
    type: string
  ): Observable<DemandDataBaseInterface> {
    const url = `${environment.apiUrl}/demand/prepare/${type}`;
    return this.http.get<DemandDataBaseInterface>(url);
  }

  public createDemand<T>(
    data: SaveDemandRequestInterface<T>
  ): Observable<DemandInterface<T>> {
    const url = `${environment.apiUrl}/demand`;
    return this.http.post<DemandInterface<T>>(url, data);
  }

  public saveDraftById(
    id: number,
    data: DemandDataBaseInterface
  ): Observable<DemandDraftInterface<any>> {
    const url = `${environment.apiUrl}/demand/draft/${id}`;
    return this.http.post<DemandDraftInterface<any>>(url, data);
  }

  public getDemands(): Observable<DemandInterface<any>[]> {
    const url = `${environment.apiUrl}/demand`;
    return this.http.get<DemandInterface<any>[]>(url);
  }

  public getDrafts(): Observable<DemandDraftInterface<any>[]> {
    const url = `${environment.apiUrl}/demand/draft`;
    return this.http.get<DemandDraftInterface<any>[]>(url);
  }

  public deleteDraftById(id: number): Observable<DemandDraftInterface<any>> {
    const url = `${environment.apiUrl}/demand/draft/${id}`;
    return this.http.delete<DemandDraftInterface<any>>(url);
  }

  public cancelByDemandId(id: number): Observable<any> {
    const url = `${environment.apiUrl}/demand/${id}/cancel`;
    return this.http.post<any>(url, {});
  }
}
