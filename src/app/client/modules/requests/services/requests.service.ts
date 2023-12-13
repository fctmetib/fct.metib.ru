import { ClientRequestStateInterface } from 'src/app/shared/types/client/client-request-state.interface'
import { ClientRequestSendingInitRequestInterface } from 'src/app/shared/types/client/client-request-sending-init-request.interface'
import { ConfirmRequestInterface } from 'src/app/shared/types/common/confirm-request.interface'
import { ClientRequestInterface } from 'src/app/shared/types/client/client-request.interface'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { RequestsResponse } from '../types/requestResponse.interface'
import { FileMode } from 'src/app/shared/types/file/file-model.interface'
import { ClientShipmentInterface } from 'src/app/shared/types/client/client-shipment.interface'

@Injectable()
export class RequestsService {
	constructor(private http: HttpClient) {}

	createRequest(ids: number[]): Observable<number[]> {
		return this.http.post<number[]>(
			`${environment.apiUrl}/v1/requests/send`,
			ids
		)
	}

	public getRequests(): Observable<RequestsResponse[]> {
		return this.http.get<RequestsResponse[]>(
			`${environment.apiUrl}/v1/requests`
		)
	}

	// МОЖНО СМОТРЕТЬ МЕТОДЫ, НО НЕ ПОЛЬЗОВАТЬСЯ ТЕМ, ЧТО НИЖЕ
	// МОЖНО СМОТРЕТЬ МЕТОДЫ, НО НЕ ПОЛЬЗОВАТЬСЯ ТЕМ, ЧТО НИЖЕ
	// МОЖНО СМОТРЕТЬ МЕТОДЫ, НО НЕ ПОЛЬЗОВАТЬСЯ ТЕМ, ЧТО НИЖЕ
	// МОЖНО СМОТРЕТЬ МЕТОДЫ, НО НЕ ПОЛЬЗОВАТЬСЯ ТЕМ, ЧТО НИЖЕ
	// МОЖНО СМОТРЕТЬ МЕТОДЫ, НО НЕ ПОЛЬЗОВАТЬСЯ ТЕМ, ЧТО НИЖЕ
	// МОЖНО СМОТРЕТЬ МЕТОДЫ, НО НЕ ПОЛЬЗОВАТЬСЯ ТЕМ, ЧТО НИЖЕ
	// МОЖНО СМОТРЕТЬ МЕТОДЫ, НО НЕ ПОЛЬЗОВАТЬСЯ ТЕМ, ЧТО НИЖЕ
	// МОЖНО СМОТРЕТЬ МЕТОДЫ, НО НЕ ПОЛЬЗОВАТЬСЯ ТЕМ, ЧТО НИЖЕ
	// МОЖНО СМОТРЕТЬ МЕТОДЫ, НО НЕ ПОЛЬЗОВАТЬСЯ ТЕМ, ЧТО НИЖЕ
	// МОЖНО СМОТРЕТЬ МЕТОДЫ, НО НЕ ПОЛЬЗОВАТЬСЯ ТЕМ, ЧТО НИЖЕ
	// МОЖНО СМОТРЕТЬ МЕТОДЫ, НО НЕ ПОЛЬЗОВАТЬСЯ ТЕМ, ЧТО НИЖЕ

	//#region REST

	public fetch(): Observable<RequestsResponse[]> {
		const url = `${environment.apiUrl}/v1/requests`
		return this.http.get<RequestsResponse[]>(url)
	}

	public add(data: ClientRequestInterface): Observable<RequestsResponse> {
		const url = `${environment.apiUrl}/v1/requests`
		return this.http.post<RequestsResponse>(url, data)
	}

	public update(
		requestID: number,
		data: ClientRequestInterface
	): Observable<RequestsResponse> {
		const url = `${environment.apiUrl}/v1/requests/${requestID}`
		return this.http.post<RequestsResponse>(url, data)
	}

	public delete(requestID: number): Observable<{}> {
		const url = `${environment.apiUrl}/v1/requests/${requestID}`
		return this.http.delete<{}>(url)
	}

	//#endregion

	public getFreeDocuments(): Observable<FileMode[]> {
		const url = `${environment.apiUrl}/v1/requests/freedocuments`
		return this.http.get<FileMode[]>(url)
	}

	public parseRequest(): Observable<ClientShipmentInterface[]> {
		const url = `${environment.apiUrl}/v1/requests/send/parse`
		return this.http.post<ClientShipmentInterface[]>(url, {})
	}

	public addFreeduty(data: number[]): Observable<RequestsResponse[]> {
		const url = `${environment.apiUrl}/v1/requests`
		return this.http.post<RequestsResponse[]>(url, data)
	}

	public getRequestByIdAndParams(
		requestID: number,
		includeShipments: boolean,
		includeDocuments: boolean,
		includeFiles: boolean
	): Observable<RequestsResponse> {
		const url = `${environment.apiUrl}/v1/requests/${requestID}?includeShipments=${includeShipments}&includeDocuments=${includeDocuments}&includeFiles=${includeFiles}`
		return this.http.get<RequestsResponse>(url)
	}

	public getStatesOfRequest(
		requestID: number
	): Observable<ClientRequestStateInterface[]> {
		const url = `${environment.apiUrl}/v1/requests/${requestID}/states`
		return this.http.get<ClientRequestStateInterface[]>(url)
	}

	public getRequestsWithFilter(dateFrom: Date): Observable<RequestsResponse[]> {
		const url = `${environment.apiUrl}/v1/requests/filter/${dateFrom}`
		return this.http.get<RequestsResponse[]>(url)
	}

	// TODO: скорее всего возвращаются файлы
	public getDocumentsOfRequest(requestID: number): Observable<any[]> {
		return this.http.get<any[]>(
			`${environment.apiUrl}/request/${requestID}/documents`
		)
	}

	public send(
		data: number[]
	): Observable<ClientRequestSendingInitRequestInterface> {
		return this.http.post<ClientRequestSendingInitRequestInterface>(
			`${environment.apiUrl}/v1/requests/send`,
			data
		)
	}
}
