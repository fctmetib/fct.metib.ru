import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileModeInterface } from '../../types/file/file-model.interface';

@Injectable()
export class FileService {
  constructor(private http: HttpClient) {}

  //TODO: нужно узнать что передавать
  addFile(): Observable<FileModeInterface> {
    let url = `${environment.apiUrl}/file`;
    return this.http.post<FileModeInterface>(url, {});
  }

  uploadFileChunks(
    file: Uint8Array[],
    fileName: string,
    fileSize: string,
    guid: string
  ): Observable<HttpEvent<FileModeInterface>> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Upload-ChunkNumber', '1');
    headers = headers.append('Upload-FileName', fileName);
    headers = headers.append('Upload-GUID', guid);
    headers = headers.append('Upload-TotalSize', fileSize);

    let url = `${environment.apiFileUploadUrl}/file/chunks`;

    const upload$: Observable<HttpEvent<FileModeInterface>> =
      this.http.post<FileModeInterface>(url, file, {
        headers,
        reportProgress: true,
        observe: 'events',
      });
    return upload$;
  }

  uploadAvatar(file: Blob, fileName: string): Observable<string> {
    var formdata = new FormData();
    formdata.append('', file, fileName);

    let url = `${environment.apiFileUploadUrl}/avatar`;
    return this.http.post<string>(url, formdata);
  }

  getFileByCode(code: string): Observable<FileModeInterface> {
    let url = `${environment.apiUrl}/file/${code}`;
    return this.http.get<FileModeInterface>(url);
  }

  getFileContentByCode(code: string): Observable<any> {
    let url = `${environment.apiUrl}/file/${code}/content`;
    return this.http.get<any>(url);
  }

  getFile(requestID, documentID): Observable<any> {
    let url = `${environment.apiUrl}/request/${requestID}/documents/${documentID}/file `;
    return this.http.get<any>(url);
  }

  getAvatar(code: string): Observable<any> {
    let url = `${environment.apiUrl}/avatar/${code}`;
    return this.http.get<any>(url);
  }
}
