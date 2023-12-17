import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {Duty} from '../../../../shared/types/duty/duty';

@Injectable()
export class FreeDutyService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getFreeDuty(freeOnly: boolean = false): Observable<Duty[]> {
    return this.http.get<Duty[]>(`${environment.apiUrl}/v1/duties`, {
      params: {
        freeOnly
      }
    });
  }

  freeDuty(ids: number[]): Observable<number[]> {
    return this.http.post<number[]>(`${environment.apiUrl}/v1/freeduty`, ids)
  }
}
