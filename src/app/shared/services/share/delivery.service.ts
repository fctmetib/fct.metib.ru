import { DeliveryInterface } from './../../types/delivery/delivery.interface';
import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DeliveryService {
  /**
  * Creates an instance of delivery service.
  */
  constructor(private http: HttpClient) {}


  /**
  * Получает список договоров, по ID организации
  * @param ID организации
  * @returns Возвращает список договоров с статистикой
  */
  getDeliveriesByIdWithStats(id: string): Observable<DeliveryInterface[]> {
    let url = `${environment.apiUrl}/delivery/${id}?includeStatistics=true`;
    return this.http.get<DeliveryInterface[]>(url)
  }


  /**
  * Получает список договоров с статистикой из АПИ
  * @param none
  * @returns Возвращает список договоров с статистикой
  */
  getDeliveriesWithStats(): Observable<DeliveryInterface[]> {
    let url = `${environment.apiUrl}/delivery?includeStatistics=true`;
    return this.http.get<DeliveryInterface[]>(url)
  }
}
