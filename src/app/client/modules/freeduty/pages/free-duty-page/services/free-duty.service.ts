import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Duty} from '../../../../../../shared/types/duty/duty';
import {environment} from '../../../../../../../environments/environment';

@Injectable()
export class FreeDutyService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getFreeDuty(): Observable<Duty[]> {
    return this.http.get<Duty[]>(`${environment.apiUrl}/v1/duties`);
  }
}
