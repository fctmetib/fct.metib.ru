import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DemandNavigationInterface } from '../types/common/demand-navigation.interface';

/**
 *
 *
 * @class DemandLoadingService - сервис необходим, для управления состоянием загрузки
 */
@Injectable()
export class DemandLoadingService {
  /**
   * Используется, для отображения загрузки страницы, например, при первом открытии, в этом время подгружаются данные из API
   */
  public demandPageLoading$ = new Subject<boolean>();

  /**
   * Используется, для отображения загрузки на кнопках, например, при отправке Сохранения
   */
  public demandRequestLoading$ = new Subject<boolean>();

  constructor() {}

  public setPageLoading(newState: boolean) {
    this.demandPageLoading$.next(newState);
  }

  public setRequestLoading(newState: boolean) {
    this.demandRequestLoading$.next(newState);
  }
}
