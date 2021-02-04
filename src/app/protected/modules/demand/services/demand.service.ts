import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class DemandService {
  constructor(private http: HttpClient) {}

  //#region REST

  fetch(): Observable<string> {
    const url = `${environment.apiUrl}Demand`;
    return this.http.get<string>(url);
  }

  //#endregion
}
