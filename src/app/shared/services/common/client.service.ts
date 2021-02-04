import { CustomerInterface } from './../../types/customer/customer.interface';
import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ClientService {
  constructor(private http: HttpClient) {}

  getClientFactoringById(id: number): Observable<CustomerInterface> {
    const url = `${environment.apiUrl}/client/${id}/factoring`;
    return this.http.get<CustomerInterface>(url);
  }

  getClient(id: number): Observable<CustomerInterface> {
    const url = `${environment.apiUrl}/Client`;
    return this.http.get<CustomerInterface>(url);
  }
}
