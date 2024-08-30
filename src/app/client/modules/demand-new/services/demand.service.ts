import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {environment} from 'src/environments/environment'
import {DemandDataBaseInterface} from '../types/demand-data-base.interface'
import {DemandInterface} from '../types/demand.interface'
import {SaveDemandRequestInterface} from '../types/requests/save-demand-request.interface'
import {DemandDraftInterface} from '../types/demand-draft.interface'
import {CreateDemandMessageRequestInterface} from '../types/requests/create-demand-message-request.interface'
import {CreateDemandEDSRequestInterface} from '../types/requests/create-demand-eds-request.interface'
import {DebtorInterface} from '../types/debtor-interface'

@Injectable()
export class DemandService {
	constructor(private http: HttpClient) {}

	public prepareDemandByType(
		type: string
	): Observable<DemandDataBaseInterface> {
		const url = `${environment.apiUrl}/demand/prepare/${type}`
		return this.http.get<DemandDataBaseInterface>(url)
	}

	getDemandById(id: number): Observable<DemandInterface<any>> {
		const url = `${environment.apiUrl}/demand/${id}`
		return this.http.get<DemandInterface<any>>(url)
	}

	// new API
	public createDemand<T>(data: any): Observable<DemandInterface<T>> {
		const url = `${environment.apiUrl}/v1/demands`
		return this.http.post<any>(url, data)
	}

	// public createDemand<T>(
	// 	data: SaveDemandRequestInterface<T>
	// ): Observable<DemandInterface<T>> {
	// 	const url = `${environment.apiUrl}/demand`
	// 	return this.http.post<DemandInterface<T>>(url, data)
	// }

	public saveDraftById(
		id: number,
		data: DemandDataBaseInterface
	): Observable<DemandDraftInterface<any>> {
		const url = `${environment.apiUrl}/demand/draft/${id}`
		return this.http.post<DemandDraftInterface<any>>(url, data)
	}

	// newAPI
	public getDemands(): Observable<DemandInterface<any>[]> {
		const url = `${environment.apiUrl}/v1/demands`
		return this.http.get<DemandInterface<any>[]>(url)
	}

	// public getDemands(): Observable<DemandInterface<any>[]> {
	// 	const url = `${environment.apiUrl}/demand`
	// 	return this.http.get<DemandInterface<any>[]>(url)
	// }

	// new API
	// https://api-factoring-test02.metib.ru/api/v1/demands/draft
	public getDrafts(): Observable<DemandDraftInterface<any>[]> {
		const url = `${environment.apiUrl}/v1/demands/draft`
		return this.http.get<DemandDraftInterface<any>[]>(url)
	}

	// public getDrafts(): Observable<DemandDraftInterface<any>[]> {
	// 	const url = `${environment.apiUrl}/demand/draft`
	// 	return this.http.get<DemandDraftInterface<any>[]>(url)
	// }

	public deleteDraftById(id: number): Observable<DemandDraftInterface<any>> {
		const url = `${environment.apiUrl}/demand/draft/${id}`
		return this.http.delete<DemandDraftInterface<any>>(url)
	}

	public cancelByDemandId(id: number): Observable<any> {
		const url = `${environment.apiUrl}/demand/${id}/cancel`
		return this.http.post<any>(url, {})
	}

	public addMessageByDemandId(
		id: number,
		data: CreateDemandMessageRequestInterface
	): Observable<any> {
		const url = `${environment.apiUrl}/demand/${id}/message`
		return this.http.post<any>(url, data)
	}

	getDigitalSignatureRequest(
		data: CreateDemandEDSRequestInterface
	): Observable<any> {
		const url = `${environment.apiUrl}/demand/document/DigitalSignatureRequest`
		return this.http.post<any>(url, data, {
			responseType: 'arraybuffer' as 'json'
		})
	}

	getDebtors(): Observable<DebtorInterface[]> {
		const url = `${environment.apiUrl}/public/debtors`
		return this.http.get<DebtorInterface[]>(url)
	}

	getDemandDraftById(id: number): Observable<DemandInterface<any>> {
		const url = `${environment.apiUrl}/demand/draft/${id}`
		return this.http.get<DemandInterface<any>>(url)
	}
}
