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
    return this.http.post<FileModeInterface>(url, {})
  }

  uploadFileChunks(file: File, guid: string): Observable<FileModeInterface> {
    // const formData = new FormData();
    // formData.append('file', file);

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Upload-ChunkNumber', '1');
    headers = headers.append('Upload-FileName', file.name);
    headers = headers.append('Upload-GUID', guid);
    headers = headers.append('Upload-TotalSize', file.size.toString());

    let fileUp = this.getBase64(file)
    console.log(fileUp)

    let url = `${environment.apiUrl}/file/chunks`;
     return this.http.post<FileModeInterface>(url, fileUp, {headers});
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

  getBase64(file) {
    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      return reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
}
