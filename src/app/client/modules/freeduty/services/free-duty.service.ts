import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {Duty} from '../../../../shared/types/duty/duty';
import {DataCount} from '../../../../shared/interfaces/shared.interface';

/**
 * Интерфейс для параметров запроса получения списка свободной задолженности.
 */
export interface GetFreeDutyReq {
  /**
   * Только свободная задолженность (не включенная в заявки).
   */
  freeOnly?: boolean;

  /**
   * Начальная позиция в списке задолженностей.
   */
  offSet?: number;

  /**
   * Количество задолженностей на одной странице.
   */
  rowsOnPage?: number;

  /**
   * Начальная дата периода.
   */
  dateFrom?: string;

  /**
   * Конечная дата периода.
   */
  dateTo?: string;
}

@Injectable()
export class FreeDutyService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getFreeDutyConfig(data?: GetFreeDutyReq) {
    const defaultConfig = {freeOnly: false};
    return {...defaultConfig, ...data};
  }

  /**
   * Получить список свободной задолженности за период.
   *
   * @param data Параметры запроса для получения списка задолженностей.
   * @returns Observable, который эмитит массив задолженностей.
   */
  public getFreeDuties(data?: GetFreeDutyReq): Observable<Duty[]> {
    const params = this.getFreeDutyConfig(data)
    return this.http.get<Duty[]>(`${environment.apiUrl}/v1/duties`, {params});
  }

  public getFreeDutyCount(data?: GetFreeDutyReq): Observable<DataCount> {
    const params = this.getFreeDutyConfig(data)
    return this.http.get<DataCount>(`${environment.apiUrl}/v1/duties/count`, {params})
  }

  freeDuty(ids: number[]): Observable<number[]> {
    return this.http.post<number[]>(`${environment.apiUrl}/v1/freeduty`, ids)
  }
}
