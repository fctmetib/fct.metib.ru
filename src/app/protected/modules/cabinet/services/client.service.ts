import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { FactoringInterface } from '../../../types/factoring.interface';

@Injectable()
export class ClientService {
  constructor(private http: HttpClient) {}

  getFactoring(organizationID: string): Observable<FactoringInterface> {
    const url = environment.apiUrl + `/client/${organizationID}/factoring`;
    return this.http.get<FactoringInterface>(url);
  }

}
