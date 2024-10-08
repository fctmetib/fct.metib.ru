import {OrganizationInterface} from '../../types/organization/organization.interface';
import {environment} from 'src/environments/environment';

import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {AuthRes} from 'src/app/auth/types/login/authRes';

@Injectable()
export class OrganizationService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {
  }

  /**
   * Получает полные данные об организации
   * @param id - id организации
   * @returns Возвращает объект организации
   */
  getOrganizationById(id: number): Observable<OrganizationInterface> {
    let userCookie = this.cookieService.get('_cu');

    let user: AuthRes;
    let token;
    if (userCookie) {
      user = JSON.parse(userCookie)
      token = user.Code;
    }

    let headers = new HttpHeaders({
      Authorization: token,
    });

    let url = `${environment.apiUrl}/organization/${id}`;
    return this.http.get<OrganizationInterface>(url, {
      headers: headers,
    });
  }

  getOrganizationWithFilterById(
    id: number
  ): Observable<OrganizationInterface[]> {
    let url = `${environment.apiUrl}/organization/search/${id}?deepSearch=true&includeDetails=true`;
    return this.http.get<OrganizationInterface[]>(url);
  }

  getBankRequisites(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/Content/data/data-requisite.json`);
  }
}
