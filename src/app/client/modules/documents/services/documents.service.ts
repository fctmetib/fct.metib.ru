import {DocumentSignatureInterface} from './../types/document-signature.interface'
import {ConfirmRequestInterface} from './../../../../shared/types/common/confirm-request.interface'
import {DocumentSigninitModelInterface} from './../types/common/document-signinit-model.interface'
import {CreateDocumentRequestInterface} from './../types/create-document-request.interface'
import {DocumentInterface} from './../types/document.interface'
import {Injectable} from '@angular/core'
import {BehaviorSubject, Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {environment} from 'src/environments/environment'
import {DocumentReq, DocumentRes, DocumentSign} from '../../requests/interfaces/request.interface';
import {SignPinModalService} from '../../../../shared/modules/modals/sign-pin-modal/sign-pin-modal.service';

@Injectable()
export class DocumentsService {
	constructor(
    private signPinModalService: SignPinModalService,
    private http: HttpClient
  ) {}

  sign<T>(req$: Observable<T>, loading$: BehaviorSubject<boolean>) {
    return this.signPinModalService.sign(req$, loading$)
  }

	public fetchDocuments(): Observable<DocumentRes[]> {
		const url = `${environment.apiUrl}/v1/documents`
		return this.http.get<DocumentRes[]>(url)
	}

  public getSign(id: number): Observable<DocumentSign[]> {
    return this.http.get<DocumentSign[]>(`${environment.apiUrl}/v1/documents/${id}/sign`)
  }

	fetchDocumentById(id: number): Observable<string> {
		const url = `${environment.apiUrl}/v1/documents/${id}/content`
		return this.http.get<string>(url)
	}

	uploadNewDocument(data: DocumentReq, withSign: boolean = false): Observable<DocumentRes> {
		return this.http.post<DocumentRes>(`${environment.apiUrl}/v1/documents`, data, {params: {withSign}})
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
