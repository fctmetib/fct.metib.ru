import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class RequestsService {
  constructor(
    private http: HttpClient
  ) {
  }

  createRequest(ids: number[]): Observable<number[]> {
    return this.http.post<number[]>(`${environment.apiUrl}/v1/requests/send`, ids)
  }
}
