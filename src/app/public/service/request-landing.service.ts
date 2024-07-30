import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {RequestLandingInterface} from '../type/request-landing.interface'

@Injectable({
	providedIn: 'root'
})
export class RequestLandingService {
	private requestUrl =
		// 'https://api-factoring.metib.ru/api/public/anket/factoring'
		'https://example.com'

	constructor(private http: HttpClient) {}

	sendRequestData(
		data: RequestLandingInterface
	): Observable<RequestLandingInterface> {
		return this.http.post<RequestLandingInterface>(this.requestUrl, data)
	}
}
