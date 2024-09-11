import { Customer } from '../../types/customer/customer';
import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ClientService {
  constructor(private http: HttpClient) {}

  getClientFactoringById(organizationID: number): Observable<Customer> {
    const url = `${environment.apiUrl}/client/${organizationID}/factoring`;
    return this.http.get<Customer>(url);
  }

  getClient(id: number): Observable<Customer> {
    const url = `${environment.apiUrl}/Client`;
    return this.http.get<Customer>(url);
  }
}
