import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  uploadFileChunks(file: Uint8Array[], fileName: string, fileSize: string, guid: string): Observable<FileModeInterface> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Upload-ChunkNumber', '1');
    headers = headers.append('Upload-FileName', fileName);
    headers = headers.append('Upload-GUID', guid);
    headers = headers.append('Upload-TotalSize', fileSize);

    let url = `${environment.apiUrl}/file/chunks`;
    return this.http.post<FileModeInterface>('http://api-factoring.metib.ru:8094/api/file/chunks', file, { headers });
  }

  getFileByCode(code: string): Observable<FileModeInterface> {
    let url = `${environment.apiUrl}/file/${code}`;
    return this.http.get<FileModeInterface>(url);
  }

  getFileContentByCode(code: string): Observable<any> {
    let url = `${environment.apiUrl}/file/${code}/content`;
    return this.http.get<any>(url);
  }

  getFile(): Observable<string> {
    let url = `${environment.apiUrl}/File`;
    return this.http.get<string>(url);
  }
}
