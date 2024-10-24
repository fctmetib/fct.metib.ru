import {ClientRequestSendingInitReq} from 'src/app/shared/types/client/client-request-sending-init.req'
import {Injectable} from '@angular/core'
import {BehaviorSubject, filter, finalize, Observable, switchMap} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {environment} from 'src/environments/environment'
import {FileMode} from 'src/app/shared/types/file/file-model.interface'
import {ClientShipmentInterface} from 'src/app/shared/types/client/client-shipment.interface'
import {
	DocumentRes,
	RequestCorrection,
	RequestReq,
	RequestRes,
	RequestState,
	RequestTypeEnum
} from '../interfaces/request.interface'
import {SignPinModalService} from '../../../../shared/modules/modals/sign-pin-modal/sign-pin-modal.service';

export interface GetRequestsReq {
	dateFrom?: string
	dateTo?: string
	includeShipments?: boolean
	includeDocuments?: boolean
}

@Injectable()
export class RequestsService {
	constructor(
    private signPinModalService: SignPinModalService,
    private http: HttpClient
  ) {}

	getRequestTypeTranslation(type: RequestTypeEnum) {
		switch (type) {
			case RequestTypeEnum.CORRECTION:
				return 'Откорректированная'
			case RequestTypeEnum.FINANCING:
				return 'С финансированием'
			case RequestTypeEnum.NON_FINANCING:
				return 'Без финансирования'
		}
	}

	public getRequestsConfig(data?: GetRequestsReq) {
		const defaultConfig = {}
		return {...defaultConfig, ...data}
	}

	/**
	 * Получить список свободной задолженности за период.
	 *
	 * @param data Параметры запроса для получения списка задолженностей.
	 * @returns Observable, который эмитит массив заявок.
	 */
	public getRequests(data?: GetRequestsReq): Observable<RequestRes[]> {
		const params = this.getRequestsConfig(data)
		return this.http.get<RequestRes[]>(`${environment.apiUrl}/v1/requests`, {
			params
		})
	}

	public getStates(requestID: number): Observable<RequestState[]> {
		return this.http.get<RequestState[]>(
			`${environment.apiUrl}/v1/requests/${requestID}/states`
		)
	}

	public create(data: RequestReq): Observable<number[]> {
		return this.http.post<number[]>(`${environment.apiUrl}/v1/requests`, data)
	}

	public getFreeLimit(deliveryID: number): Observable<number> {
		return this.http.get<number>(
			`${environment.apiUrl}/v1/deliveries/FreeLimit?deliveryID=${deliveryID}`
		)
	}

	public getRequest(requestID: number): Observable<RequestRes> {
		return this.http.get<RequestRes>(
			`${environment.apiUrl}/v1/requests/${requestID}`
		)
	}

	public update(
		requestID: number,
		data: Partial<RequestReq>
	): Observable<number[]> {
		return this.http.put<number[]>(`${environment.apiUrl}/v1/requests`, {
			...data,
			ID: requestID
		})
	}

	public uploadDocument(
		document: DocumentRes,
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

	correction(data: RequestCorrection): Observable<any> {
		console.log(data)
		return this.http.post(`${environment.apiUrl}/v1/requests/correction`, data)
	}

	public deleteRequests(requestIds: number[]): Observable<void> {
		return this.http.delete<void>(`${environment.apiUrl}/v1/requests`, {
			body: requestIds
		})
	}

	getNextFreeRequestNumber(): Observable<string> {
		return this.http.get<string>(`${environment.apiUrl}/v1/requests/nextnumber`, {
      responseType: 'text' as 'json',
      params: {
        typeOfRequest: 'MRQ'
      }
    })
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
	): Observable<ClientRequestSendingInitReq> {
		return this.http.post<ClientRequestSendingInitReq>(
			`${environment.apiUrl}/v1/requests/send`,
			data
		)
	}

  sign(requestIDs: number[], loading$: BehaviorSubject<boolean>) {
    return this.signPinModalService.sign(this.send(requestIDs), loading$)
  }
}
