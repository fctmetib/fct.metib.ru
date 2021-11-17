import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DemandDataBaseInterface } from '../types/demand-data-base.interface';
import { DemandInterface } from '../types/demand.interface';
import { SaveDemandRequestInterface } from '../types/requests/save-demand-request.interface';


@Injectable()
export class DemandService {
  constructor(private http: HttpClient) {}

  public prepareDemandByType(type: string): Observable<DemandDataBaseInterface> {
    const url = `${environment.apiUrl}/demand/prepare/${type}`;
    return this.http.get<DemandDataBaseInterface>(url);
  }

  public createDemand<T>(data: SaveDemandRequestInterface<T>): Observable<DemandInterface<T>> {
    const url = `${environment.apiUrl}/demand`;
    return this.http.post<DemandInterface<T>>(url, data);
  }

}
