import {ClientRequestStateInterface} from 'src/app/shared/types/client/client-request-state.interface'
import {ClientRequestSendingInitRequestInterface} from 'src/app/shared/types/client/client-request-sending-init-request.interface'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {environment} from 'src/environments/environment'
import {FileMode} from 'src/app/shared/types/file/file-model.interface'
import {ClientShipmentInterface} from 'src/app/shared/types/client/client-shipment.interface'
import {Document, RequestReq, RequestRes} from '../interfaces/request.interface'

@Injectable()
export class RequestsService {
	constructor(private http: HttpClient) {}

	public create(data: RequestReq): Observable<number[]> {
		return this.http.post<number[]>(`${environment.apiUrl}/v1/requests`, data)
	}

	public getRequests(): Observable<RequestRes[]> {
		return this.http.get<RequestRes[]>(`${environment.apiUrl}/v1/requests`)
	}

	public getRequest(requestID: number): Observable<RequestRes[]> {
		return this.http.get<RequestRes[]>(
			`${environment.apiUrl}/v1/requests/${requestID}`
		)
	}

	public update(
		requestID: number,
		data: Partial<RequestReq>
	): Observable<number[]> {
		return this.http.post<number[]>(
			`${environment.apiUrl}/v1/requests/${requestID}`,
			data
		)
	}

	public uploadDocument(
		document: Document,
		requestID: number,
		documentType: string
	) {
		return this.http.post(
			`${environment.apiUrl}/v1/requests/${requestID}/${documentType}`,
			document
		)
	}

	sendRequest(ids: number[]): Observable<number[]> {
		return this.http.post<number[]>(
			`${environment.apiUrl}/v1/requests/send`,
			ids
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

	public fetch(): Observable<RequestRes[]> {
		const url = `${environment.apiUrl}/v1/requests`
		return this.http.get<RequestRes[]>(url)
	}

	// public update(
	// 	requestID: number,
	// 	data: ClientRequestInterface
	// ): Observable<RequestRes> {
	// 	const url = `${environment.apiUrl}/v1/requests/${requestID}`
	// 	return this.http.post<RequestRes>(url, data)
	// }

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

	public addFreeduty(data: number[]): Observable<RequestRes[]> {
		const url = `${environment.apiUrl}/v1/requests`
		return this.http.post<RequestRes[]>(url, data)
	}

	public getRequestByIdAndParams(
		requestID: number,
		includeShipments: boolean,
		includeDocuments: boolean,
		includeFiles: boolean
	): Observable<RequestRes> {
		const url = `${environment.apiUrl}/v1/requests/${requestID}?includeShipments=${includeShipments}&includeDocuments=${includeDocuments}&includeFiles=${includeFiles}`
		return this.http.get<RequestRes>(url)
	}

	public getStatesOfRequest(
		requestID: number
	): Observable<ClientRequestStateInterface[]> {
		const url = `${environment.apiUrl}/v1/requests/${requestID}/states`
		return this.http.get<ClientRequestStateInterface[]>(url)
	}

	public getRequestsWithFilter(dateFrom: Date): Observable<RequestRes[]> {
		const url = `${environment.apiUrl}/v1/requests/filter/${dateFrom}`
		return this.http.get<RequestRes[]>(url)
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
