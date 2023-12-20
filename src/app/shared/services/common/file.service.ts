import { environment } from 'src/environments/environment'

import { Observable, catchError, of, throwError } from 'rxjs'
import {
	HttpClient,
	HttpErrorResponse,
	HttpEvent,
	HttpHeaders
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { FileMode } from '../../types/file/file-model.interface'
import { Translator } from '../../classes/common/translator.class'
import { IFile } from '../../interfaces/files.interface'

@Injectable()
export class FileService {
	private _translator: Translator

	constructor(private http: HttpClient) {
		this._translator = new Translator()
	}

	//TODO: нужно узнать что передавать
	addFile(): Observable<FileMode> {
		let url = `${environment.apiUrl}/file`
		return this.http.post<FileMode>(url, {})
	}

	uploadFileChunks(
		file: ArrayBuffer,
		fileName: string,
		fileSize: string,
		guid: string
	): Observable<HttpEvent<FileMode>> {
		const fileNameNormal = this._translator.translitToEnglish(fileName)

		let headers = new HttpHeaders()
		headers = headers.append('Upload-ChunkNumber', '1')
		headers = headers.append('Upload-FileName', fileNameNormal)
		headers = headers.append('Upload-GUID', guid)
		headers = headers.append('Upload-TotalSize', fileSize)

		return this.http.post<FileMode>(
			`${environment.apiFileUploadUrl}/file/chunks`,
			file,
			{
				headers,
				reportProgress: true,
				observe: 'events'
			}
		)
	}

	uploadAvatar(file: Blob, fileName: string): Observable<string> {
		var formdata = new FormData()
		formdata.append('', file, fileName)

		let url = `${environment.apiFileUploadUrl}/avatar`
		return this.http.post<string>(url, formdata)
	}

	getFileByCode(code: string): Observable<FileMode> {
		let url = `${environment.apiUrl}/file/${code}`
		return this.http.get<FileMode>(url)
	}

	getFileContentByCode(code: string): Observable<any> {
		let url = `${environment.apiUrl}/file/${code}/content`
		return this.http.get<any>(url)
	}

	getFile(requestID, documentID): Observable<any> {
		let url = `${environment.apiUrl}/request/${requestID}/documents/${documentID}/file `
		return this.http.get<any>(url)
	}

	getAvatar(code: string): Observable<any> {
		let url = `${environment.apiUrl}/avatar/${code}`
		return this.http.get<any>(url)
	}

	uploadFileWithProgress(file: File): Observable<HttpEvent<IFile>> {
		const formData: FormData = new FormData()
		formData.append('file', file)

		const headers = new HttpHeaders({
			Accept: 'application/json; charset=utf-8'
		})

		return this.http.post<IFile>(
			`https://httpbin.org/post`,
			// `${environment.apiUrl}/files/upload-file`,
			formData,
			{
				reportProgress: true,
				responseType: 'json',
				headers: headers,
				observe: 'events'
			}
		)
	}
}
