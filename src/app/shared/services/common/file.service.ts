import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileModeInterface } from '../../types/file/file-model.interface';

@Injectable()
export class FileService {
  constructor(private http: HttpClient) {}

  //TODO: нужно узнать что передавать
  addFile(): Observable<FileModeInterface> {
    let url = `${environment.apiUrl}/file`;
    return this.http.post<FileModeInterface>(url, {})
  }

  //TODO: нужно узнать что передавать
  addFileChunks(): Observable<FileModeInterface> {
    let url = `${environment.apiUrl}/file/chunks`;
    return this.http.post<FileModeInterface>(url, {})
  }

  getFileByCode(code: string): Observable<FileModeInterface> {
    let url = `${environment.apiUrl}/file/${code}`;
    return this.http.get<FileModeInterface>(url)
  }

  getFileContentByCode(code: string): Observable<any> {
    let url = `${environment.apiUrl}/file/${code}/content`;
    return this.http.get<any>(url)
  }

  getFile(): Observable<string> {
    let url = `${environment.apiUrl}/File`;
    return this.http.get<string>(url)
  }
}
