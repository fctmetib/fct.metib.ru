import { OrganizationInterface } from './../../../../shared/types/organization/organization.interface';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrganizationStaffInterface } from 'src/app/admin/shared/types/organization-view.interface';

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
  getOrganizationList(
    organizationName: string
  ): Observable<OrganizationInterface[]> {
    let url = `${environment.apiUrl}/organization/search/${organizationName}?deepSearch=true`;
    return this.http.get<OrganizationInterface[]>(url);
  }

  /**
   * Получает инорфмацию об организации (ИНН, КПП и тд)
   * @returns Возвращает инорфмацию об организации (ИНН, КПП и тд)
   */
  public getOrganizationInfoById(organizationId: string): Observable<OrganizationInterface> {
    let url = `${environment.apiUrl}/organization/${organizationId}`;
    return this.http.get<OrganizationInterface>(url);
  }

  /**
   * Получает инорфмацию о персонале организации, по Id организации
   * @returns Возвращает инорфмацию о персонале организации
   */
  public getOrganizationStaffById(organizationId: string): Observable<OrganizationStaffInterface[]> {
    let url = `${environment.apiUrl}/organization/${organizationId}/staff`;
    return this.http.get<OrganizationStaffInterface[]>(url);
  }
}
