import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrganizationInterface } from '../type/organization.interface';
import { ClientRequestInterface } from '../../shared/types/client/client-request.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class OrganizationService {
  constructor(private http: HttpClient) {}

  send(data: OrganizationInterface): Observable<OrganizationInterface> {
    const url = `${environment.apiUrl}/public/anket/factoring`
    return this.http.post<OrganizationInterface>(url, data);
  }

}
