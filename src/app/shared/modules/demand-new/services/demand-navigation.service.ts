import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DemandAction } from '../types/common/demand-action';
import { DemandActionType } from '../types/common/demand-action-type';
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
  // Переменная для выполнения действия Клиент - Сервер,
  // принимает в себя готовый к отправке на АПИ объект, а также тип действия (создание, редактирование, сохранение)
  public doDemandAction$ = new Subject<DoDemandActionInterface>();

  constructor() { }

  public updateDemandConfig(newConfig: DemandNavigationInterface) {
    this.demandConfig$.next(newConfig);
  }

  public setCurrentDemandData(currentDemand: any): void {
    this.currentDemand$.next(currentDemand);
  }

  public setDoDemandAction(action: DoDemandActionInterface): void {
    this.doDemandAction$.next(action);
  }


}
