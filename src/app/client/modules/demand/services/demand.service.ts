import { SaveDemandRequestInterface } from './../types/requests/save-demand-request.interface';
import { DemandDataInterface } from './../types/demand-data.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DemandInterface } from '../types/demand.interface';

@Injectable()
export class DemandService {
  constructor(private http: HttpClient) {}

  //#region REST

  fetch(): Observable<DemandInterface[]> {
    const url = `${environment.apiUrl}/demand`;
    return this.http.get<DemandInterface[]>(url);
  }

  add(data: SaveDemandRequestInterface): Observable<DemandInterface> {
    const url = `${environment.apiUrl}/demand`;
    return this.http.post<DemandInterface>(url, data);
  }

  getDemandById(id: number): Observable<DemandInterface> {
    const url = `${environment.apiUrl}/demand/${id}`;
    return this.http.get<DemandInterface>(url);
  }

  //#endregion

  getDemandByFilter(filter: string): Observable<DemandDataInterface[]> {
    const url = `${environment.apiUrl}/demand?filter=${filter}`;
    return this.http.get<DemandDataInterface[]>(url);
  }

  prepareDemandByType(type: string): Observable<DemandDataInterface> {
    const url = `${environment.apiUrl}/demand/prepare/${type}`;
    return this.http.get<DemandDataInterface>(url);
  }

  addDemandDocumentById(identifier: string): Observable<DemandDataInterface> {
    const url = `${environment.apiUrl}/demand/document/${identifier}`;
    return this.http.post<DemandDataInterface>(url, {});
  }

  getDocumentByIdByDemandId(id: number, identifier: string): Observable<any> {
    const url = `${environment.apiUrl}/demand/${id}/document/${identifier}`;
    return this.http.get<any>(url);
  }

}
