import {DocumentSignatureInterface} from './../types/document-signature.interface'
import {ConfirmRequestInterface} from './../../../../shared/types/common/confirm-request.interface'
import {DocumentSigninitModelInterface} from './../types/common/document-signinit-model.interface'
import {CreateDocumentRequestInterface} from './../types/create-document-request.interface'
import {DocumentInterface} from './../types/document.interface'
import {Injectable} from '@angular/core'
import {BehaviorSubject, catchError, Observable, of, throwError} from 'rxjs'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {environment} from 'src/environments/environment'
import {
	DocumentReq,
	DocumentRes,
	DocumentSign
} from '../../requests/interfaces/request.interface'
import {SignPinModalService} from '../../../../shared/modules/modals/sign-pin-modal/sign-pin-modal.service'

@Injectable({
	providedIn: 'root'
})
export class DocumentsService {
	constructor(
		private signPinModalService: SignPinModalService,
		private http: HttpClient
	) {}

	public signModal<T>(req$: Observable<T>, loading$: BehaviorSubject<boolean>) {
		return this.signPinModalService.sign(req$, loading$).pipe(
      catchError(err => {
        return throwError(err)
      })
    )
	}

	public sign(id: number): Observable<DocumentSign> {
		return this.http.post<DocumentSign>(
			`${environment.apiUrl}/v1/documents/${id}/sign`,
			null
		)
	}

	public fetchDocuments(): Observable<DocumentRes[]> {
		const url = `${environment.apiUrl}/v1/documents`
		return this.http.get<DocumentRes[]>(url)
	}

	public getSign(id: number): Observable<DocumentSign[]> {
		return this.http.get<DocumentSign[]>(
			`${environment.apiUrl}/v1/documents/${id}/sign`
		)
	}

	getDocumentContent(id: number): Observable<string> {
		return this.http.get<string>(
			`${environment.apiUrl}/v1/documents/${id}/content`
		)
	}

	// message: "Unexpected token 'P'

	// getDocumentZip(id: number): Observable<string> {
	// 	const url = `${environment.apiUrl}/v1/documents/${id}`
	// 	const headers = new HttpHeaders().set('content-type', 'application/zip')
	// 	return this.http.get<string>(url, {headers})
	// }

	// getDocumentZip(id: number): Observable<string> {
	// 	const url = `${environment.apiUrl}/v1/documents/${id}`
	// 	const headers = new HttpHeaders().set(
	// 		'Content-Type',
	// 		'application/zip; charset=utf-8'
	// 	)
	// 	return this.http.get<string>(url, {headers})
	// }

	//ArrayBuffer(121516)byteLength: 121516detached: falsemaxByteLength: 121516resizable: false[[Prototype]]: ArrayBuffer[[Int8Array]]: Int8Array(121516)[[Uint8Array]]: Uint8Array(121516)[[Int16Array]]: Int16Array(60758)[[Int32Array]]: Int32Array(30379)[[ArrayBufferByteLength]]: 121516[[ArrayBufferData]]: 7

	// Blob {size: 126016, type: 'application/zip'}

	getDocumentZip(id: number): Observable<string> {
		const url = `${environment.apiUrl}/v1/documents/${id}`
		return this.http.get<string>(url, {responseType: 'arraybuffer' as 'json'})
		// return this.http.get<string>(url, {responseType: 'blob' as 'json'})
	}

	// message: "Unexpected token 'P'

	// getDocumentZip(id: number): Observable<string> {
	// 	const url = `${environment.apiUrl}/v1/documents/${id}`
	// 	let header = new HttpHeaders({
	// 		Accept: 'application/zip'
	// 	})
	// 	return this.http.get<string>(url, {headers: header})
	// }

	uploadNewDocument(
		data: DocumentReq,
		withSign: boolean = false
	): Observable<DocumentRes> {
		return this.http.post<DocumentRes>(
			`${environment.apiUrl}/v1/documents`,
			data,
			{params: {withSign}}
		)
	}

	//#region REST

	fetch(): Observable<DocumentInterface[]> {
		const url = `${environment.apiUrl}document`
		return this.http.get<DocumentInterface[]>(url)
	}

	add(data: CreateDocumentRequestInterface): Observable<DocumentInterface> {
		const url = `${environment.apiUrl}document`
		return this.http.post<DocumentInterface>(url, data)
	}

	//#endregion

	getDocumentsByDateFilter(
		dateFrom: Date,
		dateTo: Date
	): Observable<DocumentInterface[]> {
		const url = `${environment.apiUrl}document/filter/${dateFrom}/${dateTo}`
		return this.http.get<DocumentInterface[]>(url)
	}

	getDocumentById(id: number): Observable<DocumentInterface> {
		const url = `${environment.apiUrl}document/${id}`
		return this.http.get<DocumentInterface>(url)
	}

	//TODO: проверить, что возвращает
	getFileByDocumentId(id: number): Observable<any> {
		const url = `${environment.apiUrl}document/${id}/file`
		return this.http.get<any>(url)
	}

	//TODO: проверить, что возвращает
	getPackageByDocumentId(id: number): Observable<any> {
		const url = `${environment.apiUrl}document/${id}/package`
		return this.http.get<any>(url)
	}

	signInitDocument(data: number[]): Observable<DocumentSigninitModelInterface> {
		const url = `${environment.apiUrl}document/sign/init`
		return this.http.post<DocumentSigninitModelInterface>(url, data)
	}

	signConfirmDocument(
		data: ConfirmRequestInterface
	): Observable<DocumentSignatureInterface[]> {
		const url = `${environment.apiUrl}document/sign/confirm`
		return this.http.post<DocumentSignatureInterface[]>(url, data)
	}
}
