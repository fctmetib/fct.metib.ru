import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {ClientInvoice} from '../interfaces/client.invoice'
import {environment} from 'src/environments/environment'

@Injectable()
export class InvoicesService {
	public dateFrom: string = '2023-07-25'
	public dateTo: string = '2023-07-25'

	constructor(private http: HttpClient) {}

	public getInvoices(): Observable<ClientInvoice[]> {
		return this.http.get<ClientInvoice[]>(
			`${environment.apiUrl}/v1/payments?dateFrom=${this.dateFrom}&dateTo=${this.dateTo}`
		)
	}
}
