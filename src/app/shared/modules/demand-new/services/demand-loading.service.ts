import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
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
  public demandPageLoading$ = new BehaviorSubject<boolean>(false);

  /**
   * Используется, для отображения загрузки на кнопках, например, при отправке Сохранения
   */
  public demandRequestLoading$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  public setPageLoading(newState: boolean) {
    this.demandPageLoading$.next(newState);
  }

  public setRequestLoading(newState: boolean) {
    this.demandRequestLoading$.next(newState);
  }
}
