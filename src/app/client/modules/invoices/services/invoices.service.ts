import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {ClientInvoice, ExtendedClientInvoice} from '../interfaces/client.invoice'
import {environment} from 'src/environments/environment'

export interface InvoicesReq {
  dateFrom?: string,
  dateTo?: string,
  includeLinks?: boolean
}

export interface InvoiceReq {
  ID: number
  includeLinks?: boolean
}

export type GenericInvoice<T extends InvoicesReq> = T['includeLinks'] extends true ? ExtendedClientInvoice : ClientInvoice


@Injectable()
export class InvoicesService {

  constructor(private http: HttpClient) {}

  public getInvoices = <T extends InvoicesReq>(data: T): Observable<GenericInvoice<T>[]> => {
    return this.http.get<any>(`${environment.apiUrl}/v1/payments`, {
      params: { ...data as any }
    });
  }

  public getInvoice = <T extends InvoiceReq>(data: T): Observable<GenericInvoice<T>> => {
    return this.http.get<any>(`${environment.apiUrl}/v1/payments/${data.ID}`, {
      params: { ...data as any}
    })
  }
}
