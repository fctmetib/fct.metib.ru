import {
	DeliveryInterface,
	DeliveryRef
} from './../../types/delivery/delivery.interface'
import {environment} from 'src/environments/environment'

import {Observable, of} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {ClientAccountInterface} from '../../types/client/client-account.interface'
import {ShipmentInterface} from '../../types/common/shipment-interface'
import {DeliveryContractsInterface} from '../../types/delivery/delivery-contracts.interface'

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
	): Observable<DeliveryContractsInterface[]> {
		let url = `${environment.apiUrl}/v1/deliveries`
		return this.http.get<DeliveryContractsInterface[]>(url, {
			params: {
				getAll: getAll,
				includeStatistics: includeStatistics
			}
		})
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
	getRequisitesByDeliveryId(id: string): Observable<string> {
		return this.http.get<string>(
			`${environment.apiUrl}/delivery/${id}/requisites`
		)
	}

	getShipments(id: string): Observable<ShipmentInterface[]> {
		let url = `${environment.apiUrl}/delivery/${id}/shipments`
		return this.http.get<ShipmentInterface[]>(url)
	}
}
