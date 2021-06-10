import { DeliveryInterface } from './../../types/delivery/delivery.interface';
import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientAccountInterface } from '../../types/client/client-account.interface';
import { ShipmentInterface } from '../../types/common/shipment-interface';
import { tap } from 'rxjs/operators';

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

  getDeliveryAccounts(id: string): Observable<ClientAccountInterface[]> {
    let url = `${environment.apiUrl}/delivery/${id}/accounts`;
    return this.http.get<ClientAccountInterface[]>(url)
  }

  /**
   * Получает реквизиты, по контракту
   * @param id delivery
   * @returns Возвращает реквизиты, по контракту
   */
  getRequisitesByDeliveryId(id: string): Observable<string> {
    return this.http.get<string>(`${environment.apiUrl}/delivery/${id}/requisites`);
  }

  getShipments(id: string): Observable<ShipmentInterface[]> {
    let url = `${environment.apiUrl}/delivery/${id}/shipments`;
    return this.http.get<ShipmentInterface[]>(url)
  }
}
