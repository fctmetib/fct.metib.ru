import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DemandDataBaseInterface } from '../types/demand-data-base.interface';


@Injectable()
export class DemandService {
  constructor(private http: HttpClient) {}


  prepareDemandByType(type: string): Observable<DemandDataBaseInterface> {
    const url = `${environment.apiUrl}/demand/prepare/${type}`;
    return this.http.get<DemandDataBaseInterface>(url);
  }
}
