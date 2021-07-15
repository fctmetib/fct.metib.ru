import { OrganizationInterface } from '../../../../shared/types/organization/organization.interface';
import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInterface } from '../type/user.interface';

@Injectable()
export class UsersService {
  /**
  * Создает экземпляр Users сервиса.
  */
  constructor(private http: HttpClient) {}

  /**
  * Получает список пользователей
  * @returns Возвращает список пользователей
  */
  getUsersList(userName: string): Observable<UserInterface[]> {
    let url = `${environment.apiUrl}/user/search?filter=${userName}`;
    return this.http.get<UserInterface[]>(url)
  }
}
