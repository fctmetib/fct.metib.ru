import { environment } from './../../../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatisticsInterface } from '../types/common/statistics.interface';

@Injectable()
export class StatisticsService {
  constructor(private httpClient: HttpClient) { }

  getClientStatistics(): Observable<StatisticsInterface> {
    const url = `${environment.apiUrl}/client/statistics`;
    return this.httpClient.get<StatisticsInterface>(url);
  }

}

