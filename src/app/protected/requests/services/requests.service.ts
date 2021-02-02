import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {environment} from 'src/environments/environment'
import { RequestsResponseInterface } from '../types/requestResponse.interface'

@Injectable()
export class RequestsService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<RequestsResponseInterface[]> {
    const url = `${environment.apiUrl}request`
    return this.http.get<RequestsResponseInterface[]>(url)
  }
}
