import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {map, Observable} from 'rxjs'
import {environment} from 'src/environments/environment'
import {AgentInterface, BankInfo} from '../type/agent.interface'

@Injectable({
  providedIn: 'root'
})
export class GetAgentRequestService {
  private url =
    'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party'

  constructor(private http: HttpClient) {
  }

  getAgentData(query: string): Observable<AgentInterface> {
    const body = {query: query}

    return this.http.post<AgentInterface>(this.url, body)
  }

  getBankData(query: string): Observable<BankInfo[]> {
    const bankUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/bank'
    return this.http.post<{suggestions: BankInfo[]}>(bankUrl, {query}).pipe(map(res => res.suggestions))
  }

  // private url =
  // 	'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party'

  // constructor(private http: HttpClient) {}

  // getAgentData(query: string): Observable<any> {
  // 	const token = environment.apiToken
  // 	const headers = new HttpHeaders({
  // 		'Content-Type': 'application/json',
  // 		Accept: 'application/json',
  // 		Authorization: `Token ${token}`
  // 	})

  // 	const body = {query: query}

  // 	return this.http.post(this.url, body, {headers, responseType: 'text'})
  // }
}
