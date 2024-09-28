import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {environment} from 'src/environments/environment'
import {
	DemandDataBaseInterface,
	DemandQueryBaseInterface
} from '../types/demand-data-base.interface'
import {DemandInterface} from '../types/demand.interface'
import {SaveDemandRequestInterface} from '../types/requests/save-demand-request.interface'
import {DemandDraftInterface} from '../types/demand-draft.interface'
import {CreateDemandMessageRequestInterface} from '../types/requests/create-demand-message-request.interface'
import {CreateDemandEDSRequestInterface} from '../types/requests/create-demand-eds-request.interface'
import {DebtorInterface} from '../types/debtor-interface'

@Injectable()
export class DemandService {
	constructor(private http: HttpClient) {}

	// new API
	// public prepareDemandByType(
	// 	type: string
	// ): Observable<any> {
	// 	// const url = `${environment.apiUrl}/v1/demands/prepare?type=1`
	// 	const url = `${environment.apiUrl}/v1/demands/prepare/${type}?type=1`
	// 	return this.http.get<any>(url, type)
	// }

	public prepareDemandByTypes(type: any): Observable<any> {
		const url = `${environment.apiUrl}/v1/demands/prepare?type=${type}`
		return this.http.get<any>(url)
	}

	public prepareDemandByType(
		type: string
	): Observable<DemandDataBaseInterface> {
		const url = `${environment.apiUrl}/v1/demands/prepare/${type}?type=1`
		return this.http.get<DemandDataBaseInterface>(url)
	}

	// public prepareDemandByType(
	// 	type: string
	// ): Observable<DemandDataBaseInterface> {
	// 	const url = `${environment.apiUrl}/demand/prepare/${type}`
	// 	return this.http.get<DemandDataBaseInterface>(url)
	// }

	getDemandById(id: number): Observable<DemandInterface<any>> {
		const url = `${environment.apiUrl}/demand/${id}`
		return this.http.get<DemandInterface<any>>(url)
	}

	// new API
	public createDemand<T>(data: any): Observable<any> {
		const url = `${environment.apiUrl}/v1/demands`
		return this.http.post<any>(url, data)
	}

	// new API
	public updateDraft(id: any, data: any): Observable<any> {
		const url = `${environment.apiUrl}/v1/demands/drafts`
		const params = new HttpParams()
			.set('draftId', JSON.stringify(id))
			.set('demandData', JSON.stringify(data))

		return this.http.put<any>(url, null, {params})
	}

	// new API
	public createNewDraft(data: any): Observable<any> {
		const url = `${environment.apiUrl}/v1/demands/drafts`
		const params = new HttpParams().set('demandData', JSON.stringify(data))

		return this.http.post<any>(url, null, {params})
	}

	public uploadFile(
		file: any,
		documentType: string,
		demandId: number
	): Observable<any> {
		const url = `${environment.apiUrl}/v1/demands/file/upload`
		const params = new HttpParams()
			.set('documentType', documentType)
			.set('demandId', demandId)

		console.log(file)
		const formData = new FormData()
		formData.append('file', file)

		return this.http.post<any>(url, formData, {params})
	}

	public saveDraftById(
		id: number,
		data: DemandDataBaseInterface
	): Observable<DemandDraftInterface<any>> {
		const url = `${environment.apiUrl}/demand/draft/${id}`
		return this.http.post<DemandDraftInterface<any>>(url, data)
	}

	// newAPI
	public getDemands(): Observable<any> {
		const url = `${environment.apiUrl}/v1/demands`
		return this.http.get<any>(url)
	}

	// public getDemands(): Observable<DemandInterface<any>[]> {
	// 	const url = `${environment.apiUrl}/demand`
	// 	return this.http.get<DemandInterface<any>[]>(url)
	// }

	// new API
	// https://api-factoring-test02.metib.ru/api/v1/demands/draft
	public getDrafts(): Observable<DemandDraftInterface<any>[]> {
		const url = `${environment.apiUrl}/v1/demands/drafts`
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

	// new API //
	getDemandDraftById(id: number): Observable<any> {
		const url = `${environment.apiUrl}/v1/demands/drafts/${id}`
		return this.http.get<any>(url)
	}

	// getDemandDraftById(id: number): Observable<DemandInterface<any>> {
	// 	const url = `${environment.apiUrl}/demand/draft/${id}`
	// 	return this.http.get<DemandInterface<any>>(url)
	// }
}
