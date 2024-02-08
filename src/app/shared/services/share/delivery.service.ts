import {
	DeliveryInterface,
	DeliveryRef
} from '../../types/delivery/delivery.interface'
import {environment} from 'src/environments/environment'

import {Observable, of} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {ClientAccountInterface} from '../../types/client/client-account.interface'
import {Delivery} from '../../types/delivery/delivery'
import {Shipment} from '../../../client/modules/requests/modules/shipment-drawer/interfaces/shipment.interface';

@Injectable()
export class DeliveryService {
	/**
	 * Creates an instance of delivery service.
	 */
	constructor(private http: HttpClient) {}

	/**
	 * Список договоров поставки по поставщику
	 * Базовый URL
	 * api/v1/deliveries
	 * Включить закрытые договора
	 * /deliveries?getAll=true
	 * Включить статистику
	 * &includeStatistics=true
	 */
	getAllDeliveriesContracts(
		getAll: boolean,
		includeStatistics: boolean
	): Observable<Delivery[]> {
		let url = `${environment.apiUrl}/v1/deliveries`
		return this.http.get<Delivery[]>(url, {
			params: {
				getAll: getAll,
				includeStatistics: includeStatistics
			}
		})
	}

  /**
   * Получает договор по ID
   * @param ID
   */
  getDeliveryById(ID: number): Observable<Delivery> {
    return this.http.get<Delivery>(`${environment.apiUrl}/v1/deliveries/${ID}`)
  }

  /**
   * Получает договор по ID
   * @param ID
   */
  getShipments(ID: number): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(`${environment.apiUrl}/v1/deliveries/${ID}/shipments`)
  }


  /**
	 * Получает список договоров, по ID организации
	 * @param ID организации
	 * @returns Возвращает список договоров с статистикой
	 */
	getDeliveriesByIdWithStats(id: string): Observable<DeliveryInterface[]> {
		let url = `${environment.apiUrl}/delivery/${id}?includeStatistics=false`
		return this.http.get<DeliveryInterface[]>(url)
	}

	getDeliveriesRef(debtorID: number): Observable<DeliveryRef[]> {
		return this.http.get<DeliveryRef[]>(
			`${environment.apiUrl}/v1/deliveries/refs`,
			{
				params: {
					debtorID: debtorID
				}
			}
		)
	}

	/**
	 * Получает список договоров с статистикой из АПИ
	 * @param none
	 * @returns Возвращает список договоров с статистикой
	 */
	getDeliveriesWithStats(): Observable<DeliveryInterface[]> {
		let url = `${environment.apiUrl}/delivery?includeStatistics=false`
		return this.http.get<DeliveryInterface[]>(url)
	}

	getDeliveryAccounts(id: string): Observable<ClientAccountInterface[]> {
		let url = `${environment.apiUrl}/delivery/${id}/accounts`
		return this.http.get<ClientAccountInterface[]>(url)
	}

	/**
	 * Получает реквизиты, по контракту
	 * @param id delivery
	 * @returns Возвращает реквизиты, по контракту
	 */
	getRequisitesById(id: number): Observable<string> {
		return this.http.get<string>(`${environment.apiUrl}/delivery/${id}/requisites`)
	}
}
