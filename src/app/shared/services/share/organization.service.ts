import { OrganizationInterface } from './../../types/organization/organization.interface';
import { DeliveryInterface } from './../../types/delivery/delivery.interface';
import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OrganizationService {
  constructor(private http: HttpClient) {}


  /**
  * Получает полные данные об организации
  * @param id - id организации
  * @returns Возвращает объект организации
  */
  getOrganizationById(id: number): Observable<OrganizationInterface> {
    let url = `${environment.apiUrl}/organization/${id}`;
    return this.http.get<OrganizationInterface>(url)
  }
}
