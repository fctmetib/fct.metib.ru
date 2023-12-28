import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {ClientInvoiceInterface} from '../interfaces/client-invoice.interface'
import {environment} from 'src/environments/environment'

@Injectable()
export class InvoicesService {
	public dateFrom: string = '2023-07-25'
	public dateTo: string = '2023-07-25'

	constructor(private http: HttpClient) {}

	public getInvoices(): Observable<ClientInvoiceInterface[]> {
		return this.http.get<ClientInvoiceInterface[]>(
			`${environment.apiUrl}/v1/payments?dateFrom=${this.dateFrom}&dateTo=${this.dateTo}`
		)
	}
}
