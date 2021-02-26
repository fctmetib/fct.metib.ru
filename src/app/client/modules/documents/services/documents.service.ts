import { DocumentSignatureInterface } from './../types/document-signature.interface';
import { ConfirmRequestInterface } from './../../../../shared/types/common/confirm-request.interface';
import { DocumentSigninitModelInterface } from './../types/common/document-signinit-model.interface';
import { CreateDocumentRequestInterface } from './../types/create-document-request.interface';
import { DocumentInterface } from './../types/document.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class DocumentsService {
  constructor(private http: HttpClient) {}

  //#region REST

  fetch(): Observable<DocumentInterface[]> {
    const url = `${environment.apiUrl}document`;
    return this.http.get<DocumentInterface[]>(url);
  }

  add(data: CreateDocumentRequestInterface): Observable<DocumentInterface> {
    const url = `${environment.apiUrl}document`;
    return this.http.post<DocumentInterface>(url, data);
  }

  //#endregion

  getDocumentsByDateFilter(dateFrom: Date, dateTo: Date): Observable<DocumentInterface[]> {
    const url = `${environment.apiUrl}document/filter/${dateFrom}/${dateTo}`;
    return this.http.get<DocumentInterface[]>(url);
  }

  getDocumentById(id: number): Observable<DocumentInterface> {
    const url = `${environment.apiUrl}document/${id}`;
    return this.http.get<DocumentInterface>(url);
  }

  //TODO: проверить, что возвращает
  getFileByDocumentId(id: number): Observable<any> {
    const url = `${environment.apiUrl}document/${id}/file`;
    return this.http.get<any>(url);
  }

  //TODO: проверить, что возвращает
  getPackageByDocumentId(id: number): Observable<any> {
    const url = `${environment.apiUrl}document/${id}/package`;
    return this.http.get<any>(url);
  }

  signInitDocument(data: number[]): Observable<DocumentSigninitModelInterface> {
    const url = `${environment.apiUrl}document/sign/init`;
    return this.http.post<DocumentSigninitModelInterface>(url, data);
  }

  signConfirmDocument(data: ConfirmRequestInterface): Observable<DocumentSignatureInterface[]> {
    const url = `${environment.apiUrl}document/sign/confirm`;
    return this.http.post<DocumentSignatureInterface[]>(url, data);
  }
}