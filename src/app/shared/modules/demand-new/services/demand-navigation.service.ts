import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DemandNavigationInterface } from '../types/common/demand-navigation.interface';
import { DoDemandActionInterface } from '../types/navigation-service/do-demand-action.interface';

/**
 *
 *
 * @class DemandNavigationService - сервис необходим, для постройки связи между компонентами
 */
@Injectable()
export class DemandNavigationService {
  public demandConfig$ = new BehaviorSubject<DemandNavigationInterface>(null);
  // Переменная для работы с текущим запросом (форма)
  public currentDemand$ = new BehaviorSubject<any>(null);
  // Переменная для работы с данными текущего запроса (вкладки Информация, Файлы, Результат)
  public currentDemandInfoData$ = new BehaviorSubject<any>(null);
  // Переменная для выполнения действия Клиент - Сервер,
  // принимает в себя готовый к отправке на АПИ объект, а также тип действия (создание, редактирование, сохранение)
  public doDemandAction$ = new Subject<DoDemandActionInterface>();

  public doDemandSave$ = new Subject();

  constructor() {}

  public updateDemandConfig(newConfig: DemandNavigationInterface) {
    this.demandConfig$.next(newConfig);
  }

  public setCurrentDemandData(currentDemand: any): void {
    this.currentDemand$.next(currentDemand);
  }

  public setCurrentDemandInfoData(currentDemandInfoData: any): void {
    this.currentDemandInfoData$.next(currentDemandInfoData);
  }

  public updateCurrentDemandInfoData(newDemandInfoData: any): void {
    const updatedDemandInfoData = {
      ...this.currentDemandInfoData$.value,
      ...newDemandInfoData,
    };
    this.currentDemandInfoData$.next(updatedDemandInfoData);
  }

  public setDoDemandAction(action: DoDemandActionInterface): void {
    this.doDemandAction$.next(action);
  }
}
