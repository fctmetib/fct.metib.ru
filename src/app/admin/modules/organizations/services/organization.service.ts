import { OrganizationInterface } from './../../../../shared/types/organization/organization.interface';
import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OrganizationService {
  /**
  * Создает экземпляр Organization сервиса.
  */
  constructor(private http: HttpClient) {}

  /**
  * Получает список организаций
  * @returns Возвращает список организаций
  */
  getOrganizationList(): Observable<OrganizationInterface[]> {
    let url = `${environment.apiUrl}/organization`;
    return this.http.get<OrganizationInterface[]>(url)
  }
}
